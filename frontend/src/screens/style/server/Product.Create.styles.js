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
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  
  header: {
    marginBottom: 24,
  },
  
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: COLORS.grayDark,
    marginBottom: 6,
  },
  
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: COLORS.grayMedium,
  },
  
  formSection: {
    marginBottom: 24,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.primary,
    marginBottom: 16,
  },
  
  sectionSubtitle: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: COLORS.grayMedium,
    marginBottom: 12,
  },
  
  input: {
    marginBottom: 10,
    backgroundColor: COLORS.white,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  
  textArea: {
    minHeight: 100,
  },
  
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  halfColumn: {
    width: '48%',
  },
  dropdownPlaceholder: {
    fontSize: 14,
    color: COLORS.grayMedium, 
    fontFamily: 'Poppins-Regular',
  },
  
  dropdownSelectedText: {
    fontSize: 14, 
    color: COLORS.black,
    fontFamily: 'Poppins-Regular',
  },
  dropdown: {
    height: 56,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    borderRadius: 4,
    paddingHorizontal: 12,
    marginBottom: 10,
    backgroundColor: COLORS.white,
  },
  
  errorBorder: {
    borderColor: COLORS.error,
  },
  
  dropdownPlaceholder: {
    fontSize: 14,
    color: COLORS.grayMedium,
    fontFamily: 'Poppins-Regular',
  },
  
  dropdownSelectedText: {
    fontSize: 14,
    color: COLORS.black,
    fontFamily: 'Poppins-Regular',
  },
  
  dropdownContainer: {
    borderRadius: 4,
    marginTop: 8,
  },
  
  imageButtonsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  
  imageButtonText: {
    marginLeft: 8,
    color: COLORS.primary,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  
  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  
  imageWrapper: {
    position: 'relative',
    margin: 4,
  },
  
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  
  emptyImageSlot: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.grayLight,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
  },
  
  removeIcon: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: COLORS.error,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  
  submitButton: {
    marginTop: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  
  submitButtonContent: {
    paddingVertical: 6,
  },
  
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  
  errorText: {
    color: COLORS.error,
    marginLeft: 8,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    flex: 1,
  },
  helperText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    marginTop: -6,
    marginBottom: 8,
  },
});

export default styles;