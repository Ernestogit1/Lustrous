import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, Alert, TouchableOpacity,Text } from 'react-native';
import { Button, TextInput, HelperText } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../../redux/actions/product.Actions';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { Dropdown } from 'react-native-element-dropdown';

const categories = [
  { label: 'Lip Products', value: 'Lip Products' },
  { label: 'Foundation', value: 'Foundation' },
  { label: 'Palette', value: 'Palette' },
  { label: 'Blush', value: 'Blush' },
  { label: 'Tools', value: 'Tools' }
];

export default function ProductCreate({ navigation }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [images, setImages] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [price, setPrice] = useState('');
const [description, setDescription] = useState('');
  
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(state => state.productCreate);


  useEffect(() => {
    if (success) {
      setName('');
      setCategory('');
      setStock('');
      setPrice('');
      setDescription('');
      setImages([]);
      Alert.alert('Success', 'Product created successfully!');
    }
  }, [success]);

  // ✅ Request permissions for camera and media library
  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(cameraStatus === 'granted');

      const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (mediaStatus !== 'granted') {
        Alert.alert('Permission Required', 'Please allow access to media library.');
      }
    })();
  }, []);

  // ✅ Handle selecting images from gallery
  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets.map(asset => asset.uri)].slice(0, 5));
    }
  };

  // ✅ Handle capturing images from camera
  const handleCameraCapture = async () => {
    if (!cameraPermission) {
      Alert.alert('Permission Denied', 'Camera access is required.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri].slice(0, 5));
    }
  };

  // ✅ Ensure form data is sent correctly
  const handleSubmit = () => {
    if (!name || !category || !price || !description || stock <= 0 || images.length === 0) {
      alert('Please fill all fields and select at least one image.');
      return;
    }
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('stock', stock);
    formData.append('price', price);
    formData.append('description', description);
  
    images.forEach((imageUri, index) => {
      formData.append('images', {
        uri: imageUri,
        type: 'image/jpeg',
        name: `product-${index}.jpg`,
      });
    });
  
    dispatch(createProduct(formData));
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput label="Product Name" value={name} onChangeText={setName} style={styles.input} />
      
      {/* ✅ Fixed Dropdown */}
            <Dropdown
        data={categories}
        labelField="label"
        valueField="value"
        placeholder="Select Category"
        value={category}
        onChange={item => setCategory(item.value)}
        style={styles.dropdown}
      />


      <TextInput 
        label="Stock" 
        value={stock} 
        onChangeText={setStock} 
        keyboardType="numeric" 
        style={styles.input} 
      />

      <TextInput 
        label="Price" 
        value={price} 
        onChangeText={setPrice} 
        keyboardType="numeric" 
        style={styles.input} 
      />

      <TextInput 
        label="Description" 
        value={description} 
        onChangeText={setDescription} 
        multiline
        numberOfLines={4}
        style={styles.input}
      />

      <Button onPress={handleImagePick}>Select Images (Max 5)</Button>
      <Button onPress={handleCameraCapture}>Capture Image</Button>

            <View style={styles.imageContainer}>
        {images.map((img, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{ uri: img }} style={styles.image} />
            <TouchableOpacity 
              style={styles.removeIcon} 
              onPress={() => {
                const updatedImages = [...images];
                updatedImages.splice(index, 1);
                setImages(updatedImages);
              }}
            >
              <Text style={styles.removeText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>


      <Button mode="contained" loading={loading} onPress={handleSubmit}>Create Product</Button>
      {error && <HelperText type="error">{error}</HelperText>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { marginBottom: 15 },
  dropdown: { marginBottom: 15 },
  imageContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  image: { width: 70, height: 70, margin: 5 },



  imageWrapper: {
    position: 'relative',
    margin: 5,
  },
  removeIcon: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  removeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
