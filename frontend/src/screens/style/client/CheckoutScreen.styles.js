import { StyleSheet } from 'react-native';

export const COLORS = {
  darkPurple: "#6B3FA0",
  mediumPurple: "#9B7FD1",
  lightPurple: "#C9B8E8",
  lightPink: "#F9F1FD",
  mediumPink: "#F2D7ED",
  gray: "#555",
  lightGray: "#F5F5F5",
  mediumGray: "#E0E0E0",
  white: "#FFFFFF",
  black: "#000000",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightPink,
    padding: 15,
  },
  
  contentContainer: {
    paddingBottom: 80, // Add extra padding at the bottom
    flexGrow: 1, // Allows the content to grow and be scrollable
  },
  
  header: {
    marginBottom: 20,
    paddingVertical: 10,
  },
  
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.darkPurple,
    fontFamily: 'Poppins-Bold',
    marginBottom: 4,
  },
  
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.gray,
    fontFamily: 'Poppins-Regular',
  },
  
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.mediumGray,
  },
  
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 8,
    color: COLORS.darkPurple,
    fontFamily: 'Poppins-SemiBold',
  },
  
  iconColor: {
    color: COLORS.darkPurple,
  },
  
  cardBody: {
    padding: 15,
  },
  
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    width: 70,
    color: COLORS.gray,
  },
  
  infoValue: {
    fontSize: 14,
    flex: 1,
    color: COLORS.black,
    fontFamily: 'Poppins-Regular',
  },
  
  productCard: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 15,
  },
  
  productDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
    fontFamily: 'Poppins-Medium',
    marginBottom: 4,
  },
  
  productPrice: {
    fontSize: 14,
    color: COLORS.mediumPurple,
    fontFamily: 'Poppins-Regular',
  },
  
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  
  quantityText: {
    fontSize: 14,
    color: COLORS.gray,
    fontFamily: 'Poppins-Regular',
  },
  
  itemTotal: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.darkPurple,
    fontFamily: 'Poppins-SemiBold',
  },
  
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  
  summaryLabel: {
    fontSize: 14,
    color: COLORS.gray,
    fontFamily: 'Poppins-Regular',
  },
  
  summaryValue: {
    fontSize: 14,
    color: COLORS.black,
    fontFamily: 'Poppins-Regular',
  },
  
  divider: {
    height: 1,
    backgroundColor: COLORS.mediumGray,
    marginVertical: 10,
  },
  
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  
  grandTotalLabel: {
    fontSize: 16,
    color: COLORS.black,
    fontFamily: 'Poppins-Bold',
  },
  
  grandTotalValue: {
    fontSize: 18,
    color: COLORS.darkPurple,
    fontFamily: 'Poppins-SemiBold',
  },
  
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    padding: 12,
    borderRadius: 10,
  },
  
  paymentText: {
    marginLeft: 10,
    fontSize: 15,
    color: COLORS.gray,
    fontFamily: 'Poppins-Medium',
  },
  
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20, 
    paddingHorizontal: 10,
  },
  
  checkoutButton: {
    backgroundColor: COLORS.darkPurple,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  
  checkoutButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
});

export default styles;