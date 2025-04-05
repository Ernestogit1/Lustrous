import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllNotifications } from '../../redux/actions/notification.Actions';
import { useNavigation } from '@react-navigation/native';

const NotificationDisplayScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { notifications } = useSelector(state => state.notificationList);

  useEffect(() => {
    dispatch(fetchAllNotifications());
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.notification}
      onPress={() =>
        navigation.navigate('SingleNotification', {
          notificationId: item._id,
        })
      }
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
      <Text style={styles.date}>{new Date(item.createdAt).toLocaleString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No notifications found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  notification: {
    backgroundColor: '#f4f4f4',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: { fontWeight: 'bold', fontSize: 16 },
  body: { marginTop: 4 },
  date: { marginTop: 6, color: 'gray', fontSize: 12 },
  empty: { padding: 20, textAlign: 'center', fontSize: 16 },
});

export default NotificationDisplayScreen;
