const express = require("express");
const { registerUser, loginUser, getUserProfile, googleLoginUser, updateUserProfile, changePassword } = require("../controllers/auth.controller");
const { upload } = require("../config/cloudinary");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getUserProfile);
router.post("/google-login", googleLoginUser); 
router.put("/update", authMiddleware, upload.single("avatar"), updateUserProfile);
router.post("/change-password", authMiddleware, changePassword); // Change password route



module.exports = router;