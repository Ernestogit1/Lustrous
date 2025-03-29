import { StyleSheet } from "react-native";

export const COLORS = {
  darkPurple: "#6B3FA0",
  mediumPurple: "#9B7FD1",
  lightPurple: "#C9B8E8",
  lightPink: "#F9F1FD",
  mediumPink: "#F2D7ED",
  gray: "#555",
  white: "#fff",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightPink,
    padding: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightPink,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: COLORS.darkPurple,
  },
  detailsContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: COLORS.gray,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.lightPurple,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: COLORS.darkPurple,
    marginBottom: 16,
  },
});

export default styles;