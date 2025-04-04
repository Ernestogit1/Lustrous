const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name:  { 
      type: String, 
      required: true 
    
    },
    email:  { 
      type: String, 
      required: true, 
      unique: true 
    },
    firebaseUid: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true, 
      default: "firebase-manage" 
    }, 
    phoneNumber:  { 
      type: String, 
      required: true 
    },
    address: { 
      type: String ,
      required: true
    },
    avatar: {
       type: String, 
       default: '',
       required: true
       }, 
    isAdmin: {
       type: Boolean, 
       default: false 
      },
    pushToken: {
       type: String,
        default: '' 
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
