import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import UserScreen from "../screens/client/UserScreen";
import UserDrawer from "../components/UserDrawer";
import { COLORS } from "../screens/style/client/UserDrawer.styles"; 

const Drawer = createDrawerNavigator();

const UserDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <UserDrawer {...props} />}
      screenOptions={{
        headerShown: true, 
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
      <Drawer.Screen
        name="Home"
        component={UserScreen}
        options={{
          headerTitle: "", 
          headerStyle: {
            backgroundColor: '#ffff', 
          },
        }}
      />
      {/* Add other user-related screens here */}
    </Drawer.Navigator>
  );
};

export default UserDrawerNavigator;