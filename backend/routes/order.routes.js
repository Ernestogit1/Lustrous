const express = require('express');
const { 
    addToCart, 
    getCartItems, 
    removeFromCart, 
    updateCartQuantity, 
    checkoutOrder,
     updatePushToken, 
     getUserOrders,
     cancelOrder   
    } = require('../controllers/order.controller');
const isAuthenticated = require('../middleware/auth.middleware');

const router = express.Router();
// order:
router.get('/my-orders', isAuthenticated, getUserOrders);


// push token
router.put('/update-push-token', isAuthenticated, updatePushToken);
// checkout
router.post('/checkout', isAuthenticated, checkoutOrder);
// add to cart
router.post('/cart', isAuthenticated, addToCart);
router.get('/cart', isAuthenticated, getCartItems);
router.delete('/cart/:id', isAuthenticated, removeFromCart);
router.put('/cart/:id', isAuthenticated, updateCartQuantity);

// cancle order
router.put('/cancel/:id', isAuthenticated, cancelOrder);


module.exports = router;
