import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

// Android-only elevation system (no iOS shadow props)
const cardElevation = 6;
const buttonElevation = 3;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FDFB',
    // Android optimization: disable nested scrolling if needed
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
    paddingBottom: 40,
    // Ensure padding is consistent on Android
    paddingTop: 20, 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FDFB',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    includeFontPadding: false, // Critical for Android
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 25,
    marginTop: 10,
    textAlign: 'center',
    includeFontPadding: false,
  },
  card: {
    backgroundColor: '#4A9F8F',
    borderRadius: 12,
    padding: 20,
    width: width * 0.9,
    alignItems: 'flex-start',
    marginBottom: 25,
    // Android Shadow
    elevation: cardElevation,
    // Remove iOS shadow props entirely
    shadowColor: undefined,
    shadowOffset: undefined,
    shadowOpacity: undefined,
    shadowRadius: undefined,
  },
  matchItem: {
    marginBottom: 18,
  },
  matchLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    includeFontPadding: false,
  },
  matchText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
    includeFontPadding: false,
  },
  disclaimer: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
    includeFontPadding: false,
  },
  connectButton: {
    backgroundColor: '#4A9F8F',
    paddingHorizontal: 40,
    paddingVertical: 14, // Minimum 48dp height (approx 14+14+20=48)
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    // Android Shadow
    elevation: buttonElevation,
    // Remove iOS shadow props
    shadowColor: undefined,
    shadowOffset: undefined,
    shadowOpacity: undefined,
    shadowRadius: undefined,
    minWidth: 150,
    minHeight: 48, // Material Design touch target
  },
  connectButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    includeFontPadding: false,
  },
});