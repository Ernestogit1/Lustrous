import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native"; // Import Image
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import styles, { COLORS } from "../screens/style/client/UserDrawer.styles";
import { logoutUser } from "../redux/actions/auth.Actions"; 
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const UserDrawer = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Fetch user info from Redux store
  const userInfo = useSelector((state) => state.userLogin?.userInfo);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <DrawerContentScrollView {...props}>
      {/* Custom Header */}
      <View style={styles.header}>
      <Image
          source={require("../../assets/lustrous.png")} 
          style={styles.logoImage}
        />        
        <View style={styles.avatarContainer}>
          {userInfo?.avatar ? (
            <Image
              source={{ uri: userInfo.avatar }} 
              style={styles.avatarImage} 
            />
          ) : (
            <Ionicons name="person-circle-outline" size={80} color={COLORS.darkPurple} />
          )}
        </View>
        <Text style={styles.userName}>
          {userInfo?.name ? `${userInfo.name}` : "User"}
        </Text>
      </View>

      {/* Default Drawer Items */}
      <DrawerItemList {...props} />

      {/* Custom Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

export default UserDrawer;