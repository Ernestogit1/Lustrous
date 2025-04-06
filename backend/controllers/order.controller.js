const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const Order = require('../models/order.model');
const User = require('../models/user.model');
const { sendPushNotification } = require('../utils/sendNotification');

const addToCart = async (req, res) => {
    try {
      const userId = req.user?.userId || req.user?._id;
      const { productId } = req.body;
  
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      let cartItem = await Cart.findOne({ user: userId, product: productId });
  
      if (cartItem) {
        if (cartItem.quantity >= product.stock) {
          return res.status(400).json({
            success: false,
            message: 'Maximum quantity reached for this product',
          });
        }
        cartItem.quantity += 1;
      } else {
        cartItem = new Cart({
          user: userId,
          product: productId,
          quantity: 1,
        });
      }
  
      await cartItem.save();
  
      
      await cartItem.populate('product', 'name price images stock');
  
      res.status(200).json({ success: true, cartItem }); 
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: err.message,
      });
    }
  };
  

  const updateCartQuantity = async (req, res) => {
    try {
      const userId = req.user?.userId || req.user?._id;
      const { id } = req.params; 
      const { type } = req.body; 
  
      const cartItem = await Cart.findOne({ _id: id, user: userId }).populate('product');
      if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });
  
      if (type === 'increase') {
        if (cartItem.quantity >= cartItem.product.stock) {
          return res.status(400).json({ message: 'Cannot exceed stock quantity' });
        }
        cartItem.quantity += 1;
      } else if (type === 'decrease') {
        if (cartItem.quantity > 1) {
          cartItem.quantity -= 1;
        } else {
          return res.status(400).json({ message: 'Minimum quantity is 1' });
        }
      }
  
      await cartItem.save();
      res.status(200).json({ success: true, cartItem });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };

const getCartItems = async (req, res) => {
  try {
    const userId = req.user?.userId || req.user?._id;
        const items = await Cart.find({ user: userId })
      .populate('product', 'name price images stock description');

    res.status(200).json({ success: true, items });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const removeFromCart = async (req, res) => {
    try {
      const cartItemId = req.params.id;
      const userId = req.user?.userId || req.user?._id;
  
      const cartItem = await Cart.findOneAndDelete({
        _id: cartItemId,
        user: userId,
      });
  
      if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
      }
  
      res.status(200).json({ success: true, message: 'Item removed from cart' });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
  };

  const checkoutOrder = async (req, res) => {
    try {
      const userId = req.user?.userId || req.user?._id;
  
      const cartItems = await Cart.find({ user: userId }).populate('product');
      if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ message: 'Cart is empty' });
      }
  
      const products = [];
      let subtotal = 0;
      const skipped = [];
  
      for (const item of cartItems) {
        const product = item.product;
  
        if (product.stock < item.quantity) {
          skipped.push(product.name);
          continue;
        }
  
        product.stock -= item.quantity;
        await product.save();
  
        products.push({
          product: product._id,
          quantity: item.quantity,
        });
  
        subtotal += product.price * item.quantity;
      }
  
      if (products.length === 0) {
        return res.status(400).json({
          message: 'No products available to order. Out of stock: ' + skipped.join(', ')
        });
      }
  
      const shipping = 50;
      const totalAmount = subtotal + shipping;
  
      const order = new Order({
        user: userId,
        products,
        totalAmount,
        status: 'Order Placed',
      });
  
      await order.save();
  
      const orderedIds = products.map(p => p.product);
      await Cart.deleteMany({ user: userId, product: { $in: orderedIds } });
  
      const user = await User.findById(userId);
      const productNames = cartItems
        .filter(i => orderedIds.includes(i.product._id.toString()))
        .map(i => i.product.name)
        .join(', ');
  
      const totalQty = products.reduce((sum, i) => sum + i.quantity, 0);
  
      await sendPushNotification(userId, {
        title: `🛒 Order Placed`,
        body: `${user.name} ordered ${totalQty} item(s): ${productNames}. Total ₱${totalAmount}`,
        data: {
          screen: "OrderDetail", 
          orderId: order._id.toString()
        }
      });
  
      res.status(201).json({
        message: skipped.length > 0
          ? `Order placed. Skipped out-of-stock: ${skipped.join(', ')}`
          : 'Order placed successfully',
        order
      });
  
    } catch (error) {
      console.error('[checkoutOrder] Error:', error);
      res.status(500).json({ message: 'Checkout failed', error: error.message });
    }
  };
  
  
  
    


  const getUserOrders = async (req, res) => {
    try {
      const userId = req.user?.userId || req.user?._id;
  
      const statusParam = req.query.status;
      let statusFilter;
  
      if (!statusParam) {
        statusFilter = ['Order Placed', 'Shipped']; 
      } else if (Array.isArray(statusParam)) {
        statusFilter = statusParam;
      } else {
        statusFilter = statusParam.split(',');
      }
  
      const orders = await Order.find({
        user: userId,
        status: { $in: statusFilter },
      })
        .sort({ createdAt: -1 })
        .populate({ path: 'products.product', select: 'name images price' });
  
      res.status(200).json({ orders });
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
    }
  };
  
  
  
  const cancelOrder = async (req, res) => {
    try {
      const userId = req.user?.userId || req.user?._id;
      const { id } = req.params;
  
      console.log('[CancelOrder]', { userId, orderId: id });
  
      const order = await Order.findOne({ _id: id, user: userId });
  
      if (!order || order.status !== 'Order Placed') {
        console.log('[CancelOrder] Order not found or not cancellable', order?.status);
        return res.status(400).json({ message: 'Only "Order Placed" can be cancelled.' });
      }
  
      order.status = 'Cancelled';
      await order.save();
  
      res.status(200).json({ message: 'Order cancelled successfully' });
    } catch (err) {
      console.error('[CancelOrder] Server Error', err.message);
      res.status(500).json({ message: 'Failed to cancel order', error: err.message });
    }
  };
  
  const getSingleUserOrder = async (req, res) => {
    try {
      const userId = req.user?._id || req.user?.userId;
      const { id } = req.params;
  
      const order = await Order.findOne({
        _id: id,
        user: userId,
      }).populate('products.product', 'name images price');
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.status(200).json({ order });
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch order', error: err.message });
    }
  };

  // ======================={ADMIN SIDE}========================
  const updateOrderStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      const order = await Order.findById(id).populate('user', 'name pushToken');
      if (!order) return res.status(404).json({ message: 'Order not found' });
  
      order.status = status;
      await order.save();
  
      await sendPushNotification(order.user._id, {
        title: '📦 Order Status Updated',
        body: `Your order ${order._id} is now "${status}"`,
        data: { screen: 'OrderDetail', orderId: order._id.toString() }
      });
  
      res.status(200).json({ message: 'Order status updated', order });
    } catch (err) {
      res.status(500).json({ message: 'Failed to update order status', error: err.message });
    }
  };
  const getAllOrdersForAdmin = async (req, res) => {
    try {
      const orders = await Order.find({
        status: { $nin: ['Completed', 'Cancelled'] },
      })
        .populate('user', 'name pushToken')
        .populate('products.product', 'name images');
  
      res.status(200).json({ orders });
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch admin orders', error: err.message });
    }
  };

  const getCancelledOrdersAdmin = async (req, res) => {
    try {
      const orders = await Order.find({
        status: 'Cancelled'
      })
        .sort({ createdAt: -1 })
        .populate('user', 'name email') 
        .populate({ path: 'products.product', select: 'name images price' });
  
  
      res.status(200).json({ orders });
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch cancelled orders', error: err.message });
    }
  };

  const getCompletedOrdersAdmin = async (req, res) => {
    try {
      const orders = await Order.find({ status: 'Completed' })
        .sort({ createdAt: -1 })
        .populate('user', 'name email')
        .populate({ path: 'products.product', select: 'name images price' });
  

  
      res.status(200).json({ orders });
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch completed orders', error: err.message });
    }
  };
  
  
  
module.exports = { 
  addToCart, 
  getCartItems, 
  removeFromCart , 
  updateCartQuantity, 
  checkoutOrder,  
  getUserOrders,
  cancelOrder,
  getSingleUserOrder,
  updateOrderStatus,
  getAllOrdersForAdmin,
  getCancelledOrdersAdmin,
  getCompletedOrdersAdmin
};
