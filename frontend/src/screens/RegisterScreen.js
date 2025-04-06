import React, { useState, useEffect, useRef } from "react";
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
import { Formik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import styles, { COLORS } from "./style/RegisterScreen.styles";

// Validation schema with required address
const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Phone number is too short")
    .required("Phone number is required"),
  address: Yup.string().required("Address is required") // Changed to required
});

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { loading, error, success } = useSelector((state) => state.userRegister);
  const formikRef = useRef(null);

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

  // Handle success message and navigation
  useEffect(() => {
    if (success) {
  
      navigation.navigate("Login", { fromRegister: true });
    }
  }, [success, navigation]);

  // Handle error message
  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: error,
        visibilityTime: 3000,
      });
    }
  }, [error]);

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
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to take photo',
      });
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
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to select image',
      });
    }
  };

  // Function to handle registration
  const handleRegister = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("address", values.address);

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

            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                phoneNumber: "",
                address: ""
              }}
              validationSchema={RegisterSchema}
              onSubmit={handleRegister}
              innerRef={formikRef}
              validateOnBlur={true}
              validateOnChange={false}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <>
                  {/* Input Fields with Icons */}
                  <View style={[
                    styles.inputContainer,
                    touched.name && errors.name && styles.inputError
                  ]}>
                    <Ionicons 
                      name="person-outline" 
                      size={20} 
                      color={touched.name && errors.name ? '#FF3B30' : COLORS.darkPurple} 
                      style={styles.inputIcon} 
                    />
                    <TextInput 
                      placeholder="Full Name" 
                      value={values.name} 
                      onChangeText={handleChange('name')} 
                      onBlur={handleBlur('name')}
                      style={styles.input} 
                      placeholderTextColor={touched.name && errors.name ? '#FF3B30' : '#999'}
                    />
                  </View>
                  {touched.name && errors.name && (
                    <Text style={styles.errorText}>{errors.name}</Text>
                  )}
                  
                  <View style={[
                    styles.inputContainer,
                    touched.email && errors.email && styles.inputError
                  ]}>
                    <Ionicons 
                      name="mail-outline" 
                      size={20} 
                      color={touched.email && errors.email ? '#FF3B30' : COLORS.darkPurple} 
                      style={styles.inputIcon} 
                    />
                    <TextInput 
                      placeholder="Email Address" 
                      keyboardType="email-address" 
                      value={values.email} 
                      onChangeText={handleChange('email')} 
                      onBlur={handleBlur('email')}
                      style={styles.input} 
                      autoCapitalize="none"
                      placeholderTextColor={touched.email && errors.email ? '#FF3B30' : '#999'}
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                  
                  <View style={[
                    styles.inputContainer,
                    touched.password && errors.password && styles.inputError
                  ]}>
                    <Ionicons 
                      name="lock-closed-outline" 
                      size={20} 
                      color={touched.password && errors.password ? '#FF3B30' : COLORS.darkPurple} 
                      style={styles.inputIcon} 
                    />
                    <TextInput 
                      placeholder="Password" 
                      secureTextEntry={!showPassword} 
                      value={values.password} 
                      onChangeText={handleChange('password')} 
                      onBlur={handleBlur('password')}
                      style={styles.input} 
                      placeholderTextColor={touched.password && errors.password ? '#FF3B30' : '#999'}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color={touched.password && errors.password ? '#FF3B30' : '#999'}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                  
                  <View style={[
                    styles.inputContainer,
                    touched.phoneNumber && errors.phoneNumber && styles.inputError
                  ]}>
                    <Ionicons 
                      name="call-outline" 
                      size={20} 
                      color={touched.phoneNumber && errors.phoneNumber ? '#FF3B30' : COLORS.darkPurple} 
                      style={styles.inputIcon} 
                    />
                    <TextInput 
                      placeholder="Phone Number" 
                      keyboardType="phone-pad" 
                      value={values.phoneNumber} 
                      onChangeText={handleChange('phoneNumber')} 
                      onBlur={handleBlur('phoneNumber')}
                      style={styles.input} 
                      placeholderTextColor={touched.phoneNumber && errors.phoneNumber ? '#FF3B30' : '#999'}
                    />
                  </View>
                  {touched.phoneNumber && errors.phoneNumber && (
                    <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                  )}
                  
                  <View style={[
                    styles.inputContainer,
                    touched.address && errors.address && styles.inputError
                  ]}>
                    <Ionicons 
                      name="home-outline" 
                      size={20} 
                      color={touched.address && errors.address ? '#FF3B30' : COLORS.darkPurple} 
                      style={styles.inputIcon} 
                    />
                    <TextInput 
                      placeholder="Address" 
                      value={values.address} 
                      onChangeText={handleChange('address')} 
                      onBlur={handleBlur('address')}
                      style={[styles.input, styles.addressInput]} 
                      placeholderTextColor={touched.address && errors.address ? '#FF3B30' : '#999'}
                    />
                  </View>
                  {touched.address && errors.address && (
                    <Text style={styles.errorText}>{errors.address}</Text>
                  )}

                  {/* Register Button */}
                  <TouchableOpacity onPress={handleSubmit} style={styles.button} disabled={loading}>
                    {loading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.buttonText}>Create Account</Text>
                    )}
                  </TouchableOpacity>
                </>
              )}
            </Formik>

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

      <Toast />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;