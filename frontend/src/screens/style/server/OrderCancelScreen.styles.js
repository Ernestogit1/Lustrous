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
  errorLight: "#FFEBEE",
  errorBorder: "#FFCDD2",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  
  header: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,
  },
  
  headerTitle: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: COLORS.grayDark,
  },
  
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: COLORS.grayMedium,
  },
  
  listContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  
  card: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.grayLight,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  orderIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  orderIdLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: COLORS.grayMedium,
    marginRight: 4,
  },
  
  orderId: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
    color: COLORS.grayDark,
  },
  
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: COLORS.errorLight,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.errorBorder,
  },
  
  statusText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: COLORS.error,
    marginLeft: 4,
  },
  
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  userName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: COLORS.grayDark,
    marginLeft: 8,
    flex: 1,
  },
  
  orderDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: COLORS.grayMedium,
  },
  
  divider: {
    height: 1,
    backgroundColor: COLORS.grayLight,
    marginVertical: 12,
  },
  
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: COLORS.grayDark,
    marginBottom: 10,
  },
  
  productsContainer: {
    marginBottom: 8,
  },
  
  productRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
  },
  
  productImage: {
    width: 60,
    height: 60,
    marginRight: 12,
    borderRadius: 6,
    backgroundColor: COLORS.secondary,
  },
  
  noImageContainer: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  
  productName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: COLORS.grayDark,
    marginBottom: 4,
  },
  
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  productPrice: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: COLORS.primary,
  },
  
  productQuantity: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: COLORS.grayMedium,
  },
  
  unavailableText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.grayMedium,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  
  orderSummary: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 12,
  },
  
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
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
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderColor,
    marginTop: 6,
  },
  
  totalLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: COLORS.grayDark,
  },
  
  totalValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    color: COLORS.primary,
  },
  
  cancellationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    justifyContent: 'flex-end',
  },
  
  cancellationText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: COLORS.grayMedium,
    marginLeft: 6,
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
  },
  
  loadingText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: COLORS.grayMedium,
    marginTop: 12,
  },
  
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    padding: 20,
  },
  
  emptyTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: COLORS.grayDark,
    marginTop: 16,
    marginBottom: 8,
  },
  
  emptySubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.grayMedium,
    textAlign: 'center',
  },
});

export default styles;