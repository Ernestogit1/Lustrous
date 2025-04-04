import React, { useEffec, useCallback  } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../../redux/actions/order.Actions';
import { useFocusEffect } from '@react-navigation/native'; 
const OrderDetailsScreen = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector(state => state.orderList);

  useFocusEffect(
    useCallback(() => {
      dispatch(getMyOrders());
    }, [dispatch])
  );
  if (loading) return <Text style={styles.loader}>Loading orders...</Text>;

  return (
    <FlatList
      data={orders}
      keyExtractor={(order) => order._id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.status}>Status: {item.status}</Text>
          <Text style={styles.total}>Total: ₱{item.totalAmount}</Text>

          {item.products.map(({ product, quantity }) => (
            <View key={product._id} style={styles.item}>
              <Image source={{ uri: product.images[0]?.url }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.qty}>Qty: {quantity}</Text>
              </View>
            </View>
          ))}

          {item.status === 'Order Placed' && (
            <TouchableOpacity style={styles.cancelBtn}>
              <Text style={styles.cancelText}>Cancel Order</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  loader: { marginTop: 40, textAlign: 'center' },
  card: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 14,
    borderRadius: 8,
    elevation: 2,
  },
  status: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#6200ee',
  },
  total: {
    fontSize: 16,
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
    marginVertical: 6,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 10,
  },
  info: { justifyContent: 'center' },
  name: { fontWeight: '600' },
  qty: { color: '#777' },
  cancelBtn: {
    backgroundColor: '#e53935',
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  cancelText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default OrderDetailsScreen;
