import { StyleSheet } from 'react-native';

export const COLORS = {
  darkPurple: "#6B3FA0",
  mediumPurple: "#9B7FD1",
  lightPurple: "#C9B8E8",
  lightPink: "#F9F1FD",
  mediumPink: "#F2D7ED",
  gray: "#555",
  mediumGray: "#B0B0B0",
  lightGray: "#F5F7FA",
  white: "#fff",
  red: "#FF4D4D",
  black: "#000",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.lightPink,
  },
  title: {
    fontSize: 24,
    marginBottom: 15,
    fontWeight: 'bold',
    color: COLORS.darkPurple,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    marginBottom: 12,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
    color: COLORS.gray,
    fontFamily: 'Poppins-Regular',
  },
  price: {
    color: COLORS.mediumPurple,
    marginBottom: 6,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  qtyButton: {
    backgroundColor: COLORS.darkPurple,
    padding: 8,
    borderRadius: 5,
  },
  qtyText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.gray,
    fontFamily: 'Poppins-Regular',
  },
  disabledButton: {
    backgroundColor: COLORS.mediumPink,
  },
  deleteButton: {
    backgroundColor: COLORS.red,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: 70,
    height: '92%',
  },
  error: {
    color: COLORS.gray,
    marginTop: 15,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  empty: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18,
    color: COLORS.gray,
    fontFamily: 'Poppins-Regular',
  },
  emptyIcon: {
    color: COLORS.mediumPurple,
  },
  loadingColor: {
    color: COLORS.darkPurple,
  },
  subtotalContainer: {
    backgroundColor: COLORS.lightGray,
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  subtotalText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: COLORS.gray,
  },
  subtotalTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.black,
  },
  subtotalDivider: {
    height: 1,
    backgroundColor: COLORS.mediumGray,
    marginVertical: 10,
  },
  checkoutButton: {
    backgroundColor: COLORS.darkPurple,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  checkoutText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  checkbox: {
    marginRight: 10,
    alignSelf: 'center',
  },
  selectAllButton: {
    backgroundColor: COLORS.mediumPurple,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  selectAllText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },

  missingImageContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  unavailableText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
  },

  subtotalItemDetails: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 8,
  },

  subtotalItemQuantity: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },

  subtotalItemPrice: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#333',
  },

  warningContainer: {
    backgroundColor: '#FFF3CD',
    borderColor: '#FFE58F',
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },

  warningText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#856404',
    marginLeft: 8,
    flex: 1,
  },

  disabledCheckoutButton: {
    backgroundColor: '#cccccc',
  },

  disabledCheckoutText: {
    color: '#666666',
  },
  });

export default styles;