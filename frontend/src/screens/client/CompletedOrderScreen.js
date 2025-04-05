import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../../redux/actions/order.Actions';
import { fetchUserReview } from '../../redux/actions/review.Actions';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import store from '../../redux/store/Store';
import styles, { COLORS } from '../style/client/CompletedOrderScreen.styles';

const CompletedOrderScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { orders = [], loading } = useSelector((state) => state.orderList);
  const { userInfo } = useSelector((state) => state.userLogin);
  const [reviewMap, setReviewMap] = useState({});

  useFocusEffect(
    useCallback(() => {
      const fetchAll = async () => {
        try {
          // 1. Fetch completed orders
          await dispatch(getMyOrders('Completed'));
  
          // 2. Fetch reviews AFTER orders are in Redux
          const state = store.getState(); // Access updated Redux state directly
          const orders = state.orderList.orders || [];
  
          if (orders.length === 0) return;
  
          const updatedMap = {};
  
          for (let order of orders) {
            try {
              const res = await fetchUserReview(order._id);
              const review = res.data.review;
              updatedMap[order._id] = review?._id || null;
              console.log(`✅ Review for order ${order._id}:`, review?._id);
            } catch (err) {
              updatedMap[order._id] = null;
              console.warn(`❌ No review for order ${order._id}:`, err.response?.data || err.message);
            }
          }
  
          setReviewMap(updatedMap);
        } catch (error) {
          console.error('❌ Failed to fetch orders/reviews:', error.message);
        }
      };
  
      fetchAll();
    }, [dispatch])
  );
  

  useEffect(() => {
    if (!userInfo?.token || !orders.length) return;
  
    const fetchReviews = async () => {
      const updatedMap = {};
  
      for (let order of orders) {
        try {
          const res = await fetchUserReview(order._id);
          const review = res.data.review;
          console.log('Fetched review for:', order._id, review);
          updatedMap[order._id] = review?._id || null;
        } catch (err) {
          // Add this detailed error output 👇
          console.warn(`Review fetch error for order ${order._id}:`, err.response?.data || err.message);
          updatedMap[order._id] = null;
        }
      }
  
      console.log('Updated Review Map:', updatedMap); // ✅ This should now show real values
      setReviewMap(updatedMap);
    };
  
    fetchReviews();
  }, [orders, userInfo?.token]);
  

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="checkmark-circle-outline" size={80} color={COLORS.mediumGray} />
      <Text style={styles.emptyText}>No completed orders yet</Text>
    </View>
  );

  const renderProductItem = (productItem, index) => {
    if (!productItem || !productItem.product) {
      return (
        <View key={`missing-${index}`} style={styles.productItem}>
          <View style={styles.missingImageContainer}>
            <Ionicons name="image-off-outline" size={20} color={COLORS.mediumGray} />
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.unavailableProductText}>Product no longer available</Text>
            <View style={styles.productDetails}>
              <Text style={styles.productQuantity}>Qty: {productItem?.quantity || 'N/A'}</Text>
            </View>
          </View>
        </View>
      );
    }

    return (
      <View key={productItem.product._id} style={styles.productItem}>
        {productItem.product.images?.[0] ? (
          <Image source={{ uri: productItem.product.images[0].url }} style={styles.productImage} />
        ) : (
          <View style={styles.missingImageContainer}>
            <Ionicons name="image-outline" size={20} color={COLORS.mediumGray} />
          </View>
        )}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{productItem.product.name}</Text>
          <View style={styles.productDetails}>
            <Text style={styles.productPrice}>
              ₱{productItem.product.price ? Number(productItem.product.price).toFixed(2) : '0.00'}
            </Text>
            <Text style={styles.productQuantity}>Qty: {productItem.quantity}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    const review = reviewMap[item._id];
    const hasReview = !!review;

    return (
      <View style={styles.card}>
        <View style={styles.orderHeader}>
          <View>
            <Text style={styles.orderId}>Order #{item._id.slice(-6)}</Text>
            <Text style={styles.orderDate}>{formatDate(item.createdAt)}</Text>
          </View>
          <View style={styles.statusContainer}>
            <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>

        <View style={styles.divider} />
        {item.products.map((p, i) => renderProductItem(p, i))}
        <View style={styles.divider} />

        <View style={styles.orderSummary}>
          <Text style={styles.totalItems}>{item.products.length} item(s)</Text>
          <Text style={styles.totalAmount}>Total: ₱{item.totalAmount?.toFixed(2)}</Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.reviewButton}
            onPress={() =>
              hasReview
                ? navigation.navigate('ReviewUpdate', {
                    orderId: item._id,
                    existingReview: review,
                  })
                : navigation.navigate('WriteReview', {
                    orderId: item._id,
                  })
            }
          >
            <Ionicons name="star-outline" size={16} color={COLORS.white} />
            <Text style={styles.reviewButtonText}>
              {hasReview ? 'Update Your Review' : 'Write a Review'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.reorderButton}
            onPress={() => navigation.navigate('OrderDetails', { orderId: item._id })}
          >
            <Ionicons name="information-circle-outline" size={16} color={COLORS.darkPurple} />
            <Text style={styles.reorderButtonText}>Order Details</Text>
          </TouchableOpacity>
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
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default CompletedOrderScreen;


  
  