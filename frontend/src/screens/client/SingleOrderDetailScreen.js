import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleOrder } from '../../redux/actions/order.Actions';
import { Ionicons } from '@expo/vector-icons';
import styles, { COLORS } from '../style/client/SingleOrderDetailScreen.styles';

export default function SingleOrderDetailScreen({ route }) {
  const { orderId } = route.params;
  const dispatch = useDispatch();

  const { order, loading, error } = useSelector((state) => state.singleOrder);

  useEffect(() => {
    if (orderId) {
      dispatch(getSingleOrder(orderId));
    }
  }, [dispatch, orderId]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Helper function to render a status badge with appropriate colors
  const renderStatusBadge = (status) => {
    let color, icon;
    
    switch(status) {
      case 'Completed':
        color = COLORS.success;
        icon = 'checkmark-circle';
        break;
      case 'Cancelled':
        color = COLORS.error;
        icon = 'close-circle';
        break;
      case 'Shipped':
        color = COLORS.info;
        icon = 'airplane';
        break;
      default: // Order Placed or others
        color = COLORS.pending;
        icon = 'time';
    }
    
    return (
      <View style={[styles.statusBadge, { backgroundColor: `${color}20` }]}>
        <Ionicons name={icon} size={16} color={color} />
        <Text style={[styles.statusText, { color }]}>{status}</Text>
      </View>
    );
  };

  // Helper function to render product items with proper null checks
  const renderProductItem = ({ item, index }) => {
    // Check if product is null
    if (!item || !item.product) {
      return (
        <View style={styles.productItem}>
          <View style={styles.noImageContainer}>
            <Ionicons name="image-off-outline" size={20} color={COLORS.grayMedium} />
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.unavailableText}>Product no longer available</Text>
            <Text style={styles.productQuantity}>Qty: {item?.quantity || 'N/A'}</Text>
          </View>
        </View>
      );
    }
    
    return (
      <View style={styles.productItem}>
        {/* Safe image rendering */}
        {item.product.images && item.product.images[0] ? (
          <Image 
            source={{ uri: item.product.images[0]?.url }} 
            style={styles.productImage} 
          />
        ) : (
          <View style={styles.noImageContainer}>
            <Ionicons name="image-outline" size={20} color={COLORS.grayMedium} />
          </View>
        )}
        
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.product.name}</Text>
          <Text style={styles.productPrice}>
            ₱{item.product.price !== undefined ? Number(item.product.price).toFixed(2) : '0.00'}
          </Text>
          
          <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
          
          {/* Added divider between quantity and subtotal */}
          <View style={styles.productDivider}></View>
          
          <Text style={styles.productSubtotal}>
            Subtotal: ₱{item.product.price !== undefined ? 
              (Number(item.product.price) * item.quantity).toFixed(2) : '0.00'}
          </Text>
        </View>
      </View>
    );
  };
  
  // Safe keyExtractor function to avoid null issues
  const keyExtractor = (item, index) => {
    if (!item || !item.product) return `missing-product-${index}`;
    return item.product._id || `product-${index}`;
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loaderText}>Loading order details...</Text>
      </View>
    );
  }
  
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={60} color={COLORS.error} />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }
  
  if (!order) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="document-text-outline" size={60} color={COLORS.grayMedium} />
        <Text style={styles.emptyText}>No order found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Moved status badge before the order ID */}
      {renderStatusBadge(order.status)}
      
      <View style={styles.orderHeader}>
        <View style={styles.orderIdContainer}>
          <Text style={styles.orderIdLabel}>Order ID:</Text>
          <Text style={styles.orderId}>{order._id}</Text>
        </View>
        
        <Text style={styles.orderDate}>
          <Ionicons name="calendar-outline" size={14} color={COLORS.grayMedium} />
          {' '}Placed on {formatDate(order.createdAt)}
        </Text>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="cart" size={18} color={COLORS.primary} />
          <Text style={styles.sectionTitle}>Order Items</Text>
        </View>
        
        {order.products && order.products.length > 0 ? (
          <FlatList
            data={order.products}
            renderItem={renderProductItem}
            keyExtractor={keyExtractor}
            scrollEnabled={false}
          />
        ) : (
          <Text style={styles.emptyListText}>No items in this order</Text>
        )}
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="card" size={18} color={COLORS.primary} />
          <Text style={styles.sectionTitle}>Order Summary</Text>
        </View>
        
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Items Total:</Text>
            <Text style={styles.summaryValue}>
              ₱{order.totalAmount ? (Number(order.totalAmount) - 50).toFixed(2) : '0.00'}
            </Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping Fee:</Text>
            <Text style={styles.summaryValue}>₱50.00</Text>
          </View>
          
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount:</Text>
            <Text style={styles.totalValue}>
              ₱{order.totalAmount ? Number(order.totalAmount).toFixed(2) : '0.00'}
            </Text>
          </View>
        </View>
      </View>
      
      {order.deliveredAt && (
        <View style={styles.deliveredContainer}>
          <Ionicons name="checkmark-circle" size={18} color={COLORS.success} />
          <Text style={styles.deliveredText}>
            Delivered on {formatDate(order.deliveredAt)}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}