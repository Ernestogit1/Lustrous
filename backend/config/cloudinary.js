const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const dotenv = require('dotenv');

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer Storage to Upload Directly to Cloudinary
// product folder
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'products', 
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

// acatar folder
const avatarStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'avatars', 
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

const upload = multer({ storage, avatarStorage });

module.exports = { cloudinary, upload };
