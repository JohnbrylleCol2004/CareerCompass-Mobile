import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FFF8',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: '#A8D5D2',
    padding: 25,
    borderRadius: 12,
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#D1E8E6',
  },
  errorText: {
    color: '#D9534F',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 4,
    fontWeight: '500',
  },
  forgotPasswordContainer: {
    backgroundColor: '#4A9F8F',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#4A9F8F',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});