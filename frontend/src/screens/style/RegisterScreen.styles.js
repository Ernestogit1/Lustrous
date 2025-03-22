import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const COLORS = {
  lightPink: '#FFE6E6',
  mediumPink: '#E1AFD1',
  lightPurple: '#AD88C6',
  darkPurple: '#7469B6',
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gradientBackground: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 45,
    paddingBottom: 2,
  },
  backButton: {
    padding: 8,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  formContainer: {
    marginTop: 2,
  },
  title: {
    fontSize: 26,
    color: COLORS.darkPurple,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  avatarContainer: {
    alignSelf: 'center',
    position: 'relative',
    marginBottom: 8,
    fontFamily: 'Poppins-SemiBold'
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: COLORS.mediumPink,
  },
  avatarPlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: COLORS.lightPink,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.mediumPink,
    borderStyle: 'dashed',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: COLORS.darkPurple,
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  avatarHelperText: {
    textAlign: 'center',
    fontSize: 11,
    color: '#666',
    marginBottom: 24,
    fontFamily: 'Poppins-Medium',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    minHeight: 56,
    fontFamily: 'Poppins-Medium',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    paddingVertical: 8,
    fontFamily: 'Poppins-Medium',
  },
  eyeIcon: {
    padding: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  button: {
    backgroundColor: COLORS.darkPurple,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#DDD',
  },
  dividerText: {
    paddingHorizontal: 15,
    color: '#666',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold'
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins-Medium',
  },
  loginLink: {
    fontSize: 14,
    color: COLORS.darkPurple,
    marginLeft: 6,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
  addressInput: {
    textAlignVertical: 'top',
    height: 50,
    paddingTop: 12,
  },
});