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
      const userId = req.user.userId || req.user._id; 
      const { orderId } = req.params;
  
      console.log('Fetching review for:', { userId, orderId }); 
  
      
      const review = await Review.findOne({ userId, orderId });
      if (!review) {
        console.log('No review found for this order'); 
        return res.status(404).json({ message: 'No review found for this order' });
      }
  
      console.log('Review found:', review); 
      res.status(200).json({ review });
    } catch (error) {
      console.error('Error fetching review:', error.message); 
      res.status(500).json({ message: 'Error fetching review', error: error.message });
    }
  };

  const updateReview = async (req, res) => {
    try {
      const userId = req.user.userId || req.user._id;
      const { orderId } = req.params;
      const { rating, comment } = req.body;
  
      const review = await Review.findOne({ userId, orderId });
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
  
      review.rating = rating;
      review.comment = comment;
      await review.save();
  
      return res.status(200).json({ message: 'Review updated', review });
    } catch (error) {
      console.error('[UPDATE REVIEW ERROR]', error.message);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

  const getProductReviews = async (req, res) => {
    try {
      const { productId } = req.params;
      
      console.log('[FETCH PRODUCT REVIEWS]', { productId });
      
      const orders = await Order.find({ 
        'products.product': productId, 
        status: 'Completed'
      });
      
      if (!orders || orders.length === 0) {
        console.log('[PRODUCT REVIEWS] No completed orders found for this product');
        return res.status(200).json([]);
      }
      
      const orderIds = orders.map(order => order._id);
      console.log(`[PRODUCT REVIEWS] Found ${orderIds.length} orders for this product`);
      
      const reviews = await Review.find({ 
        orderId: { $in: orderIds } 
      }).populate({
        path: 'userId',
        select: 'name email profileImage'
      });
      const mappedReviews = await Promise.all(reviews.map(async (review) => {
        const order = orders.find(o => o._id.toString() === review.orderId.toString());
        
        const orderProduct = order?.products.find(item => 
          item.product.toString() === productId.toString()
        );
        
        return {
          _id: review._id,
          rating: review.rating,
          comment: review.comment,
          createdAt: review.createdAt,
          updatedAt: review.updatedAt,
          user: {
            _id: review.userId?._id,
            name: review.userId?.name || 'Anonymous',
            email: review.userId?.email,
            profileImage: review.userId?.profileImage
          },
          productQuantity: orderProduct?.quantity || 1
        };
      }));
      
      console.log(`[PRODUCT REVIEWS] Found ${mappedReviews.length} reviews for product`);
      return res.status(200).json(mappedReviews);
    } catch (error) {
      console.error('[PRODUCT REVIEWS ERROR]', error.message);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

module.exports = { createReview, getUserReviewByOrder, updateReview, getProductReviews };
