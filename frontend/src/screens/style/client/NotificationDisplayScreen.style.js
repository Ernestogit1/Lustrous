import { StyleSheet } from 'react-native';

export const COLORS = {
  darkPurple: '#FF231F7C',
  lightPurple: '#9370DB',
  lightPink: '#FFC0CB',
  mediumPink: '#FF69B4',
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f8f8'
  },
  header: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    fontFamily: 'Poppins-Medium',
  },
  headerTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
  listContainer: {
    padding: 16,
  },
  notification: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 0,
    overflow: 'hidden',
  },
  unread: {
    backgroundColor: '#ffffff',
    borderLeftWidth: 3,
    borderLeftColor: COLORS.darkPurple,
  },
  read: {
    backgroundColor: '#fcfcfc',
  },
  notificationContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    fontFamily: 'Poppins-Regular',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  readIconContainer: {
    backgroundColor: '#c8c8c8',
  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
    position: 'relative',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  title: { 
    fontSize: 15,
    flex: 1,
    fontFamily: 'Poppins-Bold',
  },
  readTitle: {
    color: '#666',
    fontFamily: 'Poppins-Regular',
    
  },
  unreadTitle: {
    color: '#222',
    fontWeight: '700',
  },
  body: { 
    marginTop: 3,
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    fontFamily: 'Poppins-Regular',
  },
  date: { 
    color: '#999', 
    fontSize: 12,
    marginLeft: 8,
    fontFamily: 'Poppins-Regular',
  },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.darkPurple,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  empty: { 
    marginTop: 12,
    fontSize: 16, 
    color: '#999',
    textAlign: 'center' 
  },
});

export default styles;