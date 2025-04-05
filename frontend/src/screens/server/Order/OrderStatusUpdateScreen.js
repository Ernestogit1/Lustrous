import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminOrders, updateOrderStatus } from '../../../redux/actions/orderAdmin.Action';
import { Button, ActivityIndicator, Menu } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles, { COLORS } from '../../style/server/OrderStatusUpdateScreen.styles';

const OrderStatusUpdateScreen = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { orders, loading } = useSelector(state => state.adminOrders || {});
  const [menuVisible, setMenuVisible] = useState(null);

  useEffect(() => {
    if (isFocused) {
      dispatch(getAdminOrders());
    }
  }, [dispatch, isFocused]);

  const STATUS_OPTIONS = ['Order Placed', 'Shipped', 'Completed', 'Cancelled'];
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return COLORS.success;
      case 'Shipped': return COLORS.info;
      case 'Cancelled': return COLORS.error;
      default: return COLORS.pending; // 'Order Placed'
    }
  };

  const renderProductItem = (product, index) => {

    if (!product || !product.product) {
      return (
        <View key={index} style={styles.row}>
          <View style={styles.noImageContainer}>
            <Ionicons name="image-off-outline" size={20} color={COLORS.grayMedium} />
          </View>
          <Text style={styles.deletedProductText}>Product no longer available x {product?.quantity || 'N/A'}</Text>
        </View>
      );
    }

    // Handle case where products are permanently deleted
    return (
      <View key={index} style={styles.row}>
        {product.product.images && product.product.images.length > 0 ? (
          <Image 
            source={{ uri: product.product.images[0].url }} 
            style={styles.image} 
          />
        ) : (
          <View style={styles.noImageContainer}>
            <Ionicons name="image-outline" size={20} color={COLORS.grayMedium} />
          </View>
        )}
        <View style={styles.productInfoContainer}>
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
      <View style={styles.orderIdContainer}>
        <Text style={styles.orderIdLabel}>Order ID:</Text>
        <Text style={styles.orderId}>{item._id.slice(-10)}</Text>
      </View>
      
      <View style={styles.cardHeader}>
        <View style={styles.userContainer}>
          <Ionicons name="person-circle-outline" size={20} color={COLORS.primary} />
          <Text style={styles.userName}>{item.user.name}</Text>
        </View>
        <Text style={styles.orderDate}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      
      <View style={styles.orderInfo}>
        <View style={styles.infoRow}>
          <Ionicons name="receipt-outline" size={16} color={COLORS.grayDark} />
          <Text style={styles.orderTotal}>
            Total: ₱{item.totalAmount !== undefined ? Number(item.totalAmount).toFixed(2) : '0.00'}
          </Text>
        </View>
        
        {item.shippingAddress?.address && (
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={16} color={COLORS.grayDark} />
            <Text style={styles.orderAddress}>
              {item.shippingAddress.address}
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.divider} />
      
      <Text style={styles.productListHeader}>Products:</Text>
      {item.products && item.products.map((p, i) => renderProductItem(p, i))}
      
      <Menu
        visible={menuVisible === item._id}
        onDismiss={() => setMenuVisible(null)}
        anchor={
          <Button
            mode="outlined"
            onPress={() => setMenuVisible(item._id)}
            style={[styles.statusBtn, { borderColor: getStatusColor(item.status) }]}
            labelStyle={[styles.statusBtnLabel, { color: getStatusColor(item.status) }]}
          >
            Status: {item.status}
          </Button>
        }>
        {STATUS_OPTIONS.map(status => (
          <Menu.Item
            key={status}
            onPress={() => {
              dispatch(updateOrderStatus(item._id, status));
              setMenuVisible(null);
            }}
            title={status}
            titleStyle={styles.menuItemTitle}
          />
        ))}
      </Menu>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading orders...</Text>
      </View>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="receipt-outline" size={60} color={COLORS.grayMedium} />
        <Text style={styles.emptyText}>No orders found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Order Management</Text>
        <Text style={styles.headerSubtitle}>Update order status and track deliveries</Text>
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

export default OrderStatusUpdateScreen;