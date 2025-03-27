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

const getProducts = async (req, res) => {
  try {

    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort || '-createdAt'; 
    const category = req.query.category || '';
    

    const query = {};
    if (category) {
      query.category = category;
    }
    
    const totalProducts = await Product.countDocuments(query);
    
    const products = await Product.find(query)
      .sort(sort)
      .limit(limit)
      .skip((page - 1) * limit);
    
    return res.status(200).json({
      products,
      page,
      pages: Math.ceil(totalProducts / limit),
      total: totalProducts
    });
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    return res.status(200).json(product);
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { 
  createProduct, getProducts, getProductById
};