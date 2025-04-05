const express = require('express');
const { createProduct, getProducts, getProductById, productsDataTable, updateProduct, listTrashedProducts, permanentDeleteProduct, restoreProduct, softDeleteProduct } = require('../controllers/product.controller');
const { upload } = require('../config/cloudinary');

const router = express.Router();


// test
router.put('/delete/:id', softDeleteProduct);
router.put('/restore/:id', restoreProduct);
router.delete('/permanent-delete/:id', permanentDeleteProduct);
router.get('/trash', listTrashedProducts);
router.get('/productDatatable/all', productsDataTable);
router.post('/create', upload.array('images', 5), createProduct);
router.put('/update/:id', upload.array('images', 5), updateProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
module.exports = router;
