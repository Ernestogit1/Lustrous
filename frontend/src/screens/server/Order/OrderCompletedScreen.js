import React, { useEffect } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getCompletedOrdersOnly } from '../../../redux/actions/orderAdmin.Action';
import { ActivityIndicator } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles, { COLORS } from '../../style/server/OrderCompletedScreen.styles';

const OrderCompletedScreen = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { orders, loading } = useSelector(state => state.adminOrders || {});

  useEffect(() => {
    if (isFocused) {
      dispatch(getCompletedOrdersOnly());
    }
  }, [dispatch, isFocused]);

  const renderProductItem = (product, index) => {
    // Handle case where product might be null
    if (!product || !product.product) {
      return (
        <View key={index} style={styles.productRow}>
          <View style={styles.noImageContainer}>
            <Ionicons name="image-off-outline" size={18} color={COLORS.grayMedium} />
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.deletedProductText}>Product no longer available</Text>
            <Text style={styles.productQuantity}>Quantity: {product?.quantity || 'N/A'}</Text>
          </View>
        </View>
      );
    }

    return (
      <View key={index} style={styles.productRow}>
        {product.product.images && product.product.images[0] ? (
          <Image 
            source={{ uri: product.product.images[0].url }} 
            style={styles.productImage} 
          />
        ) : (
          <View style={styles.noImageContainer}>
            <Ionicons name="image-outline" size={18} color={COLORS.grayMedium} />
          </View>
        )}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.product.name}</Text>
          <Text style={styles.productQuantity}>Quantity: {product.quantity}</Text>
          <Text style={styles.productPrice}>
            ₱{product.product.price !== undefined && product.product.price !== null
              ? Number(product.product.price).toFixed(2)
              : '0.00'}
          </Text>
        </View>
      </View>
    );
  };

  const renderOrder = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.orderHeader}>
        <View style={styles.orderIdContainer}>
          <Text style={styles.orderIdLabel}>Order ID:</Text>
          <Text style={styles.orderId}>{item._id.slice(-10)}</Text>
        </View>
        <Text style={styles.orderDate}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      
      <View style={styles.userContainer}>
        <Ionicons name="person-circle" size={20} color={COLORS.primary} />
        <Text style={styles.userName}>{item.user?.name || 'User'}</Text>
      </View>
      
      <View style={styles.orderDetailsContainer}>
        <View style={styles.orderInfoRow}>
          <Ionicons name="receipt-outline" size={18} color={COLORS.grayDark} />
          <Text style={styles.orderTotal}>
            Total: ₱{item.totalAmount !== undefined 
              ? Number(item.totalAmount).toFixed(2) 
              : '0.00'}
          </Text>
        </View>
        
        {item.shippingAddress?.address && (
          <View style={styles.orderInfoRow}>
            <Ionicons name="location-outline" size={18} color={COLORS.grayDark} />
            <Text style={styles.shippingAddress}>{item.shippingAddress.address}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.divider} />
      
      <Text style={styles.sectionTitle}>Products</Text>
      <View style={styles.productsContainer}>
        {item.products.map((p, i) => renderProductItem(p, i))}
      </View>
      
      <View style={styles.statusContainer}>
        <View style={styles.statusBadge}>
          <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
        {item.deliveredAt && (
          <Text style={styles.deliveredDate}>
            Delivered on {new Date(item.deliveredAt).toLocaleDateString()}
          </Text>
        )}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading completed orders...</Text>
      </View>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="checkmark-done-circle-outline" size={64} color={COLORS.grayMedium} />
        <Text style={styles.emptyText}>No completed orders found</Text>
        <Text style={styles.emptySubtext}>Completed orders will appear here</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Completed Orders</Text>
        <Text style={styles.headerSubtitle}>Orders that have been successfully delivered</Text>
      </View>
      
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={renderOrder}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default OrderCompletedScreen;