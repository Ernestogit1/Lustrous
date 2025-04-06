import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const COLORS = {
  darkPurple: '#FF231F7C',
  lightPurple: '#9370DB',
  lightPink: '#FFC0CB',
  mediumPink: '#FF69B4',
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fcf5fa', // Very light pink background
  },
  patternContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  diagonalLine1: {
    position: 'absolute',
    width: '200%',
    height: 2,
    top: '20%',
    left: '-50%',
    transform: [{ rotate: '15deg' }],
  },
  diagonalLine2: {
    position: 'absolute',
    width: '200%',
    height: 2,
    top: '60%',
    left: '-50%',
    transform: [{ rotate: '-15deg' }],
  },
  circle1: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    top: '10%',
    right: '-10%',
  },
  circle2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    bottom: '5%',
    left: '-15%',
  },
  dot1: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    top: '15%',
    left: '10%',
  },
  dot2: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    top: '25%',
    right: '15%',
  },
  dot3: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    bottom: '30%',
    right: '20%',
  },
  dot4: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    bottom: '10%',
    left: '25%',
  },
  horizontalLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
  },
  verticalLine: {
    position: 'absolute',
    width: 2,
    height: '100%',
  },
  header: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    elevation: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  contentScrollView: {
    flex: 1,
    padding: 16,
  },
  notificationCard: {
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: `${COLORS.lightPurple}30`,
  },
  iconSection: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: `${COLORS.lightPurple}20`,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.darkPurple,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 3,
    borderColor: 'white',
  },
  contentSection: {
    padding: 20,
    paddingTop: 16,
  },
  title: { 
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.05)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
  time: { 
    marginTop: 6,
    fontSize: 14, 
    color: '#777',
    textAlign: 'center',
  },
  divider: {
    height: 2,
    marginVertical: 16,
    borderRadius: 1,
    opacity: 0.3,
  },
  bodyContainer: {
    borderRadius: 8,
    padding: 1,
  },
  body: { 
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.darkPurple,
  },
  dataContainer: {
    marginTop: 16,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: `${COLORS.mediumPink}30`,
  },
  dataText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
    padding: 4,
    borderBottomWidth: 1, 
    borderBottomColor: `${COLORS.lightPink}30`,
  },
  dataLabel: {
    fontWeight: '600',
    color: '#444',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  empty: { 
    marginTop: 16,
    fontSize: 18, 
    color: '#666',
    textAlign: 'center' 
  }
});

export default styles;