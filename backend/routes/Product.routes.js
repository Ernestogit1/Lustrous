const express = require('express');
const { createProduct, getProducts } = require('../controllers/Product.controller');
const { upload } = require('../config/cloudinary'); // Use Cloudinary storage

const router = express.Router();

router.route('/').get(getProducts);
router.route('/create').post(upload.array('images', 5), createProduct);

module.exports = router;
