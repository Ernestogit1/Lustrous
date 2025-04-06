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
    min: 0, 
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000, 
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
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
  
}, { 
  timestamps: true
 });

module.exports = mongoose.model('Product', ProductSchema);
