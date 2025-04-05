import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createNotification } from '../../../redux/actions/notification.Actions';
import { listProducts } from '../../../redux/actions/product.Actions';

const NotificationCreateScreen = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productList);

  const [selectedProductId, setSelectedProductId] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [newPrice, setNewPrice] = useState('');

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const handleSendNotification = async () => {
    if (!selectedProductId || !title || !body) {
      Alert.alert('Missing Fields', 'Please fill in all required fields.');
      return;
    }
  
    console.log('🚀 Sending notification with data:', {
      selectedProductId,
      title,
      body,
      newPrice,
    });
  
    try {
      await dispatch(createNotification(selectedProductId, title, body, newPrice));
      Alert.alert('Success', 'Notification sent to all users!');
      setSelectedProductId('');
      setTitle('');
      setBody('');
      setNewPrice('');
    } catch (err) {
      console.error('❌ Dispatch failed:', err);
    }
  };
  

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.productItem,
        selectedProductId === item._id && styles.selectedProduct,
      ]}
      onPress={() => setSelectedProductId(item._id)}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Select Product *</Text>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <Text style={styles.label}>New Price (Optional)</Text>
      <TextInput
        placeholder="Enter new price"
        style={styles.input}
        keyboardType="numeric"
        value={newPrice}
        onChangeText={setNewPrice}
      />

      <Text style={styles.label}>Title *</Text>
      <TextInput
        placeholder="Promotion title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Body *</Text>
      <TextInput
        placeholder="Enter message"
        style={[styles.input, styles.textArea]}
        multiline
        numberOfLines={4}
        value={body}
        onChangeText={setBody}
      />

      <Button title="Send Notification" onPress={handleSendNotification} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  productItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginRight: 10,
  },
  selectedProduct: {
    backgroundColor: '#ded4ff',
    borderColor: '#6e47ff',
  },
});

export default NotificationCreateScreen;
