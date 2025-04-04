import { StyleSheet } from "react-native";

export const COLORS = {
  darkPurple: "#6B3FA0",
  mediumPurple: "#9B7FD1",
  lightPurple: "#C9B8E8",
  lightPink: "#F9F1FD",
  mediumPink: "#F2D7ED",
  gray: "#555",
  lightGray: "#E0E0E0",
  white: "#fff",
  black: "#000",
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: COLORS.lightPink,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.lightGray,
    borderWidth: 2,
    borderColor: COLORS.mediumPurple,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarPlaceholderText: {
    color: COLORS.gray,
    fontSize: 14,
  },
  formContainer: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: COLORS.gray,
    marginBottom: 5,
  },
  inputContainer: {
    height: 45,
    borderWidth: 1,
    borderColor: COLORS.mediumPurple,
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
    marginBottom: 15,
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: COLORS.black,
  },
  editButton: {
    backgroundColor: COLORS.darkPurple,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  editButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  changePasswordButton: {
    backgroundColor: COLORS.mediumPurple, // Slightly different color for distinction
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15, // Add spacing between buttons
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  changePasswordButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
});

export default styles;