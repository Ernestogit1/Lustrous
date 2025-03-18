const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email address'
    }
  },
  password: {
    type: String,
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false // Don't include password in query results by default
  },
  phoneNumber: {
    type: String,
    trim: true,
    validate: {
      validator: function(value) {
        // Allow empty values or validate phone number format
        return !value || /^\+?[\d\s-()]{8,20}$/.test(value);
      },
      message: 'Please provide a valid phone number'
    }
  },
  address: {
    type: String,
    trim: true
  },
  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    }
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Encrypt password before saving user (only for non-Firebase auth users)
userSchema.pre('save', async function(next) {
  // Skip password hashing if no password (for OAuth users) or password not modified
  if (!this.password || !this.isModified('password')) {
    return next();
  }
  
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    
    // Hash the password along with our new salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare entered password with user's hashed password
userSchema.methods.comparePassword = async function(enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create a User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;