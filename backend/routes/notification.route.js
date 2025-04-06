const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/auth.middleware');
const { createNotification, getAllNotifications, getNotificationById } = require('../controllers/notification.controller');

router.post('/', isAuthenticated, createNotification);
router.get('/all', isAuthenticated, getAllNotifications);
router.get('/:id', isAuthenticated, getNotificationById);
module.exports = router;
