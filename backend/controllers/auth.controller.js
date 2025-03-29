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

    // Create user in Firebase
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
      password: "firebase-manage", // Firebase handles the password
      phoneNumber,
      address,
      avatar: avatarUrl,
      isAdmin: false, // All new users are not admins by default
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
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ message: "ID token is required" });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const firebaseUid = decodedToken.uid;

 
    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
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
      },
      token,
    });

  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid or expired Firebase token", error: error.message });
  }
};




const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };