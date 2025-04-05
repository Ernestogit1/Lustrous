import React, { useEffect } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getCancelledOrdersOnly } from '../../../redux/actions/orderAdmin.Action';
import { ActivityIndicator } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles, { COLORS } from '../../style/server/OrderCancelScreen.styles';

const OrderCancleScreen = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { orders, loading } = useSelector(state => state.adminOrders || {});
  
  useEffect(() => {
    if (isFocused) {
      dispatch(getCancelledOrdersOnly());
    }
  }, [dispatch, isFocused]);
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Helper function to render product item with proper null checks
  const renderProductItem = (product, index) => {
    // Check if product is null or missing
    if (!product || !product.product) {
      return (
        <View key={`missing-${index}`} style={styles.productRow}>
          <View style={styles.noImageContainer}>
            <Ionicons name="image-off-outline" size={20} color={COLORS.grayMedium} />
          </View>
          <View style={styles.productDetails}>
            <Text style={styles.unavailableText}>Product no longer available</Text>
            <Text style={styles.productQuantity}>Quantity: {product?.quantity || 'N/A'}</Text>
          </View>
        </View>
      );
    }

    // Product exists, handle image safely
    return (
      <View key={`product-${index}`} style={styles.productRow}>
        {product.product.images && product.product.images[0] ? (
          <Image 
            source={{ uri: product.product.images[0].url }} 
            style={styles.productImage} 
          />
        ) : (
          <View style={styles.noImageContainer}>
            <Ionicons name="image-outline" size={20} color={COLORS.grayMedium} />
          </View>
        )}
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{product.product.name}</Text>
          <View style={styles.productInfo}>
            <Text style={styles.productPrice}>
              ₱{product.product.price !== undefined ? Number(product.product.price).toFixed(2) : '0.00'}
            </Text>
            <Text style={styles.productQuantity}>Qty: {product.quantity}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderOrder = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.orderIdContainer}>
          <Text style={styles.orderIdLabel}>Order ID:</Text>
          <Text style={styles.orderId}>{item._id.slice(-10)}</Text>
        </View>
        <View style={styles.statusContainer}>
          <Ionicons name="close-circle" size={16} color={COLORS.error} />
          <Text style={styles.statusText}>Cancelled</Text>
        </View>
      </View>
      
      <View style={styles.userContainer}>
        <Ionicons name="person" size={18} color={COLORS.grayDark} />
        <Text style={styles.userName}>{item.user?.name || 'User'}</Text>
        <Text style={styles.orderDate}>{formatDate(item.createdAt)}</Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.productsContainer}>
        <Text style={styles.sectionTitle}>Products</Text>
        {item.products.map((p, i) => renderProductItem(p, i))}
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.orderSummary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal:</Text>
          <Text style={styles.summaryValue}>
            ₱{item.totalAmount ? (Number(item.totalAmount) - 50).toFixed(2) : '0.00'}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping Fee:</Text>
          <Text style={styles.summaryValue}>₱50.00</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Amount:</Text>
          <Text style={styles.totalValue}>
            ₱{item.totalAmount ? Number(item.totalAmount).toFixed(2) : '0.00'}
          </Text>
        </View>
      </View>
      
      {item.cancelledAt && (
        <View style={styles.cancellationInfo}>
          <Ionicons name="time" size={16} color={COLORS.grayMedium} />
          <Text style={styles.cancellationText}>
            Cancelled on {formatDate(item.cancelledAt)}
          </Text>
        </View>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.error} />
        <Text style={styles.loadingText}>Loading cancelled orders...</Text>
      </View>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="close-circle-outline" size={70} color={COLORS.grayMedium} />
        <Text style={styles.emptyTitle}>No cancelled orders found</Text>
        <Text style={styles.emptySubtitle}>All cancelled orders will appear here</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cancelled Orders</Text>
        <Text style={styles.headerSubtitle}>Orders that been cancelled by customers</Text>
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

export default OrderCancleScreen;