import { StyleSheet } from 'react-native';

export const COLORS = {
  darkPurple: "#6B3FA0",
  mediumPurple: "#9B7FD1",
  lightPurple: "#C9B8E8",
  lightPink: "#F9F1FD",
  mediumPink: "#F2D7ED",
  gray: "#555",
  mediumGray: "#AAAAAA",
  lightGray: "#F5F5F5",
  white: "#FFFFFF",
  black: "#000000",
  error: "#E53935",
};

const styles = StyleSheet.create({
  // Drawer styles
  drawer: {
    width: 270,
    backgroundColor: COLORS.white,
  },
  drawerContentContainer: {
    flex: 1,
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  drawerHeader: {
    paddingTop: 50, 
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    backgroundColor: COLORS.white, 
  },
  logoImage: {
    width: 170,  
    height: 70,  
  },
  drawerItemsContainer: {
    flex: 1,
    paddingTop: 20, 
  },
  drawerTitle: {
    fontSize: 22,
    color: COLORS.white,
    fontFamily: 'Poppins-Bold',
    marginBottom: 5,
  },
  drawerSubtitle: {
    fontSize: 14,
    color: COLORS.lightPurple,
    fontFamily: 'Poppins-Regular',
    opacity: 0.9,
  },
  drawerLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    margin: 0,
    padding: 0,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 8,
  },
  drawerItemActive: {
    backgroundColor: 'rgba(107, 63, 160, 0.1)', 
  },
  drawerItemText: {
    marginLeft: 16,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.gray,
  },
  drawerItemTextActive: {
    fontFamily: 'Poppins-Medium',
    color: COLORS.darkPurple,
  },

  // Header styles
  header: {
    backgroundColor: COLORS.darkPurple,
    elevation: 4,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  logoutContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.lightPink,
  },
  logoutTitle: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    color: COLORS.gray,
  },
  logoutButton: {
    backgroundColor: COLORS.error,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  logoutButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
});

export default styles;