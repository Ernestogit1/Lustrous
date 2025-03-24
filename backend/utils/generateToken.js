const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (userId, isAdmin) => {
  return jwt.sign({ userId, isAdmin }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

module.exports = generateToken;
