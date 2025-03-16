const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Lip Products', 'Foundation', 'Palette', 'Blush', 'Tools'],
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0, // Prevents negative stock values
  },
  images: [
    {
      public_id: String,
      url: String,
    },
  ],
  rate: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
