import { StyleSheet, Dimensions } from 'react-native';

export const COLORS = {
  darkPurple: "#6B3FA0",
  mediumPurple: "#9B7FD1",
  lightPurple: "#C9B8E8",
  lightPink: "#F9F1FD",
  mediumPink: "#F2D7ED",
  gray: "#555",
  white: "#fff",
};

const { width } = Dimensions.get('window');
const cardWidth = (width - 50) / 2; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white,
  },
  filterContainer: {
    marginBottom: 15,
  },
  filterLabel: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: COLORS.gray,
    marginBottom: 10,
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 120,
    backgroundColor: COLORS.lightPurple,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: COLORS.darkPurple,
  },
  filterButtonText: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: COLORS.gray,
  },
  filterButtonTextActive: {
    color: COLORS.white,
  },
  productsGrid: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  gridProductCard: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width: cardWidth,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gridProductImageContainer: {
    width: '100%',
    height: 150,
    backgroundColor: COLORS.mediumPink,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridProductImage: {
    width: '100%',
    height: '100%',
  },
  gridProductContent: {
    padding: 10,
  },
  gridProductName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray,
    fontFamily: 'Poppins-Regular',
    marginBottom: 5,
  },
  gridProductPrice: {
    fontSize: 14,
    color: COLORS.mediumPurple,
    fontFamily: 'Poppins-Medium',
    marginBottom: 10,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.darkPurple,
    paddingVertical: 8,
    borderRadius: 5,
  },
  addToCartText: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginLeft: 5,
  },
  error: {
    color: COLORS.gray,
    marginTop: 15,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 100,
    paddingHorizontal: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: COLORS.gray,
  },
  filterContainer: {
    marginBottom: 15,
  },
  filterLabel: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: COLORS.gray,
    marginBottom: 10,
  },
  priceRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: COLORS.gray,
    marginHorizontal: 5,
    height: 40,
    width: 40,
  },
  priceRangeSeparator: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: COLORS.gray,
  },
  filterButton: {
    backgroundColor: COLORS.darkPurple,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    height: 40,
  },
  filterButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  clearButton: {
    backgroundColor: COLORS.lightPurple, 
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    height: 40,
    marginLeft: 10, 
  },
  clearButtonText: {
    color: COLORS.darkPurple, 
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  outOfStockText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    textTransform: 'uppercase',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    overflow: 'hidden',
  },
  
  disabledAddToCartButton: {
    backgroundColor: '#AAAAAA',
    opacity: 0.8,
  },
});

export default styles;