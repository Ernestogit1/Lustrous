import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Product from '../screens/server/Product/Product';
import ProductCreate from '../screens/server/Product/Product.Create';

const Drawer = createDrawerNavigator();

export default function AdminSideBar() {
  return (
    <Drawer.Navigator initialRouteName="Products">
      <Drawer.Screen name="Products" component={Product} />
      <Drawer.Screen name="CreateProduct" component={ProductCreate} />

    </Drawer.Navigator>
  );
}
