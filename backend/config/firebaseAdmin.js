const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // After renaming the file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
