const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/Product.routes.js'); 
const userRoutes = require('./routes/User.routes.js');

const app = express();


app.use(express.json()); // ✅ Required to parse JSON
app.use(express.urlencoded({ extended: true })); // ✅ Required for form data
app.use(cors());





app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);


module.exports = app;
