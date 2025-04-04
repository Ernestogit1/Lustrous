import { StyleSheet } from "react-native";

export const COLORS = {
  darkPurple: "#6B3FA0",
  mediumPurple: "#9B7FD1",
  lightPurple: "#C9B8E8",
  lightPink: "#F9F1FD",
  mediumPink: "#F2D7ED",
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginBottom: 20,
    padding: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40, 
    backgroundColor: COLORS.mediumPurple, 
  },
  userName: {
    fontSize: 14,
    fontFamily: "Poppins-Bold",
    marginTop: 10,
    color: COLORS.darkPurple,
    textAlign: "center",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.darkPurple,
    padding: 10,
    borderRadius: 5,
    margin: 20,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    marginLeft: 10,
  },
  logoImage: {
    width: 100, 
    height: 50, 
    resizeMode: "contain", 
    marginBottom: 5, 
  },
});

export default styles;