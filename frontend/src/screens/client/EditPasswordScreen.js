import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../redux/actions/user.Actions"; // Import the changePassword action
import { logoutUser } from "../../redux/actions/auth.Actions"; // Import the logoutUser action
import styles from "../style/client/EditPasswordScreen.styles"; // Import styles

const EditPasswordScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.changePassword); // Access loading state from Redux

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New password and confirmation do not match.");
      return;
    }

    try {
      // Dispatch the changePassword action
      await dispatch(changePassword(currentPassword, newPassword));
      Alert.alert("Success", "Password changed successfully. Please log in again.");

      // Log the user out
      dispatch(logoutUser());
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to change password.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Change Password</Text>

      <Text style={styles.label}>Current Password</Text>
      <TextInput
        style={styles.input}
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
        placeholder="Enter your current password"
      />

      <Text style={styles.label}>New Password</Text>
      <TextInput
        style={styles.input}
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        placeholder="Enter your new password"
      />

      <Text style={styles.label}>Confirm New Password</Text>
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        placeholder="Confirm your new password"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
        <Text style={styles.saveButtonText}>{loading ? "Saving..." : "Save"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditPasswordScreen;