const User = require('../models/user.model');
const axios = require('axios');

const sendPushNotification = async (userId, payload) => {
  const user = await User.findById(userId);
  const token = user?.pushToken;

  if (!token || !token.startsWith('ExponentPushToken')) return;

  const message = {
    to: token,
    sound: 'default',
    title: payload.title,
    body: payload.body,
    data: payload.data,
  };

  try {
    await axios.post('https://exp.host/--/api/v2/push/send', message, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(`📲 Notification sent to ${user.name}`);
  } catch (err) {
    console.error('[Expo Notification Error]', err.response?.data || err.message);
    if (
      err.response?.data?.errors?.some(e => e.code === 'DeviceNotRegistered')
    ) {
      user.pushToken = '';
      await user.save();
      console.log('🧹 Removed stale Expo token');
    }
  }
};

module.exports = { sendPushNotification };
