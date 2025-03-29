import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image, ScrollView, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux"; 
import styles from "../style/client/ProfileScreen.styles";

const ProfileScreen = () => {
  const userInfo = useSelector((state) => state.userLogin?.userInfo); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer); 
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6B3FA0" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatarContainer}>
        {userInfo?.avatar ? (
          <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
        ) : (
          <Image
            source={require("../../../assets/default-avatar.png")} 
            style={styles.avatar}
          />
        )}
      </View>

      {/* User Details Section */}
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={userInfo?.name || ""} editable={false} />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} value={userInfo?.phoneNumber || ""} editable={false} />

        <Text style={styles.label}>Address</Text>
        <TextInput style={styles.input} value={userInfo?.address || ""} editable={false} />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={userInfo?.email || ""} editable={false} />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value="********" 
          editable={false}
          secureTextEntry
        />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;