const express = require("express");
const { registerUser, loginUser, getUserProfile, googleLoginUser } = require("../controllers/auth.controller");
const { upload } = require("../config/cloudinary");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getUserProfile);
router.post("/google-login", googleLoginUser); 



module.exports = router;