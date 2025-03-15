import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TextInput, Button, Title, Menu } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { API_URL } from '@env';

export default function ProductCreate({ navigation }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [images, setImages] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);

  const categories = ['Lip Products', 'Foundation', 'Palette', 'Blush', 'Tools'];

  // Function to handle image selection
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 5,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets.slice(0, 5 - images.length)]);
    }
  };

  // Function to remove selected images
  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('stock', stock);

    images.forEach((image, index) => {
      formData.append('images', {
        uri: image.uri,
        type: 'image/jpeg',
        name: `product-${index}.jpg`,
      });
    });

    try {
      await axios.post(`${API_URL}/api/products/create`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Title>Create Product</Title>

      {/* Product Name Input */}
      <TextInput 
        label="Product Name" 
        value={name} 
        onChangeText={setName} 
        style={styles.input} 
      />

      {/* Category Dropdown */}
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <TouchableOpacity style={styles.dropdown} onPress={() => setMenuVisible(true)}>
            <TextInput 
              label="Category" 
              value={category} 
              editable={false} 
              style={styles.input} 
            />
          </TouchableOpacity>
        }>
        {categories.map((item, index) => (
          <Menu.Item key={index} title={item} onPress={() => { setCategory(item); setMenuVisible(false); }} />
        ))}
      </Menu>

      {/* Stock Input */}
      <TextInput 
        label="Stock" 
        value={stock} 
        keyboardType="numeric" 
        onChangeText={setStock} 
        style={styles.input} 
      />

      {/* Image Upload Section */}
      <Button mode="outlined" onPress={pickImage} style={styles.uploadButton}>
        Select Images (Max: 5)
      </Button>

      <ScrollView horizontal>
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: image.uri }} style={styles.image} />
            <TouchableOpacity onPress={() => removeImage(index)} style={styles.removeButton}>
              <Title style={styles.removeButtonText}>X</Title>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Submit Button */}
      <Button mode="contained" onPress={handleCreate} style={styles.submitButton}>
        Create Product
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { marginBottom: 10 },
  dropdown: { marginBottom: 10 },
  uploadButton: { marginBottom: 10 },
  imageContainer: {
    position: 'relative',
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'red',
    borderRadius: 50,
    padding: 5,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 12,
  },
  submitButton: { marginTop: 20 },
});
