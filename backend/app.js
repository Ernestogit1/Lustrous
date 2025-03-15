const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/Product.routes.js'); 



const app = express();


app.use(express.json());
app.use(cors());
app.use('/api/products', productRoutes);




module.exports = app;
