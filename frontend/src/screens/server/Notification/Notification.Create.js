import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { createNotification } from '../../../redux/actions/notification.Actions';
import { listProducts } from '../../../redux/actions/product.Actions';
import styles, { COLORS } from '../../style/server/Notification.Create.styles';

const NotificationCreateScreen = () => {
  const dispatch = useDispatch();
  const { products, loading: productsLoading } = useSelector((state) => state.productList);
  const { loading: notificationLoading } = useSelector((state) => state.notificationCreate || {});

  const [selectedProductId, setSelectedProductId] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const handleSendNotification = async () => {
    if (!selectedProductId || !title || !body) {
      Alert.alert('Missing Fields', 'Please fill in all required fields.');
      return;
    }
  
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

  const filteredProducts = products?.filter(
    product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const getSelectedProduct = () => {
    return products?.find(product => product._id === selectedProductId);
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.productItem,
        selectedProductId === item._id && styles.selectedProduct,
      ]}
      onPress={() => setSelectedProductId(item._id)}
    >
      {item.images && item.images.length > 0 ? (
        <Image 
          source={{ uri: item.images[0].url || item.images[0] }} 
          style={styles.productImage} 
          resizeMode="cover"
        />
      ) : (
        <View style={styles.noImageContainer}>
          <Ionicons name="image-outline" size={24} color={COLORS.grayLight} />
        </View>
      )}
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.productPrice}>₱{item.price}</Text>
      </View>
      {selectedProductId === item._id && (
        <View style={styles.checkmarkContainer}>
          <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.screenTitle}>Create Notification</Text>
        <Text style={styles.screenSubtitle}>
          Send promotional notifications to all users
        </Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Select Product</Text>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={COLORS.grayMedium} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color={COLORS.grayMedium} />
            </TouchableOpacity>
          )}
        </View>

        {productsLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
        ) : filteredProducts.length === 0 ? (
          <View style={styles.emptyProductsContainer}>
            <Ionicons name="alert-circle-outline" size={32} color={COLORS.grayMedium} />
            <Text style={styles.emptyProductsText}>No products found</Text>
          </View>
        ) : (
          <FlatList
            data={filteredProducts}
            renderItem={renderProductItem}
            keyExtractor={(item) => item._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.productList}
            contentContainerStyle={styles.productListContent}
          />
        )}

        {selectedProductId && (
          <View style={styles.selectedProductInfoContainer}>
            <Text style={styles.selectedProductTitle}>Selected:</Text>
            <Text style={styles.selectedProductName}>{getSelectedProduct()?.name}</Text>
          </View>
        )}
      </View>
        
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>New Price (Optional)</Text>
        <Text style={styles.sectionDescription}>
          If you want to announce a price change, enter the new price below
        </Text>
        <View style={styles.priceInputContainer}>
          <Text style={styles.currencySymbol}>₱</Text>
          <TextInput
            placeholder="0.00"
            style={styles.priceInput}
            keyboardType="numeric"
            value={newPrice}
            onChangeText={setNewPrice}
          />
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Notification Details</Text>

        <Text style={styles.inputLabel}>Title<Text style={styles.requiredStar}>*</Text></Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="e.g., Special Promotion!"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            maxLength={60}
          />
        </View>
        <Text style={styles.characterCount}>{title.length}/60</Text>

        <Text style={styles.inputLabel}>Message<Text style={styles.requiredStar}>*</Text></Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Describe your promotion or announcement..."
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={4}
            value={body}
            onChangeText={setBody}
            maxLength={160}
          />
        </View>
        <Text style={styles.characterCount}>{body.length}/160</Text>
      </View>

      <TouchableOpacity
        style={[
          styles.sendButton,
          (!selectedProductId || !title || !body || notificationLoading) && styles.disabledButton
        ]}
        onPress={handleSendNotification}
        disabled={!selectedProductId || !title || !body || notificationLoading}
      >
        {notificationLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <>
            <Ionicons name="notifications" size={20} color="#ffffff" style={styles.buttonIcon} />
            <Text style={styles.sendButtonText}>Send Notification</Text>
          </>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default NotificationCreateScreen;