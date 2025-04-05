import { StyleSheet } from 'react-native';

export const COLORS = {
  primary: '#6200ee',
  primaryLight: '#9e47ff',
  secondary: '#f5f0ff',
  white: '#ffffff',
  textPrimary: '#333333',
  textSecondary: '#666666',
  lightGray: '#cccccc',
  borderColor: '#e0e0e0',
  gold: '#ffd700',
  placeholderText: '#aaaaaa',
};

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  headerText: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: COLORS.textPrimary,
    marginLeft: -4,
  },
  
  orderIdText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
    fontFamily: 'Poppins-Regular',
  },
  
  divider: {
    height: 1,
    backgroundColor: COLORS.borderColor,
    marginVertical: 16,
  },
  
  label: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  
  stars: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  
  starButton: {
    padding: 4,
  },
  
  ratingText: {
    textAlign: 'center',
    color: COLORS.primary,
    fontFamily: 'Poppins-Medium',
    marginTop: 8,
    fontSize: 14,
  },
  
  input: {
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    padding: 16,
    borderRadius: 8,
    minHeight: 120,
    backgroundColor: COLORS.secondary,
    color: COLORS.textPrimary,
    fontFamily: 'Poppins-Regular',
    textAlignVertical: 'top',
  },
  
  charCount: {
    alignSelf: 'flex-end',
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 8,
    fontFamily: 'Poppins-Regular',
  },
  
  button: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  buttonDisabled: {
    backgroundColor: COLORS.lightGray,
    opacity: 0.7,
  },
  
  buttonIcon: {
    marginRight: 8,
  },
  
  buttonText: {
    color: COLORS.white,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  
  cancelButton: {
    padding: 12,
    marginTop: 12,
    alignItems: 'center',
  },
  
  cancelButtonText: {
    color: COLORS.textSecondary,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  
  infoContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'flex-start',
  },
  
  infoText: {
    color: COLORS.textSecondary,
    marginLeft: 8,
    flex: 1,
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    lineHeight: 18,
  },
});