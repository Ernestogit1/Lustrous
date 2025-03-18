import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity,
  Image, TextInput, Platform, KeyboardAvoidingView, Alert, ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/actions/user.Actions';

// Same color scheme as HomeScreen
const COLORS = {
  lightPink: '#FFE6E6',
  mediumPink: '#E1AFD1',
  lightPurple: '#AD88C6',
  darkPurple: '#7469B6',
};

const RegisterScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  // Local state for loading and errors
  const [loading, setLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);

  // Form states
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Request permissions for camera and media library
  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(cameraStatus === 'granted');

      const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (mediaStatus !== 'granted') {
        Alert.alert('Permission Required', 'Please allow access to media library for profile photos.');
      }
    })();
  }, []);

  // Clear any errors when component unmounts
  useEffect(() => {
    return () => {
      setRegistrationError(null);
    };
  }, []);

  // Avatar selection methods
  const handleAvatarSelection = () => {
    Alert.alert('Profile Photo', 'Choose a source for your profile photo',
      [
        { text: 'Camera', onPress: takePhoto },
        { text: 'Gallery', onPress: pickImage },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const takePhoto = async () => {
    if (!cameraPermission) {
      Alert.alert('Permission Denied', 'Camera access is required for taking profile photos.');
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      
      if (!result.canceled && result.assets && result.assets[0]) {
        setAvatar(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      
      if (!result.canceled && result.assets && result.assets[0]) {
        setAvatar(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select image');
    }
  };

  // Form validation and submission
  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return false;
    }
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email');
      return false;
    }
    
    if (!password || password.length < 6) {
      Alert.alert('Error', 'Password should be at least 6 characters');
      return false;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    
    if (loading) return;
    
    try {
      setLoading(true);
      setRegistrationError(null);
      
      // Create form data
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      
      // Ensure phone number and address are properly added
      if (phoneNumber && phoneNumber.trim()) {
        formData.append('phoneNumber', phoneNumber.trim());
      }
      
      if (address && address.trim()) {
        formData.append('address', address.trim());
      }
      
      // Add avatar if selected
      if (avatar) {
        const filename = avatar.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : 'image/jpeg';
        
        formData.append('avatar', {
          uri: avatar,
          name: filename,
          type
        });
      }
      
      // Use a promise to capture the response
      const response = await new Promise((resolve, reject) => {
        dispatch(registerUser(formData))
          .then(result => resolve(result))
          .catch(error => reject(error));
      });
      
      // Show success message
      Alert.alert('Success', 'Registration successful!', [
        { text: 'OK', onPress: () => navigation.navigate('Home') }
      ]);
      
    } catch (error) {
      setRegistrationError(error.message || 'Registration failed');
      Alert.alert('Error', error.message || 'Something went wrong during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <LinearGradient colors={[COLORS.lightPink, '#FFF']} style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.darkPurple} />
          </TouchableOpacity>
          <Image source={require('../../assets/lustrous.png')} 
            style={styles.logoImage} resizeMode="contain" />
          <View style={{ width: 24 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Create Account</Text>
            
            {/* Avatar Selection */}
            <TouchableOpacity style={styles.avatarContainer} onPress={handleAvatarSelection}>
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
            <Text style={styles.avatarHelperText}>Tap to add profile photo</Text>

            {/* Form Fields */}
            <InputField
              icon="person-outline"
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
            />
            
            <InputField
              icon="mail-outline"
              placeholder="Email Address"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            
            <InputField
              icon="lock-closed-outline"
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              rightIcon={
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#999"
                  />
                </TouchableOpacity>
              }
            />
            
            <InputField
              icon="lock-closed-outline"
              placeholder="Confirm Password"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              rightIcon={
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Ionicons
                    name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#999"
                  />
                </TouchableOpacity>
              }
            />

            <InputField
              icon="call-outline"
              placeholder="Phone Number (Optional)"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />

            {/* New single address field */}
            <InputField
              icon="home-outline"
              placeholder="Address (Optional)"
              multiline={true}
              numberOfLines={2}
              style={styles.addressInput}
              value={address}
              onChangeText={setAddress}
            />

            {/* Show error message if exists */}
            {registrationError && (
              <Text style={styles.errorText}>{registrationError}</Text>
            )}

            {/* Action Button */}
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={handleRegister}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#FFF" size="small" />
              ) : (
                <Text style={styles.primaryButtonText}>Create Account</Text>
              )}
            </TouchableOpacity>

            {/* Divider with OR */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Login Link */}
            <View style={styles.loginLinkContainer}>
              <Text style={styles.loginText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

// Input Field Component to reduce repetition
const InputField = ({ icon, placeholder, value, onChangeText, rightIcon, style, ...props }) => (
  <View style={styles.inputContainer}>
    <Ionicons name={icon} size={20} color={COLORS.darkPurple} style={styles.inputIcon} />
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      placeholderTextColor="#999"
      value={value}
      onChangeText={onChangeText}
      {...props}
    />
    {rightIcon}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  logoImage: {
    height: 40,
    width: 120,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  formContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 26,
    fontFamily: 'Poppins-Bold',
    color: COLORS.darkPurple,
    marginBottom: 30,
    textAlign: 'center',
  },
  avatarContainer: {
    alignSelf: 'center',
    position: 'relative',
    marginBottom: 8,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: COLORS.mediumPink,
  },
  avatarPlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: COLORS.lightPink,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.mediumPink,
    borderStyle: 'dashed',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: COLORS.darkPurple,
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  avatarHelperText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    minHeight: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#333',
    paddingVertical: 8,
  },
  addressInput: {
    textAlignVertical: 'top',
    height: 80,
    paddingTop: 12,
  },
  eyeIcon: {
    padding: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  primaryButton: {
    backgroundColor: COLORS.darkPurple,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#DDD',
  },
  dividerText: {
    paddingHorizontal: 15,
    color: '#666',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  loginLink: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: COLORS.darkPurple,
    marginLeft: 6,
  },
});

export default RegisterScreen;