
const User = require('../models/user.model');

const expirePushTokens = async () => {
  try {
    // const oneMinuteAgo = new Date(Date.now() - 60 * 1000);

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const expiredUsers = await User.find({
        pushToken: { $ne: '' },
        updatedAt: { $lt: twentyFourHoursAgo }, 
      });

    // const expiredUsers = await User.find({
    //   pushToken: { $ne: '' },
    //   updatedAt: { $lt: oneMinuteAgo }, 
    // });

    for (const user of expiredUsers) {
      console.log(`⏳ Expiring pushToken for: ${user.email}`);
      user.pushToken = '';
      await user.save();
    }

    console.log(`✅ Push token cleanup completed. Expired ${expiredUsers.length} token(s).`);
  } catch (err) {
    console.error('❌ Error cleaning up tokens:', err.message);
  }
};

// 🚀 Start interval every 1 min
const startPushTokenCleaner = () => {
  setInterval(expirePushTokens, 60 * 1000);
};

module.exports = { startPushTokenCleaner };
