import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker"; 
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "../../redux/actions/user.Actions"; 
import { Ionicons } from "@expo/vector-icons"; 
import styles, { COLORS } from "../style/client/EditProfileScreen.styles";

const EditProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userLogin?.userInfo); 

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false); 
  const isGoogleLogin = userInfo?.phoneNumber === "Not Provided" && userInfo?.address === "Not Provided"; // Check if the user logged in using Google

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name || "");
      setPhoneNumber(userInfo.phoneNumber || "");
      setAddress(userInfo.address || "");
      setEmail(userInfo.email || "");
      setAvatar(userInfo.avatar || null); 
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [userInfo]);

  const pickImageFromGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "You need to allow access to your gallery.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri); 
      setModalVisible(false); 
    }
  };

  // Handle taking a photo with the camera
  const takePhotoWithCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "You need to allow access to your camera.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri); 
      setModalVisible(false); 
    }
  };

  const handleSave = async () => {
    if (!phoneNumber || !address) {
      Alert.alert("Error", "Phone number and address are required.");
      return;
    }

    const formData = new FormData();
    if (!isGoogleLogin) {
      formData.append("name", name);
      formData.append("email", email);
    }
    formData.append("phoneNumber", phoneNumber);
    formData.append("address", address);

    if (avatar) {
      formData.append("avatar", {
        uri: avatar,
        type: "image/jpeg",
        name: "avatar.jpg",
      });
    }

    try {
      await dispatch(updateUserProfile(formData));

      navigation.navigate("Profile");
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Failed to update profile.";

      if (errorMessage === "Email is already in use") {
        Alert.alert("Update Failed", "The email you entered is already taken by another account.");
      } else {
        Alert.alert("Update Failed", errorMessage);
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.darkPurple} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Avatar Section */}
      <View style={styles.avatarContainer}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarPlaceholderText}>No Avatar</Text>
          </View>
        )}
        {!isGoogleLogin && (
          <TouchableOpacity
            style={styles.cameraIconContainer}
            onPress={() => setModalVisible(true)} 
          >
            <Ionicons name="camera" size={24} color={COLORS.white} />
          </TouchableOpacity>
        )}
      </View>

      {/* Modal for Camera/Gallery Options */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Upload Avatar</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={takePhotoWithCamera}
            >
              <Text style={styles.modalButtonText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={pickImageFromGallery}
            >
              <Text style={styles.modalButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* User Details Section */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
          editable={!isGoogleLogin} 
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          editable={!isGoogleLogin} 
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfileScreen;