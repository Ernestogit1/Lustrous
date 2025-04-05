import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLatestNotification } from '../../redux/actions/notification.Actions';

const SingleNotificationScreen = () => {
  const dispatch = useDispatch();
  const { notification } = useSelector((state) => state.latestNotification);

  useEffect(() => {
    dispatch(fetchLatestNotification());
  }, [dispatch]);

  useEffect(() => {
    console.log('📥 SingleNotificationScreen mounted');
  }, []);
  
  const debugNotif = JSON.stringify(notification, null, 2);
  console.log('[🧪 NOTIFICATION PAYLOAD]', debugNotif);

  if (!notification) {
    return <Text style={styles.empty}>No notification yet</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{notification.title}</Text>
      <Text style={styles.body}>{notification.body}</Text>
      <Text style={styles.time}>{new Date(notification.createdAt).toLocaleString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold' },
  body: { marginTop: 8, fontSize: 16 },
  time: { marginTop: 12, fontSize: 12, color: 'gray' },
  empty: { padding: 20, textAlign: 'center', fontSize: 16 },
});

export default SingleNotificationScreen;
