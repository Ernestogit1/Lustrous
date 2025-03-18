const express = require('express');
const { registerUser } = require('../controllers/Users.controller');
const { upload } = require('../config/cloudinary');

const router = express.Router();

// Register user route with single file upload for avatar
router.post('/register', upload.single('avatar'), registerUser);
// router.post('/google-signin', googleSignIn);
module.exports = router;