const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/product.model');
const { cloudinary } = require('../config/cloudinary');
const axios = require('axios');
const { faker } = require('@faker-js/faker');

// Connect to Database
connectDB();

const categories = ['Lip Products', 'Foundation', 'Palette', 'Blush', 'Tools'];

// Function to upload an image to Cloudinary
const uploadImageToCloudinary = async (imageUrl) => {
  try {
    const uploadedImage = await cloudinary.uploader.upload(imageUrl, {
      folder: 'products',
    });

    return {
      public_id: uploadedImage.public_id,
      url: uploadedImage.secure_url,
    };
  } catch (error) {
    console.error('Image upload error:', error);
    return null;
  }
};

// Function to generate a random number (1-3 or 5)
const getRandomImageCount = () => {
  const random = Math.random();
  return random < 0.5 ? faker.number.int({ min: 1, max: 3 }) : 5;
};

// Function to seed products
const seedProducts = async () => {
  try {
    await Product.deleteMany(); // Clears existing products
    console.log('Existing products cleared.');

    const products = [];

    for (let i = 0; i < 10; i++) {
      // Generate a random number of images (1-3 or 5)
      const numImages = getRandomImageCount();
      const imageUploads = [];

      for (let j = 0; j < numImages; j++) {
        // Get random image from Picsum
        const imageUrl = `https://picsum.photos/800/800?random=${faker.number.int(1000)}`;
        const uploadedImage = await uploadImageToCloudinary(imageUrl);

        if (uploadedImage) {
          imageUploads.push(uploadedImage);
        }
      }

      const product = new Product({
        name: faker.commerce.productName(),
        category: categories[Math.floor(Math.random() * categories.length)],
        price: faker.commerce.price({ min: 10, max: 200, dec: 2 }),
        description: faker.commerce.productDescription(),
        stock: faker.number.int({ min: 1, max: 100 }),
        images: imageUploads,
        rate: parseFloat(faker.number.float({ min: 1, max: 5, precision: 0.1 }).toFixed(1)),
      });

      products.push(product);
      console.log(`Generated product ${i + 1}: ${product.name} with ${numImages} images`);
    }

    await Product.insertMany(products);
    console.log('Products successfully seeded!');
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedProducts();
