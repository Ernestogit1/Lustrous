import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleOrder } from '../../redux/actions/order.Actions';

export default function SingleOrderDetailScreen({ route }) {
  const { orderId } = route.params;
  const dispatch = useDispatch();

  const { order, loading, error } = useSelector((state) => state.singleOrder);

  useEffect(() => {
    if (orderId) {
      dispatch(getSingleOrder(orderId));
    }
  }, [dispatch, orderId]);

  if (loading) return <Text style={styles.loader}>Loading order details...</Text>;
  if (error) return <Text style={styles.error}>{error}</Text>;
  if (!order) return <Text>No order found.</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order #{order._id}</Text>
      <Text>Status: {order.status}</Text>
      <Text>Total: ₱{order.totalAmount}</Text>
      <FlatList
        data={order.products}
        keyExtractor={(item) => item.product._id}
        renderItem={({ item }) => (
          <View style={styles.productRow}>
            <Image source={{ uri: item.product.images[0]?.url }} style={styles.image} />
            <View>
              <Text>{item.product.name}</Text>
              <Text>Qty: {item.quantity}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  loader: { marginTop: 20, textAlign: 'center' },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
  productRow: { flexDirection: 'row', marginVertical: 8 },
  image: { width: 50, height: 50, marginRight: 10, borderRadius: 6 },
});
