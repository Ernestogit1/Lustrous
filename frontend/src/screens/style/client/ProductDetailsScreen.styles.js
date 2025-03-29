import { StyleSheet, Dimensions } from "react-native";

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
  },
  carouselContainer: {
    marginBottom: 20,
  },
  mainImage: {
    width: Dimensions.get("window").width,
    height: 300,
    resizeMode: "cover",
  },
  thumbnailContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  thumbnailImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: "transparent",
  },
  activeThumbnail: {
    borderColor: COLORS.darkPurple,
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  productName: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: COLORS.darkPurple,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    fontFamily: "Poppins-Medium",
    color: COLORS.mediumPurple,
    marginBottom: 16,
  },
  productDescription: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: COLORS.gray,
    lineHeight: 24,
  },
  priceStockContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    color: COLORS.mediumPurple,
  },
  productStock: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: COLORS.gray,
  },
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.darkPurple,
    paddingVertical: 12,
    borderRadius: 8,
    width: "70%",
    alignSelf: "center",
  },
  addToCartText: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: COLORS.white,
    marginLeft: 8,
  },
});

export default styles;