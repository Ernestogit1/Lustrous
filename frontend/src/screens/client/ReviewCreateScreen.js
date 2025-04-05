import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { createReview } from '../../redux/actions/review.Actions';

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
      <Text style={styles.label}>Rate your order</Text>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Text style={rating >= star ? styles.starFilled : styles.starEmpty}>★</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.label}>Write a comment</Text>
      <TextInput
        style={styles.input}
        placeholder="Your review..."
        multiline
        value={comment}
        onChangeText={setComment}
      />
      <TouchableOpacity style={styles.button} onPress={submitReview}>
        <Text style={styles.buttonText}>Submit Review</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReviewCreateScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 12,
    borderRadius: 6,
    marginTop: 16,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  stars: { flexDirection: 'row', marginBottom: 16 },
  starFilled: { fontSize: 32, color: '#FFD700' },
  starEmpty: { fontSize: 32, color: '#ccc' },
});
