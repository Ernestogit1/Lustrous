import { StyleSheet } from 'react-native';

export const COLORS = {
  primary: "#6B3FA0",
  primaryLight: "#9B7FD1",
  secondary: "#F9F1FD",
  backgroundLight: "#F5F5F8",
  white: "#FFFFFF",
  black: "#000000",
  grayDark: "#444444",
  grayMedium: "#777777",
  grayLight: "#CCCCCC",
  borderColor: "#E0E0E0",
  error: "#E53935",
  success: "#4CAF50",
  info: "#2196F3",
  pending: "#FF9800",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
    padding: 16,
  },
  
  orderHeader: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  
  orderIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  
  orderIdLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: COLORS.grayMedium,
    marginRight: 4,
  },
  
  orderId: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: COLORS.primary,
  },
  
  orderDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: COLORS.grayMedium,
  },
  
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 16,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  
  productDivider: {
    height: 1,
    backgroundColor: COLORS.borderColor,
    marginVertical: 6,
  },
  
  statusText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginLeft: 6,
  },
  
  section: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: COLORS.grayDark,
    marginLeft: 8,
  },
  
  infoContainer: {
    marginBottom: 10,
  },
  
  infoLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: COLORS.grayMedium,
    marginBottom: 2,
  },
  
  infoValue: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: COLORS.grayDark,
  },
  
  productItem: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 8,
    marginBottom: 10,
  },
  
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: COLORS.secondary,
  },
  
  noImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  
  productName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: COLORS.grayDark,
    marginBottom: 4,
  },
  
  productPrice: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 4,
  },
  
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  productQuantity: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.grayMedium,
  },
  
  productSubtotal: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: COLORS.grayDark,
  },
  
  unavailableText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.grayMedium,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  
  emptyListText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.grayMedium,
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 10,
  },
  
  summaryContainer: {
    paddingTop: 8,
    marginBottom: 2,
  },
  
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  
  summaryLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.grayMedium,
  },
  
  summaryValue: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.grayDark,
  },
  
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderColor,
    marginTop: 6,
  },
  
  totalLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: COLORS.grayDark,
  },
  
  totalValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: COLORS.primary,
  },
  
  deliveredContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.success + '15',
    padding: 12,
    borderRadius: 8,
  },
  
  deliveredText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: COLORS.success,
    marginLeft: 8,
  },
  
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
  },
  
  loaderText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: COLORS.grayMedium,
    marginTop: 12,
  },
  
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    padding: 20,
  },
  
  errorText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: COLORS.error,
    textAlign: 'center',
    marginTop: 12,
  },
  
  emptyText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: COLORS.grayMedium,
    textAlign: 'center',
    marginTop: 12,
  },
});

export default styles;