// src/app/forgot-password/page.jsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../../screen/styles/ForgotPasswordScreenStyles';
import Logo from '../../components/logo';

export default function ForgotPasswordScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Forgot Password</Text>
      <Logo />
      <Text style={styles.title}>Career Compass</Text>
      
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#888"
        />
        
        <TextInput
          style={styles.input}
          placeholder="New Password"
          placeholderTextColor="#888"
          secureTextEntry
        />
        
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#888"
          secureTextEntry
        />
      </View>
      
      <TouchableOpacity 
        style={styles.registerButton}
        onPress={() => router.back()}
      >
        <Text style={styles.registerButtonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}