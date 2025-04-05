const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/auth.middleware');
const { createNotification, fetchLatestNotification } = require('../controllers/notification.controller');

router.post('/', isAuthenticated, createNotification);
router.get('/latest', isAuthenticated, fetchLatestNotification);

module.exports = router;
