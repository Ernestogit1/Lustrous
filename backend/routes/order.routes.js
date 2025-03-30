const express = require('express');
const { addToCart, getCartItems, removeFromCart, updateCartQuantity  } = require('../controllers/order.controller');
const isAuthenticated = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/cart', isAuthenticated, addToCart);
router.get('/cart', isAuthenticated, getCartItems);
router.delete('/cart/:id', isAuthenticated, removeFromCart);
router.put('/cart/:id', isAuthenticated, updateCartQuantity);

module.exports = router;
