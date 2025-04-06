const User = require("../models/user.model");
const admin = require("../config/firebaseAdmin");
const { cloudinary } = require("../config/cloudinary");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, address } = req.body;

    if (!name || !email || !password || !phoneNumber) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    let avatarUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "avatars",
      });
      avatarUrl = result.secure_url;
    }

    const newUser = new User({
      name,
      email,
      firebaseUid: userRecord.uid,
      password: "firebase-manage", 
      phoneNumber,
      address,
      avatar: avatarUrl,
      isAdmin: false, 
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};


const loginUser = async (req, res) => {
  try {
    const { idToken, pushToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ message: "ID token is required" });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const firebaseUid = decodedToken.uid;

 
    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (pushToken && pushToken !== user.pushToken) {
      user.pushToken = pushToken;
      await user.save();
    }

    const token = generateToken(user._id, user.isAdmin);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        firebaseUid: user.firebaseUid,
        isAdmin: user.isAdmin,
        pushToken: user.pushToken,
      },
      token,
    });

  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid or expired Firebase token", error: error.message });
  }
};


const googleLoginUser = async (req, res) => {
  try {
    const { idToken, pushToken  } = req.body;
    if (!idToken) {
      return res.status(400).json({ message: "ID token is required" });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const firebaseUid = decodedToken.uid;

    let user = await User.findOne({ firebaseUid });
    
   
    if (!user) {
      const firebaseUser = await admin.auth().getUser(firebaseUid);

      user = new User({
        name: firebaseUser.displayName || "Google User",
        email: firebaseUser.email,
        firebaseUid,
        password: "firebase-manage",
        phoneNumber: 'Not Provided',
        address: 'Not Provided',
        avatar: firebaseUser.photoURL || '',
        isAdmin: false,
      });

      await user.save();
    }

    if (pushToken && pushToken !== user.pushToken) {
      user.pushToken = pushToken;
    }
    await user.save();

    const token = generateToken(user._id, user.isAdmin);

    res.status(200).json({
      message: "Google login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        firebaseUid: user.firebaseUid,
        isAdmin: user.isAdmin,
        avatar: user.avatar,
        pushToken: user.pushToken,
      },
      token,
    });

  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Google login failed", error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password"); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const { name, email, phoneNumber, address } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const firebaseUser = await admin.auth().getUser(user.firebaseUid);
    const isGoogleProvider = firebaseUser.providerData.some(
      (provider) => provider.providerId === "google.com"
    );

    if (isGoogleProvider) {
      if (phoneNumber) user.phoneNumber = phoneNumber;
      if (address) user.address = address;
    } else {
      if (name) user.name = name;
      if (email && email !== user.email) {
        
        const emailExists = await User.findOne({ email });
        if (emailExists) {
          return res.status(400).json({ message: "Email is already in use" });
        }

        try {
          await admin.auth().updateUser(user.firebaseUid, { email });
          user.email = email; 
        } catch (error) {
          console.error("Firebase Email Update Error:", error);
          return res.status(500).json({ message: "Failed to update email in Firebase" });
        }
      }
      if (phoneNumber) user.phoneNumber = phoneNumber;
      if (address) user.address = address;
    }

    if (req.file) {
      try {
        
        if (user.avatar) {
          const publicId = user.avatar.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "avatars",
        });

        user.avatar = result.secure_url;
      } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        return res.status(500).json({ message: "Failed to upload avatar" });
      }
    }

    const updatedUser = await user.save();

    res.status(200).json({
      message: "User profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        address: updatedUser.address,
        avatar: updatedUser.avatar,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update user profile", error: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    
    try {
      const firebaseUser = await admin.auth().getUser(user.firebaseUid);

      
      const email = firebaseUser.email;
      const signInResult = await admin.auth().verifyIdToken(req.headers.authorization.split(" ")[1]);

      if (!signInResult) {
        return res.status(401).json({ message: "Invalid current password." });
      }

      await admin.auth().updateUser(user.firebaseUid, { password: newPassword });
    } catch (error) {
      console.error("Firebase Password Update Error:", error);
      return res.status(401).json({ message: "Invalid current password or failed to update password." });
    }

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update password.", error: error.message });
  }
};


  const updatePushToken = async (req, res) => {
    const userId = req.user.userId || req.user._id;
    const { pushToken } = req.body;
  
    if (!pushToken) return res.status(400).json({ message: 'No push token provided' });
  
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
  
    user.pushToken = pushToken;
    await user.save();
  
    res.status(200).json({ message: 'Expo push token updated successfully' });
  };


  

module.exports = { registerUser, loginUser, getUserProfile, googleLoginUser, updateUserProfile, changePassword, updatePushToken  };