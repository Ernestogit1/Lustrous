const express = require("express");
const { registerUser } = require("../controllers/auth.controller");
const { upload } = require("../config/cloudinary");

const router = express.Router();

router.post("/register", upload.single("avatar"), registerUser);

module.exports = router;
