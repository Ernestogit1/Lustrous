const Review = require('../models/review.model');
const Order = require('../models/order.model');

const createReview = async (req, res) => {
    try {
      const userId = req.user.userId || req.user._id;
      const { orderId, rating, comment } = req.body;
  
      console.log('[REVIEW PAYLOAD]', { userId, orderId, rating, comment });
  
      const order = await Order.findOne({ _id: orderId, user: userId });
      if (!order) return res.status(404).json({ message: 'Order not found' });
      if (order.status !== 'Completed') {
        return res.status(400).json({ message: 'Only completed orders can be reviewed' });
      }
  
      const existing = await Review.findOne({ orderId });
      if (existing) {
        return res.status(400).json({ message: 'Review already exists' });
      }
  
      const review = await Review.create({
        userId,
        orderId,
        rating,
        comment,
      });
  
      return res.status(201).json({ message: 'Review created', review });
    } catch (error) {
      console.error('[REVIEW ERROR]', error.message);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  const getUserReviewByOrder = async (req, res) => {
    try {
      const userId = req.user.userId || req.user._id; // Ensure user is attached
      const { orderId } = req.params;
  
      console.log('Fetching review for:', { userId, orderId }); // Debugging log
  
      // Query the Review model
      const review = await Review.findOne({ userId, orderId });
      if (!review) {
        console.log('No review found for this order'); // Debugging log
        return res.status(404).json({ message: 'No review found for this order' });
      }
  
      console.log('Review found:', review); // Debugging log
      res.status(200).json({ review });
    } catch (error) {
      console.error('Error fetching review:', error.message); // Debugging log
      res.status(500).json({ message: 'Error fetching review', error: error.message });
    }
  };
module.exports = { createReview, getUserReviewByOrder };
