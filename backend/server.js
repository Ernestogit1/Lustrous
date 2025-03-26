const app = require("./app");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const createAdminUser = require("./utils/adminSetup"); 

dotenv.config();
connectDB().then(() => {
  createAdminUser(); 
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
