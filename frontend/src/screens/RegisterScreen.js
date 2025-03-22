import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/actions/auth.Actions";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import styles, { COLORS } from "./style/RegisterScreen.styles";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { loading, error, success } = useSelector((state) => state.userRegister)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Request permissions for camera and media library
  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(cameraStatus === "granted");

      const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (mediaStatus !== "granted") {
        Alert.alert("Permission Required", "Please allow access to media library.");
      }
    })();
  }, []);


  useEffect(() => {
    if (success) {
      Alert.alert("Success", "Registration successful! You can now log in.");
      navigation.navigate("Login"); // 🔥 Redirect to LoginScreen
    }
  }, [success]);

  // Function to open camera and take photo
  const takePhoto = async () => {
    if (!cameraPermission) {
      Alert.alert("Permission Denied", "Camera access is required.");
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setAvatar(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to take photo.");
    }
  };

  // Function to pick image from gallery
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setAvatar(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to select image.");
    }
  };

  // Function to handle registration
  const handleRegister = async () => {
    if (!name || !email || !password || !phoneNumber) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phoneNumber", phoneNumber);
    formData.append("address", address);

    if (avatar) {
      const filename = avatar.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : "image/jpeg";
    
      formData.append("avatar", {
        uri: avatar,
        name: filename,
        type,
      });
    }

    dispatch(registerUser(formData));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LinearGradient colors={[COLORS.lightPink, '#FFF']} style={styles.gradientBackground}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.darkPurple} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Sign Up</Text>
            
            {/* Avatar Upload Section */}
            <TouchableOpacity 
              style={styles.avatarContainer} 
              onPress={() => Alert.alert("Upload Photo", "Choose an option", [
                { text: "Camera", onPress: takePhoto },
                { text: "Gallery", onPress: pickImage },
                { text: "Cancel", style: "cancel" }
              ])}
            >
              {avatar ? (
                <Image source={{ uri: avatar }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Ionicons name="person" size={40} color={COLORS.mediumPink} />
                </View>
              )}
              <View style={styles.editIconContainer}>
                <Ionicons name="camera" size={18} color="#FFF" />
              </View>
            </TouchableOpacity>
            <Text style={styles.avatarHelperText}>Tap to upload profile photo</Text>

            {/* Input Fields with Icons */}
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color={COLORS.darkPurple} style={styles.inputIcon} />
              <TextInput 
                placeholder="Full Name" 
                value={name} 
                onChangeText={setName} 
                style={styles.input} 
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color={COLORS.darkPurple} style={styles.inputIcon} />
              <TextInput 
                placeholder="Email Address" 
                keyboardType="email-address" 
                value={email} 
                onChangeText={setEmail} 
                style={styles.input} 
                autoCapitalize="none"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color={COLORS.darkPurple} style={styles.inputIcon} />
              <TextInput 
                placeholder="Password" 
                secureTextEntry={!showPassword} 
                value={password} 
                onChangeText={setPassword} 
                style={styles.input} 
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
            
            <View style={styles.inputContainer}>
              <Ionicons name="call-outline" size={20} color={COLORS.darkPurple} style={styles.inputIcon} />
              <TextInput 
                placeholder="Phone Number" 
                keyboardType="phone-pad" 
                value={phoneNumber} 
                onChangeText={setPhoneNumber} 
                style={styles.input} 
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Ionicons name="home-outline" size={20} color={COLORS.darkPurple} style={styles.inputIcon} />
              <TextInput 
                placeholder="Address" 
                value={address} 
                onChangeText={setAddress} 
                style={[styles.input, styles.addressInput]} 
              />
            </View>

            {/* Error Handling */}
            {error && <Text style={styles.errorText}>{error}</Text>}

            {/* Register Button */}
            <TouchableOpacity onPress={handleRegister} style={styles.button} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Create Account</Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Already have an account */}
            <View style={styles.loginLinkContainer}>
              <Text style={styles.loginText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;