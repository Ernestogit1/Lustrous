const Product = require('../models/product.model.js');
const { cloudinary } = require('../config/cloudinary');

const createProduct = async (req, res) => {
    try {
      const { name, category, stock } = req.body;
      const files = req.files;
  
      if (!files || files.length === 0) {
        return res.status(400).json({ message: 'Please upload at least one image' });
      }
  
      // Upload images to Cloudinary
      const images = await Promise.all(
        files.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path, { folder: 'products' });
          return { url: result.secure_url, public_id: result.public_id };
        })
      );
  
      // Save product to database
      const product = new Product({
        name,
        category,
        stock,
        images,
      });
  
      await product.save();
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createProduct, getProducts };
