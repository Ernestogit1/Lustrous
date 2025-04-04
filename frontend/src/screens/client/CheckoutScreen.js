import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { checkoutOrder } from '../../redux/actions/order.Actions';
import { Ionicons } from '@expo/vector-icons';
import styles from '../style/client/CheckoutScreen.styles';

export default function CheckoutScreen({ navigation }) {
  const cartItems = useSelector((state) => state.cartList?.cartItems) || [];
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userLogin?.userInfo);

  const SHIPPING_FEE = 50;
  const total = cartItems?.reduce?.((acc, item) => acc + item.product.price * item.quantity, 0) || 0;
  const grandTotal = total + SHIPPING_FEE;

  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      
      {/* User Info */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="person-circle" size={22} color={styles.iconColor.color} />
          <Text style={styles.cardTitle}>Delivery Information</Text>
        </View>
        
        <View style={styles.cardBody}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name:</Text>
            <Text style={styles.infoValue}>{userInfo?.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone:</Text>
            <Text style={styles.infoValue}>{userInfo?.phoneNumber || 'Not provided'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Address:</Text>
            <Text style={styles.infoValue}>{userInfo?.address || 'Not provided'}</Text>
          </View>
        </View>
      </View>

      {/* Cart Items */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="cart" size={22} color={styles.iconColor.color} />
          <Text style={styles.cardTitle}>Order Items</Text>
        </View>
        
        <View style={styles.cardBody}>
          {cartItems.map((item) => (
            <View key={item._id} style={styles.productCard}>
              <Image 
                source={{ uri: item.product.images[0]?.url }} 
                style={styles.productImage} 
              />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.product.name}</Text>
                <Text style={styles.productPrice}>₱{item.product.price.toFixed(2)}</Text>
                <View style={styles.quantityContainer}>
                  <Text style={styles.quantityText}>Quantity: {item.quantity}</Text>
                  <Text style={styles.itemTotal}>
                    ₱{(item.product.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Order Summary */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="calculator" size={22} color={styles.iconColor.color} />
          <Text style={styles.cardTitle}>Order Summary</Text>
        </View>
        
        <View style={styles.cardBody}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Items Total:</Text>
            <Text style={styles.summaryValue}>₱{total.toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping Fee:</Text>
            <Text style={styles.summaryValue}>₱{SHIPPING_FEE.toFixed(2)}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotalLabel}>Grand Total:</Text>
            <Text style={styles.grandTotalValue}>₱{grandTotal.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      {/* Action Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => {
            dispatch(checkoutOrder(() => {
              navigation.navigate('UserDrawer', { screen: 'Cart' });
            }));
          }}
        >
          <Text style={styles.checkoutButtonText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}