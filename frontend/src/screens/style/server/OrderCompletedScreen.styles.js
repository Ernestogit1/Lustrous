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
  success: "#4CAF50",
  error: "#E53935",
  info: "#2196F3",
  warning: "#FF9800",
  pending: "#FF9800",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  
  header: {
    padding: 16,
    backgroundColor: COLORS.white,
    marginBottom: 8,
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
    borderRadius: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 16,
    padding: 16,
  },
  
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,
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
    color: COLORS.primary,
  },
  
  orderDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: COLORS.grayMedium,
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
  },
  
  orderDetailsContainer: {
    marginBottom: 14,
  },
  
  orderInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  
  orderTotal: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: COLORS.grayDark,
    marginLeft: 8,
  },
  
  shippingAddress: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.grayDark,
    marginLeft: 8,
    flex: 1,
  },
  
  divider: {
    height: 1,
    backgroundColor: COLORS.borderColor,
    marginBottom: 12,
  },
  
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: COLORS.grayDark,
    marginBottom: 10,
  },
  
  productsContainer: {
    marginBottom: 12,
  },
  
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: COLORS.secondary,
  },
  
  noImageContainer: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 12,
  },
  
  productInfo: {
    flex: 1,
  },
  
  productName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: COLORS.grayDark,
  },
  
  productQuantity: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: COLORS.grayMedium,
    marginTop: 2,
  },
  
  productPrice: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: COLORS.primary,
    marginTop: 2,
  },
  
  deletedProductText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.grayMedium,
    fontStyle: 'italic',
  },
  
  statusContainer: {
    alignItems: 'flex-end',
  },
  
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.success + '20', // 20% opacity
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  
  statusText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: COLORS.success,
    marginLeft: 6,
  },
  
  deliveredDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.grayMedium,
    marginTop: 4,
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  loadingText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.grayMedium,
    marginTop: 12,
  },
  
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  
  emptyText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: COLORS.grayDark,
    marginTop: 16,
    marginBottom: 8,
  },
  
  emptySubtext: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.grayMedium,
  },
});

export default styles;