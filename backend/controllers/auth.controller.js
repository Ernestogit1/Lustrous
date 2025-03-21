const User = require("../models/user.model");
const admin = require("../config/firebaseAdmin");
const { cloudinary } = require("../config/cloudinary");

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
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    // Authenticate user with Firebase
    const userRecord = await admin.auth().getUserByEmail(email);
    if (!userRecord) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Retrieve user from MongoDB
    const user = await User.findOne({ firebaseUid: userRecord.uid });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        firebaseUid: user.firebaseUid,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};



module.exports = { registerUser, loginUser };