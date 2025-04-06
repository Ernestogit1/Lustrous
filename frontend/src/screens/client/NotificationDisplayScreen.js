import React, { useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllNotifications } from '../../redux/actions/notification.Actions';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // ✅ added useFocusEffect
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles, { COLORS } from '../../screens/style/client/NotificationDisplayScreen.style';

const NotificationDisplayScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { notifications } = useSelector(state => state.notificationList);

  // ✅ Fetch notifications every time screen is focused
  useFocusEffect(
    useCallback(() => {
      dispatch(fetchAllNotifications());
    }, [dispatch])
  );

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order': return 'cart';
      case 'payment': return 'card';
      case 'delivery': return 'bicycle';
      default: return 'notifications';
    }
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHrs < 24) return `${diffHrs}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.notification, item.read ? styles.read : styles.unread]}
      onPress={() =>
        navigation.navigate('SingleNotification', { notificationId: item._id })
      }
      activeOpacity={0.7}
    >
      <View style={styles.notificationContent}>
        {item.read ? (
          <View style={[styles.iconContainer, styles.readIconContainer]}>
            <Ionicons name={getNotificationIcon(item.type)} size={22} color="#FFFFFF" />
          </View>
        ) : (
          <LinearGradient
            colors={[COLORS.lightPurple, COLORS.darkPurple]}
            style={styles.iconContainer}
          >
            <Ionicons name={getNotificationIcon(item.type)} size={22} color="#FFFFFF" />
          </LinearGradient>
        )}
        <View style={styles.textContainer}>
          <View style={styles.headerRow}>
            <Text style={[styles.title, item.read ? styles.readTitle : styles.unreadTitle]}>
              {item.title}
            </Text>
            <Text style={styles.date}>{getTimeAgo(item.createdAt)}</Text>
          </View>
          <Text style={styles.body} numberOfLines={2}>{item.body}</Text>
          {!item.read && <View style={styles.unreadDot} />}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="notifications-off" size={48} color={COLORS.lightPurple} />
            <Text style={styles.empty}>No notifications yet</Text>
          </View>
        }
      />
    </View>
  );
};

export default NotificationDisplayScreen;
