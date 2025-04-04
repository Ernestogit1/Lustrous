import { StyleSheet } from 'react-native';

export const COLORS = {
  darkPurple: "#6B3FA0",
  mediumPurple: "#9B7FD1",
  lightPurple: "#C9B8E8",
  lightPink: "#F9F1FD",
  mediumPink: "#F2D7ED",
  gray: "#555",
  mediumGray: "#AAAAAA",
  lightGray: "#F5F5F5",
  white: "#FFFFFF",
  black: "#000000",
  success: "#4CAF50",
  error: "#E53935",
  warning: "#FF9800",
  info: "#2196F3",
  lightGreen: "#E8F5E9",
  lightRed: "#FFEBEE",
  lightYellow: "#FFF8E1",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightPink,
    padding: 12,
  },
  
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightPink,
  },
  
  loaderText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.gray,
    fontFamily: 'Poppins-Regular',
  },
  
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
    fontFamily: 'Poppins-SemiBold',
  },
  
  orderDate: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 2,
    fontFamily: 'Poppins-Regular',
  },
  
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  
  statusText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: 12,
  },
  
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkPurple,
    marginLeft: 6,
    fontFamily: 'Poppins-SemiBold',
  },
  
  productItem: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.black,
    marginBottom: 4,
    fontFamily: 'Poppins-Medium',
  },
  
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  
  productPrice: {
    fontSize: 14,
    color: COLORS.mediumPurple,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
  
  productQuantity: {
    fontSize: 14,
    color: COLORS.gray,
    fontFamily: 'Poppins-Regular',
  },
  
  itemTotal: {
    fontSize: 13,
    color: COLORS.darkPurple,
    fontFamily: 'Poppins-Regular',
  },
  
  paymentInfo: {
    marginTop: 5,
  },
  
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  
  paymentLabel: {
    fontSize: 14,
    color: COLORS.gray,
    fontFamily: 'Poppins-Regular',
  },
  
  paymentValue: {
    fontSize: 14,
    color: COLORS.black,
    fontFamily: 'Poppins-Regular',
  },
  
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  
  totalLabel: {
    fontSize: 16,
    color: COLORS.black,
    fontFamily: 'Poppins-Bold',
  },
  
  totalValue: {
    fontSize: 16,
    color: COLORS.darkPurple,
    fontFamily: 'Poppins-SemiBold',
  },
  
  cancelButton: {
    backgroundColor: COLORS.error,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  
  cancelButtonText: {
    color: COLORS.white,
    fontWeight: '500',
    marginLeft: 6,
    fontFamily: 'Poppins-Medium',
  },
});

export default styles;