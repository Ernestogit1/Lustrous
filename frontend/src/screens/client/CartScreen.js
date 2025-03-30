import React, { useEffect } from 'react';
import {
  View, Text, Image, FlatList, StyleSheet,
  TouchableOpacity, ActivityIndicator
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { getCartItems, removeFromCart, updateCartQuantity, getCartItemsFromSQLite } from '../../redux/actions/order.Actions';
import { COLORS } from '../style/client/UserDrawer.styles';
import { useIsFocused } from '@react-navigation/native';

export default function CartScreen() {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const userInfo = useSelector((state) => state.userLogin?.userInfo);
  const { loading, cartItems, error } = useSelector((state) => state.cartList);

  useEffect(() => {
    if (isFocused && userInfo?._id) {
      dispatch(getCartItemsFromSQLite()); 
      dispatch(getCartItems());           
    }
  }, [isFocused, dispatch, userInfo]);
  

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.product.images[0]?.url }}
        style={styles.productImage}
      />
      <View style={styles.details}>
        <Text style={styles.name}>{item.product.name}</Text>
        <Text style={styles.price}>₱{item.product.price}</Text>
        <View style={styles.quantityRow}>
          <TouchableOpacity
            style={[
              styles.qtyButton,
              item.quantity === 1 && styles.disabledButton
            ]}
            onPress={() => dispatch(updateCartQuantity(item._id, 'decrease'))}
            disabled={item.quantity === 1}
          >
            <Ionicons name="remove" size={18} color="white" />
          </TouchableOpacity>

          <Text style={styles.qtyText}>{item.quantity}</Text>

          <TouchableOpacity
            style={[
              styles.qtyButton,
              item.quantity === item.product.stock && styles.disabledButton
            ]}
            onPress={() => dispatch(updateCartQuantity(item._id, 'increase'))}
            disabled={item.quantity === item.product.stock}
          >
            <Ionicons name="add" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => dispatch(removeFromCart(item._id))}
        style={styles.removeButton}
      >
        <Ionicons name="trash-outline" size={22} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.darkPurple} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          ListHeaderComponent={<Text style={styles.title}>🛒 My Cart</Text>}
          ListEmptyComponent={<Text style={styles.empty}>Your cart is empty</Text>}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: 'bold',
    color: COLORS.darkPurple,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightPurple,
    marginBottom: 12,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
  },
  price: {
    color: COLORS.mediumPurple,
    marginBottom: 2,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  qtyButton: {
    backgroundColor: COLORS.darkPurple,
    padding: 5,
    borderRadius: 5,
  },
  qtyText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
  error: {
    color: 'red',
    marginTop: 15,
    fontSize: 16,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#999',
  },
});
