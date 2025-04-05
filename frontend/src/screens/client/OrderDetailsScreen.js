import React, { useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders, cancelOrder } from '../../redux/actions/order.Actions';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles, { COLORS } from '../style/client/OrderDetailsScreen.styles';

const OrderDetailsScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector(state => state.orderList);
  const orderId = route?.params?.orderId;

  useFocusEffect(
    useCallback(() => {
      dispatch(getMyOrders());
    }, [dispatch])
  );

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const order = orderId 
    ? orders?.find(order => order._id === orderId) 
    : null;
  const dataToDisplay = order ? [order] : orders;

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Order Placed':
        return <Ionicons name="time-outline" size={20} color={COLORS.warning} />;
      case 'Completed':
        return <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />;
      case 'Cancelled':
        return <Ionicons name="close-circle" size={20} color={COLORS.error} />;
      case 'Processing':
        return <Ionicons name="sync-outline" size={20} color={COLORS.info} />;
      default:
        return <Ionicons name="help-circle" size={20} color={COLORS.gray} />;
    }
  };
  
  // Helper function to render product item with null checking
  const renderProductItem = (productItem) => {
    // Handle null product
    if (!productItem || !productItem.product) {
      return (
        <View style={styles.productItem}>
          <View style={styles.noImageContainer}>
            <Ionicons name="image-off-outline" size={20} color={COLORS.gray} />
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.unavailableText}>Product no longer available</Text>
            <View style={styles.productDetails}>
              <Text style={styles.productQuantity}>Qty: {productItem?.quantity || 'N/A'}</Text>
            </View>
          </View>
        </View>
      );
    }

    const { product, quantity } = productItem;
    const price = product.price !== undefined && product.price !== null ? 
                  Number(product.price) : 0;
    const total = price * quantity;
    
    return (
      <View key={product._id} style={styles.productItem}>
        {product.images && product.images[0] ? (
          <Image 
            source={{ uri: product.images[0].url }} 
            style={styles.productImage}
          />
        ) : (
          <View style={styles.noImageContainer}>
            <Ionicons name="image-outline" size={20} color={COLORS.gray} />
          </View>
        )}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.productDetails}>
            <Text style={styles.productPrice}>₱{price.toFixed(2)}</Text>
            <Text style={styles.productQuantity}>Qty: {quantity}</Text>
          </View>
          <Text style={styles.itemTotal}>
            Item Total: ₱{total.toFixed(2)}
          </Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.darkPurple} />
        <Text style={styles.loaderText}>Loading order details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={dataToDisplay}
        keyExtractor={(order) => order._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Order Header */}
            <View style={styles.orderHeader}>
              <View>
                <Text style={styles.orderId}>Order #{item._id.slice(-10)}</Text>
                <Text style={styles.orderDate}>{formatDate(item.createdAt)}</Text>
              </View>
              <View style={[
                styles.statusContainer, 
                { backgroundColor: item.status === 'Completed' ? COLORS.lightGreen : 
                                 item.status === 'Cancelled' ? COLORS.lightRed : 
                                 COLORS.lightYellow }
              ]}>
                {getStatusIcon(item.status)}
                <Text style={[
                  styles.statusText,
                  { color: item.status === 'Completed' ? COLORS.success :
                           item.status === 'Cancelled' ? COLORS.error :
                           COLORS.warning }
                ]}>{item.status}</Text>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            {/* Products Section */}
            <View style={styles.sectionHeader}>
              <Ionicons name="cart" size={18} color={COLORS.darkPurple} />
              <Text style={styles.sectionTitle}>Order Items</Text>
            </View>
            
            {item.products.map((productItem, index) => (
              <React.Fragment key={`product-${index}`}>
                {renderProductItem(productItem)}
              </React.Fragment>
            ))}
            
            <View style={styles.divider} />
            
            {/* Payment Info */}
            <View style={styles.sectionHeader}>
              <Ionicons name="card" size={18} color={COLORS.darkPurple} />
              <Text style={styles.sectionTitle}>Payment Details</Text>
            </View>
            
            <View style={styles.paymentInfo}>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Subtotal:</Text>
                <Text style={styles.paymentValue}>
                  ₱{item.totalAmount ? (Number(item.totalAmount) - 50).toFixed(2) : '0.00'}
                </Text>
              </View>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Shipping Fee:</Text>
                <Text style={styles.paymentValue}>₱50.00</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalValue}>
                  ₱{item.totalAmount ? Number(item.totalAmount).toFixed(2) : '0.00'}
                </Text>
              </View>
            </View>

            {/* Cancel Button (if order is pending) */}
            {item.status === 'Order Placed' && (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => dispatch(cancelOrder(item._id))}
              >
                <Ionicons name="close-circle" size={18} color={COLORS.white} />
                <Text style={styles.cancelButtonText}>Cancel Order</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default OrderDetailsScreen;