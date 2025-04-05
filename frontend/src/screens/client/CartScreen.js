import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator, Alert,
} from 'react-native';
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
  const [hasDeletedItems, setHasDeletedItems] = useState(false);
  const allProducts = useSelector(state => state.productDetails.products || []);

  useEffect(() => {
    if (isFocused && userInfo?._id) {
      dispatch(getCartItemsFromSQLite());
    }
  }, [isFocused, dispatch, userInfo]);

  // More thorough check for deleted products
  useEffect(() => {
    if (cartItems && cartItems.length > 0 && allProducts && allProducts.length > 0) {
      // Check if any cart items contain products that no longer exist in the allProducts list
      const hasDeleted = cartItems.some(cartItem => {
        if (!cartItem.product || !cartItem.product._id) return true;
        
        // Check if this product still exists in the product database
        const productExists = allProducts.some(p => p._id === cartItem.product._id);
        return !productExists;
      });
      
      setHasDeletedItems(hasDeleted);
    } else {
      setHasDeletedItems(false);
    }
  }, [cartItems, allProducts]);

  const renderRightActions = (itemId) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => dispatch(removeFromCart(itemId))}
    >
      <Ionicons name="trash-outline" size={24} color="white" />
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    // More comprehensive check for deleted product
    const isProductDeleted = () => {
      // Check if product data is missing
      if (!item.product || !item.product.name) return true;
      
      // Check if product exists in current product list
      if (allProducts && allProducts.length > 0) {
        return !allProducts.some(p => p._id === item.product._id);
      }
      
      return false;
    };
    
    // Handle deleted product
    if (isProductDeleted()) {
      return (
        <Swipeable
          renderRightActions={() => renderRightActions(item._id)}
          overshootRight={false}
        >
          <View style={styles.card}>
            <View style={styles.missingImageContainer}>
              <Ionicons name="help-outline" size={30} color={COLORS.grayMedium} />
            </View>
            <View style={styles.details}>
              <Text style={styles.unavailableText}>Product no longer available</Text>
              <View style={styles.deletedProductBanner}>
                <Text style={styles.deletedProductText}>This item has been removed from the store.</Text>
              </View>
            </View>
          </View>
        </Swipeable>
      );
    }

    // Regular product
    return (
      <Swipeable
        renderRightActions={() => renderRightActions(item._id)}
        overshootRight={false}
      >
        <View style={styles.card}>
          {item.product.images && item.product.images[0] ? (
            <Image
              source={{ uri: item.product.images[0]?.url }}
              style={styles.productImage}
            />
          ) : (
            <View style={styles.missingImageContainer}>
              <Ionicons name="image-outline" size={30} color={COLORS.grayMedium} />
            </View>
          )}
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
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => {
        // Skip deleted products in subtotal calculation
        if (!item.product || !item.product.price) return total;
        
        // If the product no longer exists in the product list, skip it
        if (allProducts && allProducts.length > 0) {
          const productExists = allProducts.some(p => p._id === item.product._id);
          if (!productExists) return total;
        }
        
        return total + item.product.price * item.quantity;
      }, 0)
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
              {cartItems.map((item) => {
                const isDeleted = !item.product || !item.product.name || 
                  (allProducts && allProducts.length > 0 && 
                   !allProducts.some(p => p._id === item.product?._id));
                
                return (
                  <View key={item._id} style={styles.subtotalRow}>
                    <View style={styles.subtotalItemDetails}>
                      <Text style={[
                        styles.subtotalText, 
                        isDeleted && styles.unavailableText
                      ]} numberOfLines={1}>
                        {isDeleted ? 'Product no longer available' : item.product.name}
                      </Text>
                      <Text style={styles.subtotalItemQuantity}>
                        {item.quantity} × ₱{!isDeleted ? item.product.price.toFixed(2) : '0.00'}
                      </Text>
                    </View>
                    <Text style={styles.subtotalItemPrice}>
                      ₱{!isDeleted ? (item.product.price * item.quantity).toFixed(2) : '0.00'}
                    </Text>
                  </View>
                );
              })}
              <View style={styles.subtotalDivider} />
              <View style={styles.subtotalRow}>
                <Text style={styles.subtotalTitle}>Subtotal</Text>
                <Text style={styles.subtotalTitle}>₱{calculateSubtotal()}</Text>
              </View>
            </View>
          )}

          {/* Warning about unavailable products */}
          {hasDeletedItems && (
            <View style={styles.warningContainer}>
              <Ionicons name="alert-circle" size={20} color={COLORS.warning} />
              <Text style={styles.warningText}>
                Some items in your cart are no longer available. Please remove them from your cart to continue.
              </Text>
            </View>
          )}

          {/* Checkout Button */}
          {Array.isArray(cartItems) && cartItems.length > 0 && (
            <TouchableOpacity
              style={[
                styles.checkoutButton, 
                hasDeletedItems && styles.disabledCheckoutButton,
                { marginTop: 10 }
              ]}
              onPress={() => {
                if (hasDeletedItems) {
                  Alert.alert(
                    "Can't proceed with checkout", 
                    "Please remove unavailable items from your cart before checking out.",
                    [{ text: "OK" }]
                  );
                } else {
                  navigation.navigate('Checkout');
                }
              }}
            >
              <Text style={[
                styles.checkoutText,
                hasDeletedItems && styles.disabledCheckoutText
              ]}>
                Proceed to Checkout
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}