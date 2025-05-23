const Notification = require('../models/notification.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');
const { sendPushNotification } = require('../utils/SendNotification');

const createNotification = async (req, res) => {
  try {
    const { productId, title, body, newPrice } = req.body;
    const adminId = req.user.userId; 

    if (!productId || !title || !body) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    if (newPrice) {
      await Product.findByIdAndUpdate(productId, { price: Number(newPrice) });
    }

    const users = await User.find({ pushToken: { $ne: '' } });

    for (const user of users) {
      const existing = await Notification.findOne({
        userId: user._id,
        productId,
        title,
        body,
      });

      if (!existing && user && user._id) {
        await Notification.create({
          userId: user._id,
          productId,
          title,
          body,
        });

        await sendPushNotification(user._id, {
          title,
          body,
          data: { screen: 'SingleNotification' },
        });
      }
    }

    const adminExists = await Notification.findOne({
      userId: adminId,
      productId,
      title,
      body,
    });

    if (!adminExists) {
      await Notification.create({
        userId: adminId,
        productId,
        title,
        body,
      });
    }

    res.status(201).json({ message: 'Notifications sent and saved per user once.' });
  } catch (err) {
    console.error('Notification error:', err.message);
    res.status(500).json({ message: 'Failed to send notifications' });
  }
};



const getAllNotifications = async (req, res) => {
  try {
    const userId = req.user._id || req.user.userId;
    const notifs = await Notification.find({ userId })
      .sort({ createdAt: -1 })
      .populate('productId', 'name images price');

    res.status(200).json({ notifications: notifs });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch notifications', error: err.message });
  }
};

const getNotificationById = async (req, res) => {
  try {
    const userId = req.user._id || req.user.userId;
    const { id } = req.params;

    const notification = await Notification.findOne({ _id: id, userId }).populate('productId');

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json({ notification });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch notification', error: err.message });
  }
};


module.exports = {
  createNotification,
  getAllNotifications,
  getNotificationById,
};
