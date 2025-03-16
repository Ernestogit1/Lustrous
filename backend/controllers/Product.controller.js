const Product = require('../models/product.model');
const { cloudinary } = require('../config/cloudinary');

const createProduct = async (req, res) => {
  try {
    const { name, category, stock } = req.body;

    // ✅ Validate required fields
    if (!name || !category || stock === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (stock < 0) {
      return res.status(400).json({ message: "Stock cannot be negative" });
    }

    // ✅ Check if Multer is correctly passing files
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    if (req.files.length > 5) {
      return res.status(400).json({ message: "You can only upload up to 5 images" });
    }

    let imageUrls = [];
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'products',
      });

      imageUrls.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    const newProduct = new Product({
      name,
      category,
      stock,
      images: imageUrls,
    });

    await newProduct.save();
    
    return res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error("❌ Error creating product:", error); // ✅ Log for debugging
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createProduct };
