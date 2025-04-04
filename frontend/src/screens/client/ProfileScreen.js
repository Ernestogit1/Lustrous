import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux"; 
import { useIsFocused } from "@react-navigation/native"; 
import { loadUser } from "../../redux/actions/auth.Actions"; 
import styles from "../style/client/ProfileScreen.styles";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch(); 
  const userInfo = useSelector((state) => state.userLogin?.userInfo); 
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused(); 

  useEffect(() => {
    if (isFocused) {
      dispatch(loadUser());
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isFocused, dispatch]); 

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6B3FA0" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Avatar Section */}
      <View style={styles.avatarContainer}>
        {userInfo?.avatar ? (
          <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarPlaceholderText}>No Avatar</Text>
          </View>
        )}
      </View>

      {/* User Details Section */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Name</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>{userInfo?.name || "N/A"}</Text>
        </View>

        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>{userInfo?.phoneNumber || "N/A"}</Text>
        </View>

        <Text style={styles.label}>Address</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>{userInfo?.address || "N/A"}</Text>
        </View>

        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>{userInfo?.email || "N/A"}</Text>
        </View>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate("EditProfile")} 
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Change Password Button
      <TouchableOpacity
        style={styles.changePasswordButton}
        onPress={() => navigation.navigate("EditPassword")} // Navigate to EditPasswordScreen
      >
        <Text style={styles.changePasswordButtonText}>Change Password</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

export default ProfileScreen;