import React, { useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, Dimensions, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotificationById  } from '../../redux/actions/notification.Actions';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles, { COLORS } from '../../screens/style/client/SingleNotificationScreen.Style';

const { width } = Dimensions.get('window');

const SingleNotificationScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { notification } = useSelector((state) => state.latestNotification);
  const { notificationId } = route.params || {};


  useEffect(() => {
    if (notificationId) {
      dispatch(fetchNotificationById(notificationId));
    }
  }, [dispatch, notificationId]);

  const getNotificationIcon = (type) => {
    // Map notification types to appropriate icons
    switch(type) {
      case 'order':
        return 'cart';
      case 'payment':
        return 'card';
      case 'delivery':
        return 'bicycle';
      default:
        return 'notifications';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleString('en-US', options);
  };

  if (!notification) {
    return (
      <LinearGradient
        colors={[`${COLORS.lightPink}40`, `${COLORS.lightPurple}30`]}
        style={styles.emptyContainer}
      >
        <Ionicons name="notifications-off" size={64} color={COLORS.lightPurple} />
        <Text style={styles.empty}>Notification not found</Text>
      </LinearGradient>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[COLORS.lightPurple, COLORS.darkPurple]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Notification</Text>
      </LinearGradient>
      
      {/* Background Pattern Elements */}
      <View style={styles.patternContainer}>
        <LinearGradient 
          colors={[COLORS.lightPink, COLORS.lightPurple]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{...StyleSheet.absoluteFillObject, opacity: 0.07}}
        />
        <View style={[styles.diagonalLine1, {backgroundColor: `${COLORS.lightPurple}30`}]} />
        <View style={[styles.diagonalLine2, {backgroundColor: `${COLORS.mediumPink}30`}]} />
        <View style={[styles.circle1, {borderColor: `${COLORS.lightPurple}30`}]} />
        <View style={[styles.circle2, {borderColor: `${COLORS.mediumPink}30`}]} />
        <View style={[styles.dot1, {backgroundColor: `${COLORS.lightPurple}40`}]} />
        <View style={[styles.dot2, {backgroundColor: `${COLORS.mediumPink}40`}]} />
        <View style={[styles.dot3, {backgroundColor: `${COLORS.lightPink}40`}]} />
        <View style={[styles.dot4, {backgroundColor: `${COLORS.darkPurple}40`}]} />
        
        {[...Array(5)].map((_, i) => (
          <View 
            key={`line-${i}`} 
            style={[styles.horizontalLine, { 
              top: 100 + (i * 120),
              backgroundColor: i % 2 === 0 ? `${COLORS.lightPink}20` : `${COLORS.lightPurple}20`
            }]} 
          />
        ))}
        
        {[...Array(8)].map((_, i) => (
          <View 
            key={`verticalLine-${i}`}
            style={[styles.verticalLine, { 
              left: (i * width/8),
              backgroundColor: i % 2 === 0 ? `${COLORS.lightPurple}20` : `${COLORS.lightPink}20`
            }]} 
          />
        ))}
      </View>
      
      <ScrollView style={styles.contentScrollView}>
        <View style={styles.notificationCard}>
          <LinearGradient
            colors={[`${COLORS.lightPink}30`, `${COLORS.lightPurple}20`]}
            style={styles.iconSection}
          >
            <LinearGradient
              colors={[COLORS.lightPurple, COLORS.darkPurple]}
              style={styles.iconContainer}
            >
              <Ionicons 
                name={getNotificationIcon(notification.type)} 
                size={28} 
                color="#FFFFFF" 
              />
            </LinearGradient>
          </LinearGradient>
          
          <LinearGradient
            colors={[`${COLORS.lightPink}10`, `${COLORS.lightPurple}05`]}
            style={styles.contentSection}
          >
            <Text style={styles.title}>{notification.title}</Text>
            <Text style={styles.time}>{formatDate(notification.createdAt)}</Text>
            
            <LinearGradient 
              colors={[COLORS.lightPink, COLORS.lightPurple]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.divider}
            />
            
            <LinearGradient
              colors={[`${COLORS.lightPink}20`, `${COLORS.lightPurple}15`]}
              style={styles.bodyContainer}
            >
              <Text style={styles.body}>{notification.body}</Text>
            </LinearGradient>
            
            {notification.data && (
              <LinearGradient
                colors={[`${COLORS.lightPurple}20`, `${COLORS.mediumPink}15`]}
                style={styles.dataContainer}
              >
                {Object.entries(notification.data).map(([key, value]) => (
                  <Text key={key} style={styles.dataText}>
                    <Text style={styles.dataLabel}>{key}: </Text>
                    {value}
                  </Text>
                ))}
              </LinearGradient>
            )}
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingleNotificationScreen;