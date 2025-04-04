import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Same color scheme as HomeScreen and RegisterScreen
export const COLORS = {
  lightPink: '#FFE6E6',
  mediumPink: '#E1AFD1',
  lightPurple: '#AD88C6',
  darkPurple: '#7469B6',
  white: "#fff",
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
    paddingTop: 50,
    paddingBottom: 1,
  },
  backButton: {
    padding: 8,
  },
  headerLogo: {
    height: 40,
    width: 120,
  },
  headerRight: {
    width: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    color: COLORS.darkPurple,
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'Poppins-Regular',
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
    fontFamily: 'Poppins-Medium'
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
    fontFamily: 'Poppins-Medium'
  },
//   forgotPasswordContainer: {
//     alignItems: 'flex-end',
//     marginBottom: 24,
//   },
// //   forgotPasswordText: {
//     color: COLORS.darkPurple,
//     fontSize: 14,
//   },
  button: {
    backgroundColor: COLORS.darkPurple,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 24,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins-SemiBold'
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
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
    fontFamily: 'Poppins-SemiBold',
  },
  registerLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  registerText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins-Medium'
  },
  registerLink: {
    fontSize: 14,
    color: COLORS.darkPurple,
    marginLeft: 6,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium'
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 14,
    fontFamily: 'Poppins-Medium'
  },
  googleButton: {
    backgroundColor: COLORS.white,
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    elevation: 2,
  },
  googleButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  googleLogo: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: COLORS.gray,
  },
});