import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { createReview } from '../../redux/actions/review.Actions';
import { Ionicons } from '@expo/vector-icons';
import styles, { COLORS } from '../style/client/ReviewCreateScreen.styles';

const ReviewCreateScreen = ({ route, navigation }) => {
  const { orderId } = route.params;
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useFocusEffect(
    useCallback(() => {
      setRating(0);
      setComment('');
      return () => {
        // ✅ Optional: trigger refresh logic on parent
        // Example: you can use `navigation.navigate()` or emit event
        // For now we just leave it clean.
      };
    }, [])
  );

  const submitReview = async () => {
    if (rating < 1 || rating > 5) {
      return Alert.alert('Please select a rating');
    }
    await dispatch(createReview(orderId, rating, comment));
    Alert.alert('Thank you!', 'Your review was submitted');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Write a Review</Text>
        </View>
        
        <Text style={styles.orderIdText}>Order #{orderId.slice(-10)}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.label}>Rate your experience</Text>
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
        
        <Text style={styles.label}>Write a comment</Text>
        <TextInput
          style={styles.input}
          placeholder="Share your thoughts about your order..."
          placeholderTextColor={COLORS.placeholderText}
          multiline
          value={comment}
          onChangeText={setComment}
          maxLength={500}
        />
        <Text style={styles.charCount}>{comment.length}/500</Text>
        
        <TouchableOpacity 
          style={[styles.button, rating === 0 && styles.buttonDisabled]} 
          onPress={submitReview}
          disabled={rating === 0}
        >
          <Ionicons name="send" size={18} color="white" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Submit Review</Text>
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
          Your feedback helps us improve our service and assists other customers in making informed decisions.
        </Text>
      </View>
    </View>
  );
};

export default ReviewCreateScreen;