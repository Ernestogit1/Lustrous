const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/product.routes.js'); 
const authRoutes = require('./routes/auth.routes.js');
const orderRoutes = require('./routes/order.routes');

const app = express();


app.use(express.json()); // ✅ Required to parse JSON
app.use(express.urlencoded({ extended: true })); // ✅ Required for form data
app.use(cors());



// test

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);


module.exports = app;
