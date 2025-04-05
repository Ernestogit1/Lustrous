import React, { useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../../redux/actions/order.Actions';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles, { COLORS } from '../style/client/CompletedOrderScreen.styles';

const CompletedOrderScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orderList);

  useFocusEffect(
    useCallback(() => {
      dispatch(getMyOrders('Completed')); // only fetch completed orders
    }, [dispatch])
  );

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="checkmark-circle-outline" size={80} color={COLORS.mediumGray} />
      <Text style={styles.emptyText}>No completed orders yet</Text>
    </View>
  );

  // Helper function to render product item with proper null checks
  const renderProductItem = (productItem, index) => {
    // Check if product exists
    if (!productItem || !productItem.product) {
      return (
        <View key={`missing-${index}`} style={styles.productItem}>
          <View style={styles.missingImageContainer}>
            <Ionicons name="image-off-outline" size={20} color={COLORS.mediumGray} />
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.unavailableProductText}>Product no longer available</Text>
            <View style={styles.productDetails}>
              <Text style={styles.productQuantity}>
                Qty: {productItem?.quantity || 'N/A'}
              </Text>
            </View>
          </View>
        </View>
      );
    }

    // Product exists, handle potential missing images safely
    return (
      <View key={productItem.product._id} style={styles.productItem}>
        {productItem.product.images && productItem.product.images[0] ? (
          <Image 
            source={{ uri: productItem.product.images[0].url }} 
            style={styles.productImage}
          />
        ) : (
          <View style={styles.missingImageContainer}>
            <Ionicons name="image-outline" size={20} color={COLORS.mediumGray} />
          </View>
        )}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{productItem.product.name}</Text>
          <View style={styles.productDetails}>
            <Text style={styles.productPrice}>
              ₱{productItem.product.price !== undefined ? Number(productItem.product.price).toFixed(2) : '0.00'}
            </Text>
            <Text style={styles.productQuantity}>Qty: {productItem.quantity}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.darkPurple} />
          <Text style={styles.loaderText}>Loading completed orders...</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(order) => order._id}
          ListEmptyComponent={renderEmptyList}
          contentContainerStyle={orders.length === 0 ? { flex: 1 } : { paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.orderHeader}>
                <View>
                  <Text style={styles.orderId}>Order #{item._id.slice(-10)}</Text>
                  <Text style={styles.orderDate}>{formatDate(item.createdAt)}</Text>
                </View>
                <View style={styles.statusContainer}>
                  <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>

              <View style={styles.divider} />
              
              {/* Safely render products using the helper function */}
              {item.products.map((productItem, index) => renderProductItem(productItem, index))}
              
              <View style={styles.divider} />
              
              <View style={styles.orderSummary}>
                <Text style={styles.totalItems}>{item.products.length} item(s)</Text>
                <Text style={styles.totalAmount}>
                  Total: ₱{item.totalAmount !== undefined ? Number(item.totalAmount).toFixed(2) : '0.00'}
                </Text>
              </View>
              
              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={styles.reviewButton}
                  onPress={() => navigation.navigate('WriteReview', { orderId: item._id })}
                >
                  <Ionicons name="star-outline" size={16} color={COLORS.white} />
                  <Text style={styles.reviewButtonText}>Write a Review</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.reorderButton}
                  onPress={() => navigation.navigate('OrderDetail', { orderId: item._id })}
                >
                  <Ionicons name="information-circle-outline" size={16} color={COLORS.darkPurple} />
                  <Text style={styles.reorderButtonText}>Order Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default CompletedOrderScreen;