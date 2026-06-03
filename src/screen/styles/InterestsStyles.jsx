import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FFF8',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  checkboxGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1E8E6',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#4A9F8F',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxSelected: {
    backgroundColor: '#4A9F8F',
  },
  checkboxCheck: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
  techGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  techCheckbox: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1E8E6',
  },
  techCheckboxSelected: {
    backgroundColor: '#4A9F8F',
    borderColor: '#4A9F8F',
  },
  techText: {
    fontSize: 13,
    color: '#666',
  },
  techTextSelected: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  dropdown: {
    backgroundColor: '#4A9F8F',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  placeholderText: {
    color: '#E0E0E0',
    fontSize: 16,
    fontWeight: '500',
  },
  dropdownIcon: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  dropdownMenu: {
    backgroundColor: '#4A9F8F',
    borderRadius: 8,
    marginTop: 5,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  dropdownItemSelected: {
    backgroundColor: '#3D8F7F',
  },
  dropdownItemText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '400',
  },
  dropdownItemTextSelected: {
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#4A9F8F',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});