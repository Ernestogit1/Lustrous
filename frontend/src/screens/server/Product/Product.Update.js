import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Alert, Text, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../../../redux/actions/product.Actions';
import axios from 'axios';
import { API_URL } from '@env';
import { Dropdown } from 'react-native-element-dropdown';

const categories = [
  { label: 'Lip Products', value: 'Lip Products' },
  { label: 'Foundation', value: 'Foundation' },
  { label: 'Palette', value: 'Palette' },
  { label: 'Blush', value: 'Blush' },
  { label: 'Tools', value: 'Tools' }
];

export default function UpdateProduct({ route, navigation }) {
  const { productId } = route.params;
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [images, setImages] = useState([]);
  const [originalImages, setOriginalImages] = useState([]);
  const [cameraPermission, setCameraPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === 'granted');
    })();

    const loadProduct = async () => {
      const { data } = await axios.get(`${API_URL}/api/products/${productId}`);
      setName(data.name);
      setCategory(data.category);
      setPrice(data.price.toString());
      setDescription(data.description);
      setStock(data.stock.toString());

      const urls = data.images.map(img => img.url);
      setImages(urls);
      setOriginalImages(urls);
    };

    loadProduct();
  }, []);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });

    if (!result.canceled) {
      setImages(result.assets.map(a => a.uri));
    }
  };

  const handleCameraCapture = async () => {
    if (!cameraPermission) {
      Alert.alert('Camera Permission', 'Camera access is required to take pictures.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([result.assets[0].uri]);
    }
  };

  const handleRemoveImage = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);

    // Restore original if all new images removed
    if (updated.length === 0) {
      setImages(originalImages);
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('stock', stock);

    images.forEach((img, idx) => {
      if (img.startsWith('http')) return; // Skip original cloudinary images
      formData.append('images', {
        uri: img,
        name: `update-${idx}.jpg`,
        type: 'image/jpeg',
      });
    });

    dispatch(updateProduct(productId, formData));
    navigation.goBack();
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <TextInput label="Name" value={name} onChangeText={setName} style={styles.input} />
      <Dropdown
        data={categories}
        labelField="label"
        valueField="value"
        placeholder="Select Category"
        value={category}
        onChange={(item) => setCategory(item.value)}
        style={styles.input}
      />
      <TextInput label="Price" value={price} onChangeText={setPrice} keyboardType="numeric" style={styles.input} />
      <TextInput label="Stock" value={stock} onChangeText={setStock} keyboardType="numeric" style={styles.input} />
      <TextInput label="Description" value={description} onChangeText={setDescription} multiline style={styles.input} />

      <Button onPress={handleImagePick}>Pick New Images</Button>
      <Button onPress={handleCameraCapture}>Capture Image</Button>

      <View style={styles.imageContainer}>
        {images.map((img, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{ uri: img }} style={styles.image} />
            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveImage(index)}>
              <Text style={styles.removeText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <Button mode="contained" onPress={handleSubmit} style={{ marginTop: 20 }}>
        Update Product
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: { marginBottom: 15 },
  imageContainer: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10 },
  imageWrapper: { position: 'relative', marginRight: 10 },
  image: { width: 60, height: 60, borderRadius: 6 },
  removeButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 2,
    zIndex: 5,
  },
  removeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
