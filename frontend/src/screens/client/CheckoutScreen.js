
import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector,useDispatch  } from 'react-redux';
import { checkoutOrder } from '../../redux/actions/order.Actions';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../style/client/UserDrawer.styles';

export default function CheckoutScreen({ navigation }) {
  const cartItems = useSelector((state) => state.cartList?.cartItems) || [];
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userLogin?.userInfo);

  const SHIPPING_FEE = 50;
  const total = cartItems?.reduce?.((acc, item) => acc + item.product.price * item.quantity, 0) || 0;
  const grandTotal = total + SHIPPING_FEE;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🧾 Checkout Summary</Text>
      </View>

      {/* User Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👤 Customer Info</Text>
        <Text style={styles.info}>Name: {userInfo?.name}</Text>
        <Text style={styles.info}>Email: {userInfo?.email}</Text>
        <Text style={styles.info}>Phone: {userInfo?.phoneNumber || 'N/A'}</Text>
        <Text style={styles.info}>Address: {userInfo?.address || 'N/A'}</Text>
      </View>

      {/* Cart Items */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🛒 Products</Text>
        {cartItems.map((item) => (
          <View key={item._id} style={styles.product}>
            <Image source={{ uri: item.product.images[0]?.url }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.name}>{item.product.name}</Text>
              <Text>₱{item.product.price} × {item.quantity}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💳 Order Summary</Text>
        <View style={styles.summaryRow}>
          <Text>Total:</Text>
          <Text>₱{total.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Shipping Fee:</Text>
          <Text>₱{SHIPPING_FEE.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.grandTotalLabel}>Grand Total:</Text>
          <Text style={styles.grandTotalValue}>₱{grandTotal.toFixed(2)}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonRow}>
     
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          dispatch(checkoutOrder(() => {
            navigation.navigate('UserDrawer', { screen: 'Cart' });
          }));
        }}
      >
        <Text style={styles.buttonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { marginBottom: 15 },
  title: { fontSize: 22, fontWeight: 'bold', color: COLORS.darkPurple },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10, color: COLORS.mediumPurple },
  info: { fontSize: 14, marginBottom: 4 },
  product: { flexDirection: 'row', marginBottom: 10, alignItems: 'center' },
  productImage: { width: 50, height: 50, borderRadius: 6, marginRight: 10 },
  productDetails: { flex: 1 },
  name: { fontSize: 16, fontWeight: '500' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
  grandTotalLabel: { fontWeight: 'bold' },
  grandTotalValue: { fontWeight: 'bold', color: COLORS.darkPurple },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  button: {
    flex: 1,
    backgroundColor: COLORS.darkPurple,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
});
