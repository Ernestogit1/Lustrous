import React, { useEffect } from 'react';
import {
  View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator,  
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { removeFromCart, updateCartQuantity, getCartItemsFromSQLite } from '../../redux/actions/order.Actions'; // getCartItems {unused imports} 
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
      dispatch(getCartItemsFromSQLite());  // get from sqlite
          //   dispatch(getCartItems());     // get from mongo db       

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

      <TouchableOpacity
        onPress={() => dispatch(removeFromCart(item._id))}
        style={styles.removeButton}
      >
        <Ionicons name="trash-outline" size={22} color="black" />
      </TouchableOpacity>
    

    </View>
    
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={styles.loadingColor.color} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          ListEmptyComponent={(
            <View style={styles.emptyContainer}>
              <Ionicons name="cart-outline" size={80} color={styles.emptyIcon.color} />
              <Text style={styles.empty}>Your cart is empty</Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
        <TouchableOpacity
        style={[styles.checkoutButton, { marginTop: 10 }]}
        onPress={() => navigation.navigate('Checkout')}
      >
        <Text style={styles.checkoutText}>Go to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}