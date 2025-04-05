const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/auth.middleware');
const { createNotification, fetchLatestNotification, getAllNotifications } = require('../controllers/notification.controller');

router.post('/', isAuthenticated, createNotification);
router.get('/latest', isAuthenticated, fetchLatestNotification);
router.get('/all', isAuthenticated, getAllNotifications);

module.exports = router;
