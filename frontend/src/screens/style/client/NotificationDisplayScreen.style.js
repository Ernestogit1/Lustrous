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
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
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
    fontWeight: '600', 
    fontSize: 15,
    flex: 1,
  },
  readTitle: {
    color: '#666',
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
  },
  date: { 
    color: '#999', 
    fontSize: 12,
    marginLeft: 8,
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