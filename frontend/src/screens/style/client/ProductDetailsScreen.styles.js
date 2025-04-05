import { StyleSheet, Dimensions } from "react-native";

export const COLORS = {
  darkPurple: "#6B3FA0",
  mediumPurple: "#9B7FD1",
  lightPurple: "#C9B8E8",
  lightPink: "#F9F1FD",
  mediumPink: "#F2D7ED",
  gray: "#555",
  white: "#fff",
  gold: "#FFB22C",
  
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
    fontSize: 20,
    fontFamily: "Poppins-Medium",
    color: COLORS.mediumPurple,
  },
  productStock: {
    fontSize: 16,
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

  // Reviews Section
  reviewsContainer: {
    padding: 16,
    marginTop: 8,
    backgroundColor: COLORS.white,
  },

  reviewsTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: COLORS.textDark,
    marginBottom: 16,
  },

  averageRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  averageRating: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginRight: 16,
  },

  averageRatingNumber: {
    fontSize: 36,
    fontFamily: 'Poppins-Bold',
    color: COLORS.textDark,
  },

  averageRatingMaximum: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: COLORS.textSecondary,
    marginLeft: 2,
  },

  overallRating: {
    flex: 1,
  },

  ratingStarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  numericRating: {
    marginLeft: 4,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: COLORS.textDark,
  },

  totalReviews: {
    marginTop: 4,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  ratingBreakdownContainer: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  ratingBreakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  ratingBreakdownLabel: {
    width: 50,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  ratingBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginHorizontal: 8,
    overflow: 'hidden',
  },

  ratingBarFill: {
    height: '100%',
    backgroundColor: COLORS.gold,
  },

  ratingBreakdownCount: {
    width: 30,
    textAlign: 'right',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.textDark,
  },

  filterSortContainer: {
    marginBottom: 16,
  },

  filterScrollView: {
    flexDirection: 'row',
    marginBottom: 12,
  },

  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#f0f0f0',
  },

  activeFilterButton: {
    backgroundColor: COLORS.primary,
  },

  filterButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: COLORS.textDark,
    marginLeft: 4,
  },

  activeFilterButtonText: {
    color: COLORS.white,
  },

  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  sortLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
  },

  sortButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: COLORS.textDark,
    marginRight: 4,
  },

  reviewsList: {
    marginTop: 8,
  },

  reviewItem: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 12,
  },

  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  reviewUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  reviewAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.mediumPurple,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  reviewAvatarText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },

  reviewUserName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: COLORS.textDark,
  },

  reviewDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  reviewComment: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.textDark,
    lineHeight: 20,
  },

  noReviewsContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  noReviewsText: {
    marginTop: 12,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },

  reviewsLoading: {
    padding: 24,
  },

  outOfStockText: {
    color: '#e53935',
  },
  });

export default styles;