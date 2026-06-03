import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // Android specific: Ensure background is white even if status bar is translucent
  },
  scrollContent: {
    padding: 20,
    // Android Safe Area handling
    paddingBottom: Platform.OS === 'android' ? 40 : 60, 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 30,
    // Critical for Android to prevent extra line height
    includeFontPadding: false, 
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
    marginTop: 10,
    includeFontPadding: false,
  },
  areasContainer: {
    marginBottom: 30,
  },
  areaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14, // Slightly taller for easier Android touch targets
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    // Android ripple effect is handled by TouchableOpacity activeOpacity
  },
  areaItemSelected: {
    backgroundColor: '#E8F5E9', // Light green background for selection
    paddingHorizontal: 12,
    borderRadius: 8,
    borderBottomWidth: 0,
    // Elevation for selected state on Android
    elevation: 2, 
  },
  checkbox: {
    width: 20, // Slightly larger for Android touch
    height: 20,
    borderWidth: 2,
    borderColor: '#999',
    marginRight: 14,
    borderRadius: 4, // Android checkboxes are often slightly rounded squares
    backgroundColor: '#FFF',
  },
  checkboxSelected: {
    backgroundColor: '#4A9F8F',
    borderColor: '#4A9F8F',
  },
  areaText: {
    fontSize: 16,
    color: '#333',
    includeFontPadding: false, // Fix Android font spacing
  },
  areaTextSelected: {
    color: '#4A9F8F',
    fontWeight: '600', // Android fonts often need bolder weight to stand out
  },
  levelContainer: {
    marginBottom: 40,
  },
  levelDropdown: {
    backgroundColor: '#4A9F8F',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // Android Elevation for button depth
    elevation: 4,
    shadowColor: '#000', // Shadow for iOS fallback
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  levelText: {
    color: '#FFF',
    fontSize: 16,
    includeFontPadding: false,
  },
  dropdownArrow: {
    color: '#FFF',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)', // Slightly darker for Android
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    width: width * 0.85, // Slightly wider on Android
    maxHeight: 250,
    overflow: 'hidden',
    // Elevation for modal card
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalItem: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    alignItems: 'center', // Center text on Android
  },
  modalText: {
    fontSize: 16,
    color: '#000',
    includeFontPadding: false,
  },
  continueButton: {
    backgroundColor: '#4A9F8F',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    // Android Elevation for button
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    includeFontPadding: false,
    letterSpacing: 0.5, // Slight spacing helps Android fonts
  },
});