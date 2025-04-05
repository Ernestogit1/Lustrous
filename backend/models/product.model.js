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
  price: {
    type: Number,
    required: true,
    min: 0, // Ensures price is not negative
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000, // Limits description length to 1000 characters
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

  deleted: {
    type: Boolean,
    default: false,
  },
  
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
