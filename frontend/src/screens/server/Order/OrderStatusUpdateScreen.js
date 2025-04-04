import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminOrders, updateOrderStatus } from '../../../redux/actions/orderAdmin.Action';
import { Button, ActivityIndicator, Menu } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

const OrderStatusUpdateScreen = () => {
    const state = useSelector(state => state);
    // console.log('[🧾 Full Redux State]', state);


  const dispatch = useDispatch();
  const isFocused = useIsFocused(); // ✅ track when screen is in focus

  const { orders, loading } = state.adminOrders || {};
//   console.log('[🧾 Orders from Redux]', orders);
  
  const [menuVisible, setMenuVisible] = useState(null);

  useEffect(() => {
    if (isFocused) {
      dispatch(getAdminOrders()); // ✅ refresh orders on focus
    }
  }, [dispatch, isFocused]);

//   useEffect(() => {
//     console.log('[🧾 Orders from Redux]', orders);
//   }, [orders]);

  const STATUS_OPTIONS = ['Order Placed', 'Shipped', 'Completed', 'Cancelled'];

  const renderOrder = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.user}>👤 {item.user.name}</Text>
      <Text>🧾 Total: ₱{item.totalAmount}</Text>
      {item.products.map((p, i) => (
        <View key={i} style={styles.row}>
          <Image source={{ uri: p.product.images[0]?.url }} style={styles.image} />
          <Text>{p.product.name} x {p.quantity}</Text>
        </View>
      ))}
      <Menu
        visible={menuVisible === item._id}
        onDismiss={() => setMenuVisible(null)}
        anchor={
          <Button
            mode="outlined"
            onPress={() => setMenuVisible(item._id)}
            style={styles.statusBtn}
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
          />
        ))}
      </Menu>
    </View>
  );

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

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
  card: { backgroundColor: '#f8f8f8', marginBottom: 12, padding: 12, borderRadius: 8 },
  user: { fontWeight: 'bold', marginBottom: 6 },
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 6 },
  image: { width: 40, height: 40, marginRight: 10, borderRadius: 4 },
  statusBtn: { marginTop: 10 },
});

export default OrderStatusUpdateScreen;
