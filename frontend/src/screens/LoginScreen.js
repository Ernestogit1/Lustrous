import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/auth.Actions";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";
import { Formik } from "formik";
import * as Yup from "yup";

import styles, { COLORS } from "./style/LoginScreen.styles";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();

  const navigation = useNavigation();
  const { loading, error, userInfo } = useSelector((state) => state.userLogin);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(false);
  
  // Create a ref to store the formik setErrors function
  const formikRef = useRef(null);

  // Create a dynamic schema that can respond to authentication errors
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Email required")
      .test('auth-error', 'Username and password is wrong', function() {
        return !authError;
      }),
    password: Yup.string()
      .min(6, "Min 6 characters")
      .required("Password required")
      .test('auth-error', 'Username and password is wrong', function() {
        return !authError;
      })
  });

  // Redirect after successful login
  useEffect(() => {
    if (userInfo) {
      setAuthError(false);
      navigation.reset({
        index: 0,
        routes: [{ name: "UserHome" }], 
      });
    }
  }, [userInfo]);
  
  // Handle error changes outside of Formik render function
  useEffect(() => {
    if (error) {
      setAuthError(true);
      
      // Set formik errors if the ref is available, but only for password
      if (formikRef.current && formikRef.current.setErrors) {
        formikRef.current.setErrors({
          password: 'Username and password is wrong'
        });
      }
      
      Toast.show({ 
        type: 'error', 
        text1: 'Login Failed', 
        text2: 'Username and password is wrong' 
      });
    }
  }, [error]);


  useEffect(() => {
    if (route.params?.fromRegister) {
      setTimeout(() => {
        Toast.show({
          type: 'success',
          text1: 'Registration Successful!',
          text2: 'You can now log in to your account',
          visibilityTime: 3000,
        });
      }, 300);
      
      navigation.setParams({ fromRegister: undefined });
    }
  }, [route.params?.fromRegister]);

  const handleSubmit = (values) => {
    setAuthError(false);
    dispatch(loginUser(values.email, values.password));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LinearGradient colors={[COLORS.lightPink, "#FFF"]} style={styles.gradientBackground}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.darkPurple} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.welcomeText}>Sign in to access your account</Text>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            validateOnChange={false}
            validateOnBlur={true}
            onSubmit={handleSubmit}
            innerRef={formikRef} // Store reference to formik
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
                {/* Input Fields with Icons */}
                <View style={[
                  styles.inputContainer, 
                  (authError || errors.email) && styles.inputError
                ]}>
                  <Ionicons 
                    name="mail-outline" 
                    size={20} 
                    color={(authError || errors.email) ? '#FF3B30' : COLORS.darkPurple} 
                    style={styles.inputIcon} 
                  />
                  <TextInput
                    placeholder="Email Address"
                    keyboardType="email-address"
                    value={values.email}
                    onChangeText={(text) => {
                      handleChange('email')(text);
                      if (authError) setAuthError(false); 
                    }}
                    onBlur={handleBlur('email')}
                    style={styles.input}
                    autoCapitalize="none"
                    placeholderTextColor={(authError || errors.email) ? "#FF3B30" : "#999"}
                  />
                </View>
                {(touched.email && errors.email) && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                <View style={[
                  styles.inputContainer, 
                  (authError || errors.password) && styles.inputError
                ]}>
                  <Ionicons 
                    name="lock-closed-outline" 
                    size={20} 
                    color={(authError || errors.password) ? '#FF3B30' : COLORS.darkPurple}
                    style={styles.inputIcon} 
                  />
                  <TextInput
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    value={values.password}
                    onChangeText={(text) => {
                      handleChange('password')(text);
                      if (authError) setAuthError(false);
                    }}
                    onBlur={handleBlur('password')}
                    style={styles.input}
                    placeholderTextColor={(authError || errors.password) ? "#FF3B30" : "#999"}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color={(authError || errors.password) ? "#FF3B30" : "#999"}
                    />
                  </TouchableOpacity>
                </View>
                {(touched.password && errors.password) && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                {/* Login Button */}
                <TouchableOpacity onPress={handleSubmit} style={styles.button} disabled={loading}>
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Sign In</Text>
                  )}
                </TouchableOpacity>
              </>
            )}
          </Formik>

          {/* Rest of your component... */}
        </ScrollView>
      </LinearGradient>
      
      <Toast />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;