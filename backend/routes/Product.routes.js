const express = require('express');
const { createProduct, getProducts, getProductById } = require('../controllers/Product.controller');
const { upload } = require('../config/cloudinary');

const router = express.Router();

router.post('/create', upload.array('images', 5), createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
module.exports = router;
