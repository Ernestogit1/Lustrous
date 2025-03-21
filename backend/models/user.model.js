const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firebaseUid: { type: String, required: true, unique: true },
    password: { type: String, required: true, default: "firebase-manage" }, // Handled by Firebase
    phoneNumber: { type: String, required: true },
    address: { type: String },
    avatar: { type: String, default: "" }, // Cloudinary URL
    isAdmin: { type: Boolean, default: false }, // 0: User, 1: Admin
    fcmToken: { type: String, default: "" }, // Push Notification Token
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
