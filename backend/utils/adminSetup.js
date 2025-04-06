const admin = require("../config/firebaseAdmin"); // Firebase Admin SDK
const User = require("../models/user.model");

const createAdminUser = async () => {
  try {
    const existingAdmin = await User.findOne({ isAdmin: true });

    if (existingAdmin) {
      console.log("✅ Admin account already exists.");
      return;
    }

    console.log("🚀 No admin found. Creating an admin account...");

    //  Check existing Firebase  admin email
    let userRecord;
    try {
      userRecord = await admin.auth().getUserByEmail("admin@gmail.com");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        console.log("🔹 Admin does not exist in Firebase. Creating new Firebase user...");
        userRecord = await admin.auth().createUser({
          email: "admin@gmail.com",// } ====
          password: "admin123",  //        || => Store in firebase
          displayName: "Admin",// } ========
        });
      } else {
        console.error("🔥 Firebase error:", error);
        return;
      }
    }

    // if no admin exist in MongoDB, create one
    const newAdmin = new User({
      name: "Admin",//==============================||
      email: "admin@gmail.com",//                   ||
      firebaseUid: userRecord.uid,//                || 
      password: "firebase-manage", //               ||      
      phoneNumber: "999999", //                     ||======> Sotre in MongoDB   
      address: "Not Provided", //                   ||   
      avatar: "default-avatar.png", //              ||   
      isAdmin: true,//                              || 
      fcmToken: "",//===============================||
    });

    await newAdmin.save();
    console.log("✅ Admin account successfully created in MongoDB!");
  } catch (error) {
    console.error("🔥 Error setting up admin account:", error);
  }
};

module.exports = createAdminUser;
