const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ['Lip Products', 'Foundation', 'Palette', 'Blush', 'Tools'],
      required: true,
    },
    stock: { type: Number, required: true },
    images: [{ url: String, public_id: String }],
    rate: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
