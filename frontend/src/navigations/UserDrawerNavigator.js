import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the menu icon
import UserScreen from "../screens/client/UserScreen"; // Home screen
import ProfileScreen from "../screens/client/ProfileScreen"; // Profile screen
import CartScreen from "../screens/client/CartScreen";
import ProductsScreen from "../screens/client/ProductsScreen";
import UserDrawer from "../components/UserDrawer";
import OrderTabs from '../navigations/OrderTabs';

import { COLORS } from "../screens/style/client/UserDrawer.styles";

const Drawer = createDrawerNavigator();

const UserDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <UserDrawer {...props} />}
      screenOptions={{
        headerShown: true, // Show headers for drawer screens
        headerStyle: {
          backgroundColor: COLORS.lightPink,
        },
        headerTintColor: COLORS.darkPurple,
        headerTitleStyle: {
          fontFamily: "Poppins-Medium",
          fontSize: 18,
        },
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
      }}
    >

   {/* Home Drawer Item */}
   <Drawer.Screen
        name="Home"
        component={UserScreen}
        options={({ navigation }) => ({
          drawerLabel: "Home", 
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={24}
              color={COLORS.darkPurple}
              style={{ marginLeft: 16 }}
              onPress={() => navigation.toggleDrawer()} 
            />
          ),
        })}
      />
      <Drawer.Screen
        name="Products"
        component={ProductsScreen}
        options={({ navigation }) => ({
          drawerLabel: "Products",
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={24}
              color={COLORS.darkPurple}
              style={{ marginLeft: 16 }}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />

      {/* Profile Drawer Item */}
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          drawerLabel: "Profile", 
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={24}
              color={COLORS.darkPurple}
              style={{ marginLeft: 16 }}
              onPress={() => navigation.toggleDrawer()} 
            />
          ),
        })}
      />


      <Drawer.Screen
        name="Cart"
        component={CartScreen}
        options={({ navigation }) => ({
          drawerLabel: "My Cart",
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={24}
              color={COLORS.darkPurple}
              style={{ marginLeft: 16 }}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />

      <Drawer.Screen
        name="Orders"
        component={OrderTabs}
        options={({ navigation }) => ({
          drawerLabel: "My Orders",
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={24}
              color={COLORS.darkPurple}
              style={{ marginLeft: 16 }}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Drawer.Navigator>
  );
};

export default UserDrawerNavigator;