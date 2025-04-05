import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const COLORS = {
  darkPurple: '#6B3FA0',
  mediumPurple: '#9B7FD1',
  lightPurple: '#C9B8E8', 
  lightPink: '#F9F1FD',
  mediumPink: '#F2D7ED',
  gray: "#555",
  white: "#fff",
};

export default StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.lightPurple,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  userInfoContainer: {
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: COLORS.darkPurple,
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: 'white',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  logoutText: {
    color: COLORS.darkPurple,
    fontFamily: 'Poppins-Bold',
  },
  section: {
    marginVertical: 16,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: COLORS.darkPurple,
  },
  loaderContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  noProductsText: {
    textAlign: 'center',
    padding: 20,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  
  gridProductCard: {
    width: (width / 2) - 20,
    marginHorizontal: 4,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  
  gridProductImageContainer: {
    height: 150,
    width: '100%',
  },
  
  gridProductImage: {
    width: '100%',
    height: '100%',
  },
  
  gridProductImagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  placeholderText: {
    color: COLORS.darkPurple,
    fontFamily: 'Poppins-Medium',
  },
  
  gridProductContent: {
    padding: 10,
  },
  
  gridProductName: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 4,
  },
  
  gridProductPrice: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: COLORS.darkPurple,
    marginBottom: 8,
  },
  
  // Add to Cart button
  addToCartButton: {
    backgroundColor: COLORS.darkPurple,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  
  addToCartText: {
    color: 'white',
    marginLeft: 4,
    fontSize: 12,
    fontFamily: 'Poppins-Medium'
  },
  categoriesContainer: {
    marginVertical: 16,
  },
  categoriesScrollView: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  categoryBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: COLORS.lightPink,
  },
  categoryBtnActive: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: COLORS.darkPurple,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: COLORS.darkPurple,
  },
  categoryTextActive: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: 'white',
  },
  carouselContainer: {
    height: 170,
    marginBottom: 20, 
  },
  carouselImage: {
    width: Dimensions.get("window").width, 
    height: "100%", 
    resizeMode: "cover", 
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 100,
    paddingHorizontal: 10,
    marginBottom: 15,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '90%',
    alignSelf: 'center',
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
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Translucent grey overlay
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8, // Match the image container border radius
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

