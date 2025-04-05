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
    paddingTop: 8,
  },
  card: {
    backgroundColor: COLORS.white,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: COLORS.grayDark,
    marginLeft: 6,
  },
  orderDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: COLORS.grayMedium,
  },
  orderInfo: {
    marginBottom: 14,
  },
  infoRow: {
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
  orderAddress: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: COLORS.grayDark,
    marginLeft: 8,
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderColor,
    marginVertical: 12,
  },
  productListHeader: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: COLORS.grayDark,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 8,
    padding: 8,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 12,
    borderRadius: 8,
  },
  noImageContainer: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  productInfoContainer: {
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
  statusBtn: {
    marginTop: 14,
    borderRadius: 8,
    borderWidth: 1.5,
  },
  statusBtnLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  menuItemTitle: {
    fontFamily: 'Poppins-Regular',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontFamily: 'Poppins-Regular',
    color: COLORS.grayMedium,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    marginTop: 16,
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: COLORS.grayDark,
  }
});

export default styles;