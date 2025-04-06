import { StyleSheet, Dimensions } from 'react-native';

export const COLORS = {
  darkPurple: "#6B3FA0",
  mediumPurple: "#9B7FD1",
  lightPurple: "#C9B8E8",
  lightPink: "#F9F1FD",
  mediumPink: "#F2D7ED",
  gray: "#555",
  textDark: "#333333",
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
  
  // Products grid
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
  gridProductImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.lightPink,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: COLORS.gray,
    fontFamily: 'Poppins-Regular',
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
  disabledAddToCartButton: {
    backgroundColor: '#AAAAAA',
    opacity: 0.8,
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
  
  allFiltersContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  
  filterHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  filterHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  filterLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: COLORS.darkPurple,
  },
  
  filterIcon: {
    marginLeft: 8,
  },
  
  dropdownContent: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  
  clearFilterButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: COLORS.lightPurple,
  },
  
  clearButtonText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: COLORS.darkPurple,
  },
  
  priceRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  priceInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    paddingHorizontal: 12,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.gray,
  },
  
  priceRangeSeparator: {
    marginHorizontal: 10,
    fontSize: 16,
    color: COLORS.gray,
  },
  
  categoriesContainer: {
    maxHeight: 180,
  },
  
  categoriesContentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 12,
  },
  
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.gray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: COLORS.white,
  },
  
  checkboxChecked: {
    backgroundColor: COLORS.darkPurple,
    borderColor: COLORS.darkPurple,
  },
  
  checkboxLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: COLORS.textDark,
    flex: 1,
  },
  
  // No products state
  noProductsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  
  noProductsText: {
    marginTop: 12,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: COLORS.gray,
    textAlign: 'center',
  },
});

export default styles;