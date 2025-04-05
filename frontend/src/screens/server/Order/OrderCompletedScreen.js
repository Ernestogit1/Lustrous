import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getCompletedOrdersOnly } from '../../../redux/actions/orderAdmin.Action';
import { ActivityIndicator } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

const OrderCompletedScreen = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { orders, loading } = useSelector(state => state.adminOrders);

  useEffect(() => {
    if (isFocused) {
      dispatch(getCompletedOrdersOnly());
    }
  }, [dispatch, isFocused]);



  const renderOrder = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.user}>👤 {item.user?.name || 'User'}</Text>
      <Text>🧾 Total: ₱{item.totalAmount}</Text>
      {item.products.map((p, i) => (
        <View key={i} style={styles.row}>
          <Image source={{ uri: p.product.images?.[0]?.url }} style={styles.image} />
          <Text>{p.product.name} x {p.quantity}</Text>
        </View>
      ))}
      <Text style={styles.status}>✅ {item.status}</Text>
    </View>
  );

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;

  if (!orders?.length) {
    return <Text style={styles.empty}>No completed orders found.</Text>;
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item._id}
      renderItem={renderOrder}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#e8f5e9',
    borderColor: '#c8e6c9',
    borderWidth: 1,
    marginBottom: 12,
    padding: 14,
    borderRadius: 8,
  },
  user: { fontWeight: 'bold', marginBottom: 6 },
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
  image: { width: 40, height: 40, marginRight: 10, borderRadius: 5 },
  status: { color: 'green', marginTop: 10, fontWeight: '600' },
  empty: {
    marginTop: 100,
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
  },
});

export default OrderCompletedScreen;
