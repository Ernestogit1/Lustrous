import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateReview } from '../../redux/actions/review.Actions';
import { Ionicons } from '@expo/vector-icons';
import styles, { COLORS } from '../style/client/ReviewUpdateScreen.styles';

const ReviewUpdateScreen = ({ route, navigation }) => {
  const { orderId, existingReview } = route.params;
  const dispatch = useDispatch();

  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [comment, setComment] = useState(existingReview?.comment || '');

  const submitUpdate = async () => {
    if (rating < 1 || rating > 5) {
      return Alert.alert('Invalid Rating', 'Please select a rating between 1 and 5');
    }

    try {
      await dispatch(updateReview(orderId, rating, comment));
      Alert.alert('Success', 'Review updated!');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Edit Review</Text>
        </View>
        
        <Text style={styles.orderIdText}>Order #{orderId.slice(-10)}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.label}>Update Rating</Text>
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity 
              key={star} 
              onPress={() => setRating(star)}
              style={styles.starButton}
            >
              <Ionicons
                name={rating >= star ? "star" : "star-outline"}
                size={32}
                color={rating >= star ? COLORS.gold : COLORS.lightGray}
              />
            </TouchableOpacity>
          ))}
        </View>
        
        <Text style={styles.ratingText}>
          {rating === 0 ? 'Tap to rate' : 
           rating === 1 ? 'Poor' : 
           rating === 2 ? 'Fair' :
           rating === 3 ? 'Good' :
           rating === 4 ? 'Very Good' : 'Excellent'}
        </Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.label}>Update Comment</Text>
        <TextInput
          style={styles.input}
          multiline
          value={comment}
          onChangeText={setComment}
          placeholder="Update your review..."
          placeholderTextColor={COLORS.placeholderText}
          maxLength={500}
        />
        <Text style={styles.charCount}>{comment.length}/500</Text>
        
        <TouchableOpacity 
          style={[styles.button, rating === 0 && styles.buttonDisabled]} 
          onPress={submitUpdate}
          disabled={rating === 0}
        >
          <Ionicons name="checkmark-circle" size={18} color="white" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Update Review</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.infoContainer}>
        <Ionicons name="information-circle-outline" size={16} color={COLORS.textSecondary} />
        <Text style={styles.infoText}>
          You can edit your review at any time. We value your honest feedback.
        </Text>
      </View>
    </View>
  );
};

export default ReviewUpdateScreen;