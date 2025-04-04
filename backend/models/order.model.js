const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Order Placed', 'Shipped', 'Completed', 'Canceled'],
    default: 'Order Placed',
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
