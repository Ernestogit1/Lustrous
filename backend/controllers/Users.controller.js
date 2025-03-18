const User = require('../models/user.model');
const { cloudinary } = require('../config/cloudinary');

// Regular email/password registration
const registerUser = async (req, res) => {
  try {
    console.log('Register request received');
    console.log('Form data fields:', req.body);
    console.log('File data:', req.file ? 'File exists' : 'No file uploaded');
    
    const { name, email, password, phoneNumber, address } = req.body;
    
    // ✅ Validate required fields
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }
    
    // For regular auth, require password
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    
    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }
    
    // Initialize avatar
    let avatar = null;
    
    // ✅ Handle avatar upload if file exists - using direct Cloudinary upload like in products
    if (req.file) {
      try {
        console.log('Uploading avatar to Cloudinary...');
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'avatars',
        });
        
        avatar = {
          public_id: result.public_id,
          url: result.secure_url,
        };
        
        console.log('Avatar uploaded successfully:', avatar);
      } catch (uploadError) {
        console.error('Error uploading to Cloudinary:', uploadError);
        return res.status(500).json({ message: "Error uploading avatar", error: uploadError.message });
      }
    }
    
    // Create new user
    const newUser = new User({
      name,
      email,
      password,
      phoneNumber: phoneNumber || '',
      address: address || '',
      avatar: avatar, // Use the full avatar object
      role: 'user'
    });
    
    await newUser.save();
    console.log('User saved successfully with ID:', newUser._id);
    
    // Remove password from response
    const userResponse = newUser.toObject();
    delete userResponse.password;
    
    return res.status(201).json({ 
      message: "User registered successfully", 
      user: userResponse 
    });
    
  } catch (error) {
    console.error("❌ Error registering user:", error); 
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { registerUser };