import React from 'react';
import { View, Text, TouchableOpacity, Image } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions/auth.Actions";
import { Ionicons } from '@expo/vector-icons';
import Product from '../screens/server/Product/Product';
import ProductCreate from '../screens/server/Product/Product.Create';
import UpdateProduct from '../screens/server/Product/Product.Update';
import ProductTrash from '../screens/server/Product/Product.Trash';
import orderUpdate from '../screens/server/Order/OrderStatusUpdateScreen';
import orderCancle from '../screens/server/Order/OrderCancleScreen';
import orderDelivered from '../screens/server/Order/OrderCompletedScreen';
import NotificationCreate from '../screens/server/Notification/Notification.Create';
import styles, { COLORS } from '../screens/style/server/AdminSidebar.styles';

const Drawer = createDrawerNavigator();

const LogoutScreen = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.logoutContainer}>
      <Text style={styles.logoutTitle}>Are you sure you want to log out?</Text>
      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={() => dispatch(logoutUser())}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const CustomDrawerContent = (props) => {
  return (
    <View style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Image 
          source={require('../../assets/lustrous.png')} 
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.drawerItemsContainer}>
        {props.children}
      </View>
    </View>
  );
};

export default function AdminSideBar() {
  return (
    <Drawer.Navigator
      initialRouteName="Products"
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: COLORS.white,
        headerTitleStyle: styles.headerTitle,
        drawerActiveTintColor: COLORS.darkPurple,
        drawerInactiveTintColor: COLORS.gray,
        drawerLabelStyle: styles.drawerLabel,
        drawerStyle: styles.drawer,
        drawerContentContainerStyle: styles.drawerContentContainer,
      }}
      drawerContent={(props) => (
        <CustomDrawerContent {...props}>
          {props.state.routes.map((route, index) => {
            if (route.name === 'UpdateProduct') return null;
            
            const getIcon = (routeName, focused) => {
              const color = focused ? COLORS.darkPurple : COLORS.gray;
              switch (routeName) {
                case 'Products':
                  return <Ionicons name="cube" size={22} color={color} />;
                case 'CreateProduct':
                  return <Ionicons name="add-circle" size={22} color={color} />;
                case 'Trash':
                  return <Ionicons name="trash" size={22} color={color} />;
                case 'Orders':
                  return <Ionicons name="list" size={22} color={color} />;
                case 'CancelledOrders':
                  return <Ionicons name="close-circle" size={22} color={color} />;
                case 'DeliveredOrders':
                  return <Ionicons name="checkmark-circle" size={22} color={color} />;
                case 'Notification':
                  return <Ionicons name="notifications" size={22} color={color} />;
                case 'Logout':
                  return <Ionicons name="log-out" size={22} color={color} />;
                default:
                  return <Ionicons name="ellipsis-horizontal" size={22} color={color} />;
              }
            };
            
            // Get human-readable label
            const getLabel = (routeName) => {
              switch (routeName) {
                case 'CreateProduct':
                  return 'Add New Product';
                case 'CancelledOrders':
                  return 'Cancelled Orders';
                case 'DeliveredOrders':
                  return 'Completed Orders';
                case 'Notification':
                  return 'Create Discount/Promotion';
                default:
                  return routeName;
              }
            };
            
            const focused = props.state.index === index;
            
            return (
              <TouchableOpacity
                key={route.key}
                style={[
                  styles.drawerItem,
                  focused ? styles.drawerItemActive : null
                ]}
                onPress={() => props.navigation.navigate(route.name)}
              >
                {getIcon(route.name, focused)}
                <Text style={[
                  styles.drawerItemText,
                  focused ? styles.drawerItemTextActive : null
                ]}>
                  {getLabel(route.name)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </CustomDrawerContent>
      )}
    >
      <Drawer.Screen 
        name="Products" 
        component={Product} 
        options={{
          title: "Products",
          headerTitle: "",
        }}
      />
      <Drawer.Screen 
        name="CreateProduct" 
        component={ProductCreate}
        options={{
          title: "Add New Product",
          headerTitle: "",
        }}
      />
      <Drawer.Screen 
        name="Trash" 
        component={ProductTrash}
        options={{
          title: "Trash",
          headerTitle: "",
        }}
      />
      <Drawer.Screen 
        name="Orders" 
        component={orderUpdate}
        options={{
          title: "Orders",
          headerTitle: "",
        }}
      />
      <Drawer.Screen 
        name="CancelledOrders" 
        component={orderCancle}
        options={{
          title: "Cancelled Orders",
          headerTitle: "",
        }}
      />
      <Drawer.Screen 
        name="DeliveredOrders" 
        component={orderDelivered}
        options={{
          title: "Completed Orders",
          headerTitle: "",
        }}
      />
        <Drawer.Screen 
        name="Notification" 
        component={NotificationCreate}
        options={{
          title: "Create Discount/Promotion",
          headerTitle: "",
        }}
      />
      <Drawer.Screen 
        name="Logout" 
        component={LogoutScreen}
        options={{
          title: "Logout",
          headerTitle: "Logout",
        }}
      />
      <Drawer.Screen
        name="UpdateProduct"
        component={UpdateProduct}
        options={{ 
          drawerItemStyle: { display: 'none' },
          headerTitle: "Update Product",
        }}
      />
    </Drawer.Navigator>
  );
}