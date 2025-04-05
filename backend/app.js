const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/product.routes.js'); 
const authRoutes = require('./routes/auth.routes.js');
const orderRoutes = require('./routes/order.routes');
const reviewRoutes = require('./routes/review.routes.js'); 
const notificationRoutes = require('./routes/notification.route.js');
const app = express();


app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors());





app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use ('/api/notifications', notificationRoutes); 


module.exports = app;
