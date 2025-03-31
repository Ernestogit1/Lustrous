const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

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
  
      // ✅ Populate full product details before sending to frontend
      await cartItem.populate('product', 'name price images stock');
  
      res.status(200).json({ success: true, cartItem }); // ✅ frontend will save to SQLite
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
      const { id } = req.params; // cartItemId
      const { type } = req.body; // 'increase' or 'decrease'
  
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
  

module.exports = { addToCart, getCartItems, removeFromCart , updateCartQuantity };
