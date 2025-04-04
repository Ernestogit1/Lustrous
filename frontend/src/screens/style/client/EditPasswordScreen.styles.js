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
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: COLORS.lightPink,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: COLORS.darkPurple,
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: COLORS.gray,
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: COLORS.mediumPurple,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: COLORS.black,
    marginBottom: 15,
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  saveButton: {
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
  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
});

export default styles;