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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
    padding: 16,
  },
  
  header: {
    marginBottom: 20,
  },
  
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: COLORS.grayDark,
    marginBottom: 4,
  },
  
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: COLORS.grayMedium,
  },
  
  listContainer: {
    paddingBottom: 20,
  },
  
  row: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  
  imageCell: {
    width: 70,
    height: 70,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  
  noImageContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  
  nameText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.grayDark,
    marginBottom: 2,
  },
  
  categoryText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: COLORS.primary,
    marginBottom: 4,
  },
  
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  
  priceText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: COLORS.grayDark,
    marginRight: 12,
  },
  
  stockText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: COLORS.grayMedium,
  },
  
  descriptionText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: COLORS.grayMedium,
    maxWidth: '100%',
  },
  
  actionContainer: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  restoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.success,
    marginBottom: 8,
    width: '100%',
  },
  
  restoreText: {
    color: COLORS.success,
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginLeft: 4,
  },
  
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.error,
    width: '100%',
  },
  
  deleteText: {
    color: COLORS.error,
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginLeft: 4,
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
  
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  
  errorText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.error,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  
  retryButton: {
    borderColor: COLORS.primary,
    marginTop: 12,
  },
  
  retryButtonLabel: {
    color: COLORS.primary,
    fontFamily: 'Poppins-Medium',
  },
  
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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