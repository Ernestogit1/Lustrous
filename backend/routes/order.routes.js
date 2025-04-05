const express = require('express');
const { 
    addToCart, 
    getCartItems, 
    removeFromCart, 
    updateCartQuantity, 
    checkoutOrder,
     updatePushToken, 
     getUserOrders,
     cancelOrder,
     getSingleUserOrder,
     getAllOrdersForAdmin,
    updateOrderStatus,
    getCancelledOrdersAdmin,
    getCompletedOrdersAdmin 
    } = require('../controllers/order.controller');
const isAuthenticated = require('../middleware/auth.middleware');

const router = express.Router();
// order
router.get('/my-orders', isAuthenticated, getUserOrders);


// push token
router.put('/update-push-token', isAuthenticated, updatePushToken);
// checkout
router.post('/checkout', isAuthenticated, checkoutOrder);
//  cart
router.post('/cart', isAuthenticated, addToCart);
router.get('/cart', isAuthenticated, getCartItems);

//====================={ADMIN}========================
router.get('/admin/all-orders', isAuthenticated, getAllOrdersForAdmin);
router.put('/admin/update-status/:id', isAuthenticated, updateOrderStatus);
router.get('/admin/cancelled-orders', isAuthenticated, getCancelledOrdersAdmin);
router.get('/admin/completed-orders', isAuthenticated, getCompletedOrdersAdmin);



//====================={ORDERS ID}========================

router.delete('/cart/:id', isAuthenticated, removeFromCart);
router.put('/cart/:id', isAuthenticated, updateCartQuantity);

// cancle order
router.put('/cancel/:id', isAuthenticated, cancelOrder);
// order detals id
router.get('/my-orders/:id', isAuthenticated, getSingleUserOrder);


module.exports = router;
