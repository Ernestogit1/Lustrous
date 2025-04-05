import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateReview } from '../../redux/actions/review.Actions';

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
      <Text style={styles.label}>Update Rating</Text>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Text style={rating >= star ? styles.starFilled : styles.starEmpty}>★</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Update Comment</Text>
      <TextInput
        style={styles.input}
        multiline
        value={comment}
        onChangeText={setComment}
        placeholder="Update your review..."
      />

      <TouchableOpacity style={styles.button} onPress={submitUpdate}>
        <Text style={styles.buttonText}>Update Review</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReviewUpdateScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, marginBottom: 8 },
  stars: { flexDirection: 'row', marginBottom: 16 },
  starFilled: { fontSize: 32, color: '#FFD700' },
  starEmpty: { fontSize: 32, color: '#ccc' },
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
});
