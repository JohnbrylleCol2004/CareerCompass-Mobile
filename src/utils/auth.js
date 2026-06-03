import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_SESSION_KEY = 'user_session';

export const saveUserSession = async (user) => {
  try {
    await AsyncStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving session:', error);
  }
};

export const getUserSession = async () => {
  try {
    const value = await AsyncStorage.getItem(USER_SESSION_KEY);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
};

export const removeUserSession = async () => {
  try {
    await AsyncStorage.removeItem(USER_SESSION_KEY);
  } catch (error) {
    console.error('Error removing session:', error);
  }
};