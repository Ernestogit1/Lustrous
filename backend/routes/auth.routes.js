const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth.controller");
const { upload } = require("../config/cloudinary");

const router = express.Router();

router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);

module.exports = router;