import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, Alert, Text, TouchableOpacity } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../../../redux/actions/product.Actions';
import axios from 'axios';
import { API_URL } from '@env';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';
import styles, { COLORS } from '../../style/server/Product.Update.styles';

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
  const { loading } = useSelector(state => state.productUpdate || {});

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [images, setImages] = useState([]);
  const [originalImages, setOriginalImages] = useState([]);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === 'granted');

      const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (mediaStatus !== 'granted') {
        Alert.alert('Permission Required', 'Please allow access to media library.');
      }
    })();

    const loadProduct = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${API_URL}/api/products/${productId}`);
        
        setName(data.name || '');
        setCategory(data.category || '');
        setPrice(data.price ? data.price.toString() : '');
        setDescription(data.description || '');
        setStock(data.stock ? data.stock.toString() : '');

        const urls = data.images ? data.images.map(img => img.url) : [];
        setImages(urls);
        setOriginalImages(urls);
      } catch (error) {
        Alert.alert('Error', 'Failed to load product details.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 5,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets.map(asset => asset.uri)].slice(0, 5));
    }
  };

  const handleCameraCapture = async () => {
    if (!cameraPermission) {
      Alert.alert('Permission Denied', 'Camera access is required.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri].slice(0, 5));
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

  // Validate form fields
  const validateForm = () => {
    let formErrors = {};
    
    if (!name.trim()) formErrors.name = "Product name is required";
    if (!category) formErrors.category = "Please select a category";
    if (!stock || isNaN(stock) || parseInt(stock) <= 0) 
      formErrors.stock = "Stock must be a positive number";
    if (!price || isNaN(price) || parseFloat(price) <= 0) 
      formErrors.price = "Price must be a positive number";
    if (!description.trim()) formErrors.description = "Description is required";
    if (images.length === 0) formErrors.images = "At least one image is required";
    
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append('name', name.trim());
    formData.append('category', category);
    formData.append('price', price);
    formData.append('description', description.trim());
    formData.append('stock', stock);

    images.forEach((img, idx) => {
      if (img.startsWith('http')) return; 
      formData.append('images', {
        uri: img,
        name: `update-${idx}.jpg`,
        type: 'image/jpeg',
      });
    });

    dispatch(updateProduct(productId, formData));
    Alert.alert(
      'Success', 
      'Product updated successfully!',
      [{ text: 'OK', onPress: () => navigation.navigate('Products') }]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading product details...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Update Product</Text>
          <Text style={styles.headerSubtitle}>Update details for this product</Text>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <TextInput 
            label="Product Name" 
            value={name} 
            onChangeText={setName}
            mode="outlined"
            outlineColor={errors.name ? COLORS.error : COLORS.borderColor}
            activeOutlineColor={COLORS.primary}
            style={styles.input}
            error={!!errors.name}
            placeholderTextColor={COLORS.grayMedium}
          />
          {errors.name && <HelperText type="error" style={styles.helperText}>{errors.name}</HelperText>}
          
          <Dropdown
            data={categories}
            labelField="label"
            valueField="value"
            placeholder="Select Category"
            value={category}
            onChange={item => {
              setCategory(item.value);
              if (errors.category) setErrors({...errors, category: null});
            }}
            style={[styles.dropdown, errors.category && styles.errorBorder]}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelectedText}
            containerStyle={styles.dropdownContainer}
            activeColor={COLORS.secondary}
            fontFamily="Poppins-Regular"
          />
          {errors.category && <HelperText type="error" style={styles.helperText}>{errors.category}</HelperText>}
          
          <View style={styles.row}>
            <View style={styles.halfColumn}>
              <TextInput 
                label="Stock" 
                value={stock} 
                onChangeText={setStock} 
                keyboardType="numeric" 
                mode="outlined"
                outlineColor={errors.stock ? COLORS.error : COLORS.borderColor}
                activeOutlineColor={COLORS.primary}
                style={styles.input}
                error={!!errors.stock}
                placeholderTextColor={COLORS.grayMedium}
              />
              {errors.stock && <HelperText type="error" style={styles.helperText}>{errors.stock}</HelperText>}
            </View>
            
            <View style={styles.halfColumn}>
              <TextInput 
                label="Price (₱)" 
                value={price} 
                onChangeText={setPrice} 
                keyboardType="numeric" 
                mode="outlined"
                outlineColor={errors.price ? COLORS.error : COLORS.borderColor}
                activeOutlineColor={COLORS.primary}
                style={styles.input}
                error={!!errors.price}
                placeholderTextColor={COLORS.grayMedium}
              />
              {errors.price && <HelperText type="error" style={styles.helperText}>{errors.price}</HelperText>}
            </View>
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Product Description</Text>
          
          <TextInput 
            label="Description" 
            value={description} 
            onChangeText={setDescription} 
            multiline
            numberOfLines={4}
            mode="outlined"
            outlineColor={errors.description ? COLORS.error : COLORS.borderColor}
            activeOutlineColor={COLORS.primary}
            style={[styles.input, styles.textArea]}
            error={!!errors.description}
            placeholderTextColor={COLORS.grayMedium}
          />
          {errors.description && <HelperText type="error" style={styles.helperText}>{errors.description}</HelperText>}
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Product Images</Text>
          <Text style={styles.sectionSubtitle}>Add up to 5 product images</Text>
          
          <View style={styles.imageButtonsContainer}>
            <TouchableOpacity 
              style={styles.imageButton} 
              onPress={handleImagePick}
            >
              <Ionicons name="images-outline" size={22} color={COLORS.primary} />
              <Text style={styles.imageButtonText}>Gallery</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.imageButton} 
              onPress={handleCameraCapture}
            >
              <Ionicons name="camera-outline" size={22} color={COLORS.primary} />
              <Text style={styles.imageButtonText}>Camera</Text>
            </TouchableOpacity>
          </View>
          
          {errors.images && <HelperText type="error" style={styles.helperText}>{errors.images}</HelperText>}
          
          {images.length > 0 && (
            <View style={styles.imagePreviewContainer}>
              {images.map((img, index) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image source={{ uri: img }} style={styles.image} />
                  <TouchableOpacity 
                    style={styles.removeIcon} 
                    onPress={() => handleRemoveImage(index)}
                  >
                    <Ionicons name="close" size={16} color={COLORS.white} />
                  </TouchableOpacity>
                </View>
              ))}
              
              {/* Placeholder for remaining image slots */}
              {Array.from({ length: Math.max(0, 5 - images.length) }).map((_, index) => (
                <View key={`empty-${index}`} style={styles.emptyImageSlot}>
                  <Ionicons name="add" size={24} color={COLORS.grayMedium} />
                </View>
              ))}
            </View>
          )}
        </View>
        
        <Button 
          mode="contained" 
          loading={loading} 
          onPress={handleSubmit}
          style={styles.submitButton}
          labelStyle={styles.submitButtonText}
          contentStyle={styles.submitButtonContent}
          color={COLORS.primary}
        >
          Update Product
        </Button>
      </View>
    </ScrollView>
  );
}