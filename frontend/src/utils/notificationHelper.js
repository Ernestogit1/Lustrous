import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Alert, Platform } from 'react-native';
import Constants from 'expo-constants';
import { navigationRef } from './navigationRef';

let notificationListener;


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const setupNotificationListener = () => {
  if (notificationListener) return;

  notificationListener = Notifications.addNotificationResponseReceivedListener(response => {
    const { screen, orderId } = response.notification.request.content.data || {};

    console.log('[Notification] Tapped:', { screen, orderId });
    console.log('📍 Nav ref ready?', navigationRef.isReady());

    if (screen && navigationRef.isReady()) {
      if (orderId) {
        console.log('🔁 Navigating to', screen, 'with orderId', orderId);
        navigationRef.navigate(screen, { orderId });
      } else {
        navigationRef.navigate(screen);
      }
    }
  });
};

export const removeNotificationListener = () => {
  if (notificationListener) {
    notificationListener.remove();
    notificationListener = null;
  }
};

export const registerPushNotifAsync = async () => {
  try {
    if (!Device.isDevice) {
      Alert.alert('Must use physical device for Push Notifications');
      return null;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert('Permission Required', 'Enable notifications in settings');
      return null;
    }



    const tokenData = await Notifications.getExpoPushTokenAsync({
      projectId: Constants?.expoConfig?.extra?.eas?.projectId || 'bc85162b-8429-4715-975f-28a100e64e39',
    });

    if (!tokenData?.data) {
      console.warn('Expo push token not generated');
      return null;
    }

    return tokenData.data;
  } catch (error) {
    console.error('🔔 Push Token Error:', error);
    return null;
  }
};
