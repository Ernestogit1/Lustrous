const express = require('express');
const { createProduct } = require('../controllers/Product.controller');
const { upload } = require('../config/cloudinary');

const router = express.Router();

router.post('/create', upload.array('images', 5), createProduct);

module.exports = router;
