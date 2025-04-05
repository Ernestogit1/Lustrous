const Notification = require('../models/notification.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');
const { sendPushNotification } = require('../utils/SendNotification');

const createNotification = async (req, res) => {
  try {
    const { productId, title, body, newPrice } = req.body;
    const adminId = req.user._id;

    if (!productId || !title || !body) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    // Optional price update
    if (newPrice) {
      await Product.findByIdAndUpdate(productId, { price: Number(newPrice) });
    }

    // Create notification document for each user
    const users = await User.find({ pushToken: { $ne: '' } });

    for (const user of users) {
      await Notification.create({
        userId: adminId,
        productId,
        title,
        body,
      });

      // Push it!
      await sendPushNotification(user._id, {
        title,
        body,
        data: { screen: 'SingleNotification' },
      });
    }

    res.status(201).json({ message: 'Notifications sent successfully.' });
  } catch (err) {
    console.error('Notification error:', err.message);
    res.status(500).json({ message: 'Failed to send notifications' });
  }
};

const fetchLatestNotification = async (req, res) => {
  try {
    const userId = req.user._id;
    const notif = await Notification.findOne({ userId }).sort({ createdAt: -1 }).populate('productId');

    if (!notif) {
      return res.status(404).json({ message: 'No notifications found' });
    }

    res.status(200).json({ notification: notif });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  createNotification,
  fetchLatestNotification,
};
