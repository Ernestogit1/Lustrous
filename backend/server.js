const app = require("./app");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const createAdminUser = require("./utils/adminSetup"); 
const { startPushTokenCleaner } = require('./utils/autoExpire');

dotenv.config();

startPushTokenCleaner();

connectDB().then(() => {
  createAdminUser(); 
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
