import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Modal, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import UserScreen from "../screens/client/UserScreen";
import ProfileScreen from "../screens/client/ProfileScreen";
import CartScreen from "../screens/client/CartScreen";
import ProductsScreen from "../screens/client/ProductsScreen";
import UserDrawer from "../components/UserDrawer";
import OrderTabs from '../navigations/OrderTabs';
import { useSelector } from "react-redux";

import { COLORS } from "../screens/style/client/UserDrawer.styles";

const Drawer = createDrawerNavigator();

const NotificationBadge = ({ count }) => {
  if (!count || count <= 0) return null;
  
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>
        {count > 99 ? '99+' : count}
      </Text>
    </View>
  );
};

// Simple empty dropdown component
const EmptyDropdown = ({ visible, onClose }) => {
  if (!visible) return null;
  
  return (
    <TouchableOpacity 
      style={styles.dropdownOverlay} 
      activeOpacity={1} 
      onPress={onClose}
    >
      <View style={styles.dropdownContainer} />
    </TouchableOpacity>
  );
};

const UserDrawerNavigator = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  
  // Get the cart items count from Redux store
  const cartItems = useSelector(state => state.cartList?.cartItems || []);
  const cartItemCount = cartItems.length;

  const HeaderRight = ({ navigation }) => {
    return (
      <View style={styles.headerRightContainer}>
        {/* Notification Icon */}
        <TouchableOpacity 
          style={styles.headerIcon}
          onPress={() => setDropdownVisible(true)}
        >
          <Ionicons name="notifications-outline" size={24} color={COLORS.darkPurple} />
          <NotificationBadge count={0} />
        </TouchableOpacity>
        
        {/* Cart Icon */}
        <TouchableOpacity 
          style={styles.headerIcon}
          onPress={() => navigation.navigate('Cart')}
        >
          <Ionicons name="cart-outline" size={24} color={COLORS.darkPurple} />
          <NotificationBadge count={cartItemCount} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <Drawer.Navigator
        drawerContent={(props) => <UserDrawer {...props} />}
        screenOptions={({ navigation }) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: COLORS.lightPink,
          },
          headerTintColor: COLORS.darkPurple,
          headerTitleStyle: {
            fontFamily: "Poppins-Medium",
            fontSize: 18,
          },
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={24}
              color={COLORS.darkPurple}
              style={{ marginLeft: 16 }}
              onPress={() => navigation.toggleDrawer()} 
            />
          ),
          headerRight: () => <HeaderRight navigation={navigation} />,
          drawerStyle: {
            backgroundColor: COLORS.lightPink,
            width: 240,
          },
          drawerActiveTintColor: COLORS.darkPurple,
          drawerInactiveTintColor: COLORS.mediumPurple,
          drawerActiveBackgroundColor: COLORS.lightPurple,
          drawerLabelStyle: {
            fontFamily: "Poppins-Medium",
            fontSize: 16,
            textAlign: "center",
          },
          drawerItemStyle: {
            borderRadius: 8,
            marginVertical: 5,
            width: "90%",
            alignSelf: "center",
          },
        })}
      >
        <Drawer.Screen
          name="Home"
          component={UserScreen}
          options={{
            drawerLabel: "Home",
          }}
        />
        
        <Drawer.Screen
          name="Products"
          component={ProductsScreen}
          options={{
            drawerLabel: "Products",
          }}
        />

        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            drawerLabel: "Profile", 
          }}
        />

        <Drawer.Screen
          name="Cart"
          component={CartScreen}
          options={{
            drawerLabel: "My Cart",
          }}
        />

        <Drawer.Screen
          name="Orders"
          component={OrderTabs}
          options={{
            drawerLabel: "My Orders",
          }}
        />
      </Drawer.Navigator>
      
      {/* Simple Empty Dropdown */}
      <EmptyDropdown 
        visible={dropdownVisible}
        onClose={() => setDropdownVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    marginRight: 16,
  },
  headerIcon: {
    marginLeft: 16,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: '#D63447',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Poppins-Bold',
  },
  dropdownOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    zIndex: 1000,
  },
  dropdownContainer: {
    position: 'absolute',
    top: 70,
    right: 16,
    width: 150,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  }
});

export default UserDrawerNavigator;