const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/product.model');
const { cloudinary } = require('../config/cloudinary');
const { faker } = require('@faker-js/faker');

// Connect to Database
connectDB();

const categories = ['Lip Products', 'Foundation', 'Palette', 'Blush', 'Tools'];

// List of makeup-related image URLs
const makeupImages = [
  'https://i.pinimg.com/736x/d2/69/dd/d269dd466623c96e27ce0c25b9eaae7e.jpg',
  'https://i.pinimg.com/736x/5b/58/ef/5b58efce1da14b0caa21aaae02de1f53.jpg',
  'https://i.pinimg.com/736x/0d/76/c2/0d76c2bc331d538a4c12034dd41ab05c.jpg',
  'https://i.pinimg.com/736x/3e/84/e3/3e84e3304817ff7a83793f4fe9940f58.jpg',
  'https://i.pinimg.com/736x/a0/c7/60/a0c7603298f6bb7117dde648414b688a.jpg',
  'https://i.pinimg.com/736x/54/48/03/544803c0ab1f43fed527b6d138b18e33.jpg',
  'https://i.pinimg.com/736x/79/34/dd/7934ddc942c2043714a4c99b998c6403.jpg',
  'https://i.pinimg.com/736x/d7/cf/84/d7cf840bed5150bea5626cca0bb4a376.jpg',
  'https://i.pinimg.com/474x/e8/c8/dd/e8c8dde369527685dea964a70e94edb0.jpg',
  'https://i.pinimg.com/474x/7d/db/bd/7ddbbd853381a227d98e9d546988a560.jpg',
  'https://i.pinimg.com/474x/7e/db/d0/7edbd0970f7dd8152a0bca512c8bfc8e.jpg',
  'https://i.pinimg.com/474x/7e/8a/72/7e8a729038b64efc4f8ffde9a5e49660.jpg',
  'https://i.pinimg.com/474x/59/e4/9e/59e49e460031c3c73fbc09048644060d.jpg',
  'https://i.pinimg.com/474x/27/20/56/2720561f5aa6a9d7c502cac7101c9a00.jpg',
  'https://i.pinimg.com/474x/9d/8b/75/9d8b7581ebb346324fe26884a7a8fe68.jpg',
  'https://i.pinimg.com/474x/03/4a/8c/034a8c251e0f98ba39e499bfafb1a707.jpg',
  'https://i.pinimg.com/474x/24/f8/f2/24f8f29480742cabc6be68173eb9d6c3.jpg',
  'https://i.pinimg.com/474x/98/19/19/981919011ce974b338cf39fb543d3664.jpg',
  'https://i.pinimg.com/474x/25/c5/a0/25c5a0469d9a4c3f92733da0ab62bf90.jpg'
];

const makeupAdjectives = ['Shiny', 'Matte', 'Glossy', 'Radiant', 'Velvety', 'Smooth', 'Luminous', 'Hydrating'];
const makeupMaterials = ['Lipstick', 'Foundation', 'Palette', 'Blush', 'Concealer', 'Highlighter', 'Primer', 'Mascara'];

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

const getRandomImageCount = () => {
  const random = Math.random();
  return random < 0.5 ? faker.number.int({ min: 1, max: 3 }) : 5;
};

const seedProducts = async () => {
  try {
    await Product.deleteMany(); 
    console.log('Existing products cleared.');

    const products = [];

    for (let i = 0; i < 10; i++) {

      const numImages = getRandomImageCount();
      const imageUploads = [];

      for (let j = 0; j < numImages; j++) {

        const imageUrl = makeupImages[Math.floor(Math.random() * makeupImages.length)];
        const uploadedImage = await uploadImageToCloudinary(imageUrl);

        if (uploadedImage) {
          imageUploads.push(uploadedImage);
        }
      }

      const product = new Product({
        name: `${makeupAdjectives[Math.floor(Math.random() * makeupAdjectives.length)]} ${makeupMaterials[Math.floor(Math.random() * makeupMaterials.length)]}`,
        category: categories[Math.floor(Math.random() * categories.length)],
        price: faker.commerce.price({ min: 10, max: 200, dec: 2 }),
        description: faker.lorem.sentence({ min: 10, max: 20 }) + ' Perfect for your beauty routine.',
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