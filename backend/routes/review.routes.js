const express = require('express');
const { createReview, getUserReviewByOrder, updateReview } = require('../controllers/review.controller');
const isAuthenticated = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/', isAuthenticated, createReview);
router.get('/:orderId', isAuthenticated, getUserReviewByOrder);
router.put('/:orderId', isAuthenticated, updateReview);

module.exports = router;
