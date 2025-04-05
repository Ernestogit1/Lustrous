import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, Alert, TouchableOpacity, Text } from 'react-native';
import { Button, TextInput, HelperText, DefaultTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../../redux/actions/product.Actions';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';
import styles, { COLORS } from '../../style/server/Product.Create.styles';

const categories = [
  { label: 'Lip Products', value: 'Lip Products' },
  { label: 'Foundation', value: 'Foundation' },
  { label: 'Palette', value: 'Palette' },
  { label: 'Blush', value: 'Blush' },
  { label: 'Tools', value: 'Tools' }
];

const poppinsTheme = {
  ...DefaultTheme,
  fonts: {
    ...DefaultTheme.fonts,
    regular: { fontFamily: 'Poppins-Regular' },
    medium: { fontFamily: 'Poppins-Medium' },
    light: { fontFamily: 'Poppins-Light' },
    thin: { fontFamily: 'Poppins-Thin' },
  },
};

export default function ProductCreate({ navigation }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [images, setImages] = useState([]);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  
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
      setErrors({});
      Alert.alert(
        'Success', 
        'Product created successfully!',
        [
          { 
            text: 'OK', 
            onPress: () => navigation.navigate('Products') 
          }
        ]
      );
    }
  }, [success, navigation]);

  // Request permissions for camera and media library
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

  // Handle selecting images from gallery
  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 5,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets.map(asset => asset.uri)].slice(0, 5));
      if (errors.images && result.assets.length > 0) {
        setErrors({...errors, images: null});
      }
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
      // Clear image error if an image was captured
      if (errors.images) {
        setErrors({...errors, images: null});
      }
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

  // Handle form submission
  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
  
    const formData = new FormData();
    formData.append('name', name.trim());
    formData.append('category', category);
    formData.append('stock', stock);
    formData.append('price', price);
    formData.append('description', description.trim());
  
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
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Create New Product</Text>
          <Text style={styles.headerSubtitle}>Add details for your new product</Text>
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
            theme={poppinsTheme}
            placeholderTextColor={COLORS.grayMedium}
          />
          {errors.name && <HelperText type="error" theme={poppinsTheme} style={styles.helperText}>{errors.name}</HelperText>}
          
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
          {errors.category && <HelperText type="error" theme={poppinsTheme} style={styles.helperText}>{errors.category}</HelperText>}
          
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
                theme={poppinsTheme}
                placeholderTextColor={COLORS.grayMedium}
              />
              {errors.stock && <HelperText type="error" theme={poppinsTheme} style={styles.helperText}>{errors.stock}</HelperText>}
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
                theme={poppinsTheme}
                placeholderTextColor={COLORS.grayMedium}
              />
              {errors.price && <HelperText type="error" theme={poppinsTheme} style={styles.helperText}>{errors.price}</HelperText>}
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
            theme={poppinsTheme}
            placeholderTextColor={COLORS.grayMedium}
          />
          {errors.description && <HelperText type="error" theme={poppinsTheme} style={styles.helperText}>{errors.description}</HelperText>}
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
          
          {errors.images && <HelperText type="error" theme={poppinsTheme} style={styles.helperText}>{errors.images}</HelperText>}
          
          {images.length > 0 && (
            <View style={styles.imagePreviewContainer}>
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
          theme={poppinsTheme}
        >
          Create Product
        </Button>
        
        {error && (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={20} color={COLORS.error} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}