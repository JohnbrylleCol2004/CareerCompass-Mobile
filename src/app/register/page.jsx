import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../../screen/styles/RegisterScreenStyles';
import Logo from '../../components/logo';
import { saveUserSession } from '../../utils/auth';

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRegister = () => {
    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!confirmPassword) {
      setConfirmError('Please confirm your password');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmError('');
    }

    if (!isValid) return;

    const mockUser = { email, registered: true };
    saveUserSession(mockUser);
    router.push('/login/page');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>
      <Logo />
      <Text style={styles.title}>Career Compass</Text>
      
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (emailError) setEmailError('');
            }}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) setPasswordError('');
            }}
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              if (confirmError) setConfirmError('');
            }}
          />
          {confirmError ? <Text style={styles.errorText}>{confirmError}</Text> : null}
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.registerButton}
        onPress={handleRegister}
      >
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.loginLink}
        onPress={() => router.push('/login/page')}
      >
        <Text style={styles.loginLinkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}