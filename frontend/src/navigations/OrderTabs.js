import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OrderDetailsScreen from '../screens/client/OrderDetailsScreen';
import CancelOrderScreen from '../screens/client/CancleOrderScreen';
import CompletedOrderScreen from '../screens/client/CompletedOrderScreen';

const Tab = createMaterialTopTabNavigator();

const OrderTabs = () => (
  <Tab.Navigator
    screenOptions={{
      lazy: true, // ensures only active screen renders
      swipeEnabled: true, // enable proper swipe gestures
      tabBarLabelStyle: { fontSize: 15, fontFamily: 'Poppins-SemiBold' },
      tabBarIndicatorStyle: { backgroundColor: '#6200ee', height: 3 },
      tabBarActiveTintColor: '#6200ee',
      tabBarInactiveTintColor: '#999',
      tabBarStyle: {
        backgroundColor: '#f5f5f5',
        elevation: 4,
      },
    }}
  >
    <Tab.Screen name="My Orders" component={OrderDetailsScreen} />
    <Tab.Screen name="Cancelled" component={CancelOrderScreen} />
    <Tab.Screen name="Completed" component={CompletedOrderScreen} />

  </Tab.Navigator>
);

export default OrderTabs;