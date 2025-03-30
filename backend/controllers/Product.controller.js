const Product = require('../models/product.model');
const { cloudinary } = require('../config/cloudinary');

const createProduct = async (req, res) => {
  try {
    const { name, category, price, description, stock } = req.body;

    if (!name || !category || !price || !description || stock === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (stock < 0 || price < 0) {
      return res.status(400).json({ message: "Stock and Price cannot be negative" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    if (req.files.length > 5) {
      return res.status(400).json({ message: "You can only upload up to 5 images" });
    }

    // ✅ req.files already contains secure_url and public_id
    const imageUrls = req.files.map(file => ({
      public_id: file.filename, // filename is public_id
      url: file.path            // path is the Cloudinary secure_url
    }));

    const newProduct = new Product({
      name,
      category,
      price,
      description,
      stock,
      images: imageUrls,
    });

    await newProduct.save();
    return res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error("❌ Error creating product:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const { name, category, price, description, stock } = req.body;

    product.name = name || product.name;
    product.category = category || product.category;
    product.price = price || product.price;
    product.description = description || product.description;
    product.stock = stock ?? product.stock;

    // If images are uploaded, delete old ones from cloudinary
    if (req.files && req.files.length > 0) {
      for (const img of product.images) {
        await cloudinary.uploader.destroy(img.public_id);
      }

      const uploadedImages = req.files.map(file => ({
        public_id: file.filename,
        url: file.path,
      }));
      product.images = uploadedImages;
    }

    const updated = await product.save();
    return res.status(200).json({ message: "Product updated", product: updated });
  } catch (error) {
    console.error('❌ Update error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const productsDataTable = async (req, res) => {
  try {

    const products = await Product.find({ deleted: false }).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("❌ Error fetching all products (raw):", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


const softDeleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.deleted = true;
    await product.save();

    res.status(200).json({ message: "Product moved to trash." });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const restoreProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.deleted = false;
    await product.save();

    res.status(200).json({ message: "Product restored." });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const permanentDeleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    for (const img of product.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    await product.deleteOne();
    res.status(200).json({ message: "Product permanently deleted." });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const listTrashedProducts = async (req, res) => {
  try {
    const products = await Product.find({ deleted: true }).sort('-createdAt');
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
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
  createProduct, getProducts, getProductById, productsDataTable, updateProduct, permanentDeleteProduct, softDeleteProduct, restoreProduct, listTrashedProducts
};