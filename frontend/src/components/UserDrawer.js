import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
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

  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState("User");

  useEffect(() => {
    if (userInfo) {
      setAvatar(userInfo.avatar || null);
      setName(userInfo.name || "User");
    }
  }, [userInfo]);

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
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatarImage} />
          ) : (
            <Ionicons name="person-circle-outline" size={80} color={COLORS.darkPurple} />
          )}
        </View>
        <Text style={styles.userName}>{name}</Text>
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