import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, Button } from "react-native";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions/auth.Actions";
import Product from '../screens/server/Product/Product';
import ProductCreate from '../screens/server/Product/Product.Create';
import UpdateProduct from '../screens/server/Product/Product.Update';
import ProductTrash from '../screens/server/Product/Product.Trash';
import orderUpdate from '../screens/server/Order/OrderStatusUpdateScreen';
import orderCancle from '../screens/server/Order/OrderCancleScreen';


const Drawer = createDrawerNavigator();

const LogoutScreen = (navigation) => {
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Are you sure you want to log out?</Text>
      <Button title="Logout" onPress={() => dispatch(logoutUser())} />
    </View>
  );
};

export default function AdminSideBar() {
  return (
    <Drawer.Navigator initialRouteName="Products">
      <Drawer.Screen name="Products" component={Product} />
      <Drawer.Screen name="CreateProduct" component={ProductCreate} />
      <Drawer.Screen name="Trash" component={ProductTrash} />
      <Drawer.Screen name="Orders" component={orderUpdate} />
      <Drawer.Screen name="CancelledOrders" component={orderCancle} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
      <Drawer.Screen
        name="UpdateProduct"
        component={UpdateProduct}
        options={{ drawerItemStyle: { display: 'none' } }} 
      />
    </Drawer.Navigator>
    
  );
}
