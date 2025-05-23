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
  error: "#E53935",
  lightRed: "#FFEBEE",
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
  },
  
  loaderText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.gray,
    fontFamily: 'Poppins-Regular',
  },
  
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  
  emptyText: {
    fontSize: 18,
    color: COLORS.gray,
    marginTop: 16,
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
    backgroundColor: COLORS.lightRed,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  
  statusText: {
    color: COLORS.error,
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
  
  productItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  
  productImage: {
    width: 60,
    height: 60,
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
  },
  
  productPrice: {
    fontSize: 14,
    color: COLORS.error,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
  
  productQuantity: {
    fontSize: 14,
    color: COLORS.gray,
    fontFamily: 'Poppins-Regular',
  },
  
  orderSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  totalItems: {
    fontSize: 14,
    color: COLORS.gray,
    fontFamily: 'Poppins-Regular',
  },
  
  totalAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.error,
    fontFamily: 'Poppins-SemiBold',
  },
  
  detailsButton: {
    backgroundColor: COLORS.error,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginTop: 8,
  },
  
  detailsButtonText: {
    color: COLORS.white,
    fontWeight: '500',
    marginLeft: 6,
    fontFamily: 'Poppins-Medium',
  },
  missingImageContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  
  unavailableProductText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
  },
});

export default styles;