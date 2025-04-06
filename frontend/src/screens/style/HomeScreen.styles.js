import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const COLORS = {
  lightPink: '#FFE6E6',
  mediumPink: '#E1AFD1',
  lightPurple: '#AD88C6',
  darkPurple: '#7469B6',
  white: '#FFFFFF',
  gray: '#555',
};

export { COLORS };

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,       
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightPink,
    marginTop: 30,
    backgroundColor: COLORS.lightPink,
  },
  headerLeft: {
    justifyContent: 'center',
  },
  headerLogo: {
    width: 120,
    height: 30,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 18,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: COLORS.lightPurple,
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
  },
  heroSection: {
    height: 480,
    overflow: 'hidden',
    position: 'relative',
  },
  heroSlide: {
    width,
    height: 480,
  },
  heroBackground: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  heroTextContainer: {
    width: '90%',
    alignItems: 'center',
  },
  carouselIndicators: {
    position: 'absolute',
    bottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    margin: 3,
  },
  indicatorActive: {
    backgroundColor: COLORS.darkPurple,
    width: 12,
  },
  heroEyebrow: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    backgroundColor: COLORS.darkPurple,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 16,
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: COLORS.darkPurple,
    textAlign: 'center',
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#333',
    textAlign: 'center',
    marginBottom: 32,
  },
  heroButton: {
    backgroundColor: COLORS.darkPurple,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 1,
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
  sectionContainer: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: COLORS.darkPurple,
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: COLORS.lightPurple,
  },
  productScroll: {
    paddingRight: 16,
  },
  productCard: {
    width: width * 0.45,
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  productImageContainer: {
    position: 'relative',
    width: '100%',
    height: 180, // Explicitly set height
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
  },
  
  // Add this style for the product image
  productImage: {
    width: '100%', 
    height: '100%',
    borderRadius: 8,
  },
  productImagePlaceholder: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
  },
  productGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: COLORS.darkPurple,
    opacity: 0.6,
    fontFamily: 'Poppins-Medium',
  },
  productBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: COLORS.lightPurple,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  productBadgeText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'white',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  productName: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 2,
  },
  productDescription: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: COLORS.darkPurple,
  },
  addToCartButton: {
    backgroundColor: COLORS.lightPurple,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  benefitsSection: {
    padding: 20,
    backgroundColor: COLORS.lightPink,
    marginVertical: 10,
  },
  benefitCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  benefitItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 4,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  benefitIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.lightPink,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconPlaceholder: {
    fontSize: 24,
  },
  benefitTitle: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 5,
    color: COLORS.darkPurple,
    textAlign: 'center',
  },
  benefitText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    color: '#666',
  },
  newArrivalsGrid: {
    flexDirection: 'column',
  },
  newArrivalCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  newArrivalImage: {
    width: '40%',
    height: 120,
  },
  newArrivalGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newArrivalContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  newArrivalTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 4,
  },
  newArrivalSubtitle: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginBottom: 10,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: COLORS.lightPurple,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  outlineButtonText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: COLORS.lightPurple,
  },
  ctaSection: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  ctaGradient: {
    padding: 30,
    alignItems: 'center',
    borderRadius: 16,
  },
  ctaTitle: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: '#FFF',
    marginBottom: 10,
  },
  ctaText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.9,
  },
  ctaButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 30,
  },
  ctaButtonText: {
    color: COLORS.darkPurple,
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  footer: {
    padding: 30,
    alignItems: 'center',
    backgroundColor: COLORS.lightPink,
  },
  footerLogo: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: COLORS.darkPurple,
    marginBottom: 16,
  },
  footerLinks: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  footerLink: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#333',
    marginHorizontal: 10,
  },
  socialLinks: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  socialIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  footerText: {
    color: '#888',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  // Add these styles for the search bar
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 100,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginTop: 15,        // Add space between navbar and search bar
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

// Improved no products styling
noProductsContainer: {
  width: '100%',
  paddingHorizontal: 20,
  paddingVertical: 30,
  alignItems: 'center',
  justifyContent: 'center',
},

noProductsText: {
  marginTop: 10,
  fontSize: 16,
  fontFamily: 'Poppins-Regular',
  color: COLORS.gray,
  textAlign: 'center',
},
});