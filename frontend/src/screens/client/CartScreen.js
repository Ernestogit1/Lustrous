import React, { useEffect } from 'react';
import {
  View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator, Alert, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import {
  removeFromCart,
  updateCartQuantity,
  getCartItemsFromSQLite,
} from '../../redux/actions/order.Actions';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import styles, { COLORS } from '../style/client/CartScreen.styles';

export default function CartScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const userInfo = useSelector((state) => state.userLogin?.userInfo);
  const { loading, cartItems, error } = useSelector((state) => state.cartList);

  useEffect(() => {
    if (isFocused && userInfo?._id) {
      dispatch(getCartItemsFromSQLite());
    }
  }, [isFocused, dispatch, userInfo]);

  const renderRightActions = (itemId) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => dispatch(removeFromCart(itemId))}
    >
      <Ionicons name="trash-outline" size={24} color="white" />
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Swipeable
      renderRightActions={() => renderRightActions(item._id)}
      overshootRight={false}
    >
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
                item.quantity === 1 && styles.disabledButton,
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
                item.quantity === item.product.stock && styles.disabledButton,
              ]}
              onPress={() => dispatch(updateCartQuantity(item._id, 'increase'))}
              disabled={item.quantity === item.product.stock}
            >
              <Ionicons name="add" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Swipeable>
  );

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={styles.loadingColor.color} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons
                  name="cart-outline"
                  size={80}
                  color={styles.emptyIcon.color}
                />
                <Text style={styles.empty}>Your cart is empty</Text>
              </View>
            }
            contentContainerStyle={{ paddingBottom: 20 }}
          />

          {/* Subtotal Preview Container */}
          {Array.isArray(cartItems) && cartItems.length > 0 && (
            <View style={styles.subtotalContainer}>
              {cartItems.map((item) => (
                <View key={item._id} style={styles.subtotalRow}>
                  <Text style={styles.subtotalText}>
                    {item.product.name} ({item.quantity} × ₱{item.product.price})
                  </Text>
                  <Text style={styles.subtotalText}>
                  ₱{(item.product.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
              ))}
              <View style={styles.subtotalDivider} />
              <View style={styles.subtotalRow}>
                <Text style={styles.subtotalTitle}>Subtotal</Text>
                <Text style={styles.subtotalTitle}>₱{calculateSubtotal()}</Text>
              </View>
            </View>
          )}

          {/* Checkout Button */}
          {Array.isArray(cartItems) && cartItems.length > 0 && (
            <TouchableOpacity
              style={[styles.checkoutButton, { marginTop: 10 }]}
              onPress={() => navigation.navigate('Checkout')}
            >
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}