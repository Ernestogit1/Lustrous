import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const COLORS = {
  primary: "#6B3FA0",
  primaryLight: "#9B7FD1",
  secondary: "#F9F1FD",
  backgroundLight: "#F9F9F9",
  white: "#FFFFFF",
  black: "#000000",
  grayDark: "#444444",
  grayMedium: "#777777",
  grayLight: "#CCCCCC", 
  borderColor: "#E0E0E0",
  error: "#E53935",
  success: "#4CAF50",
  warning: "#FF9800",
  info: "#2196F3",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,
  },
  
  pageTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.grayDark,
  },
  
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  
  addButtonText: {
    color: COLORS.white,
    marginLeft: 3,
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
  },
  
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,
    flexWrap: 'wrap',
  },
  
  sortLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginRight: 8,
    color: COLORS.grayMedium,
  },
  
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: COLORS.secondary,
    marginRight: 8,
    marginBottom: 5,
    marginTop: 5,
  },
  
  sortButtonActive: {
    backgroundColor: COLORS.primary,
  },
  
  sortButtonText: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: COLORS.primary,
  },
  
  sortButtonTextActive: {
    color: COLORS.white,
  },
  
  sortIcon: {
    marginLeft: 3,
  },
  
  listContainer: {
    padding: 12,
  },
  
  // Product Card Styling
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  
  imageContainer: {
    marginRight: 12,
  },
  
  productImage: {
    width: 75,
    height: 75,
    borderRadius: 8,
    backgroundColor: COLORS.backgroundLight,
  },
  
  placeholderImage: {
    width: 75,
    height: 75,
    borderRadius: 8,
    backgroundColor: COLORS.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  headerInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  
  productName: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.grayDark,
    marginBottom: 5,
  },
  
  productPrice: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: COLORS.primary,
    marginBottom: 5,
  },
  
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  
  categoryBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 11,
    color: COLORS.white,
    fontFamily: 'Poppins-Medium',
    marginRight: 6,
    marginBottom: 5,
  },
  
  stockBadge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
    marginBottom: 5,
  },
  
  stockHigh: {
    backgroundColor: '#E8F5E9',
    color: COLORS.success,
  },
  
  stockMedium: {
    backgroundColor: '#FFF8E1',
    color: COLORS.warning,
  },
  
  stockLow: {
    backgroundColor: '#FFEBEE',
    color: COLORS.error,
  },
  
  description: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: COLORS.grayMedium,
    marginBottom: 14,
    lineHeight: 18,
  },
  
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  
  editButton: {
    backgroundColor: COLORS.primary,
  },
  
  deleteButton: {
    backgroundColor: COLORS.error,
  },
  
  buttonText: {
    color: COLORS.white,
    marginLeft: 4,
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
  },
  
  // Loading and Error States
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  
  loadingText: {
    marginTop: 12,
    color: COLORS.grayMedium,
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
  },
  
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  
  errorText: {
    marginTop: 8,
    color: COLORS.error,
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default styles;