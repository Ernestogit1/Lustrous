const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User',  required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Notification', NotificationSchema);
