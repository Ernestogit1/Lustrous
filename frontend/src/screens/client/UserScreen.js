import React from "react";
import { View, Text, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/auth.Actions";

const UserScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userLogin.userInfo);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Welcome, {userInfo?.name}!</Text>
      <Text>Email: {userInfo?.email}</Text>
      <Button title="Logout" onPress={() => dispatch(logoutUser())} />
    </View>
  );
};

export default UserScreen;
