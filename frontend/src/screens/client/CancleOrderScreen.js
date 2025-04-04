import React, { useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../../redux/actions/order.Actions';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles, { COLORS } from '../style/client/CancelOrderScreen.styles';

const CancelOrderScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orderList);

  useFocusEffect(
    useCallback(() => {
      dispatch(getMyOrders('Cancelled')); 
    }, [dispatch])
  );

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="close-circle-outline" size={80} color={COLORS.mediumGray} />
      <Text style={styles.emptyText}>No cancelled orders</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.error} />
          <Text style={styles.loaderText}>Loading cancelled orders...</Text>
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
                  <Text style={styles.orderId}>Order #{item._id.slice(-6)}</Text>
                  <Text style={styles.orderDate}>{formatDate(item.createdAt)}</Text>
                </View>
                <View style={styles.statusContainer}>
                  <Ionicons name="close-circle" size={16} color={COLORS.error} />
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>

              <View style={styles.divider} />
              
              {item.products.map(({ product, quantity }) => (
                <View key={product._id} style={styles.productItem}>
                  <Image 
                    source={{ uri: product.images[0]?.url }} 
                    style={styles.productImage}
                  />
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <View style={styles.productDetails}>
                      <Text style={styles.productPrice}>₱{product.price.toFixed(2)}</Text>
                      <Text style={styles.productQuantity}>Qty: {quantity}</Text>
                    </View>
                  </View>
                </View>
              ))}
              
              <View style={styles.divider} />
              
              <View style={styles.orderSummary}>
                <Text style={styles.totalItems}>{item.products.length} item(s)</Text>
                <Text style={styles.totalAmount}>Total: ₱{item.totalAmount.toFixed(2)}</Text>
              </View>
              
            </View>
          )}
        />
      )}
    </View>
  );
};

export default CancelOrderScreen;