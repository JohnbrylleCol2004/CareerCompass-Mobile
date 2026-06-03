import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../../screen/styles/AssessmentStyles';
import Logo from '../../components/logo';

export default function AssessmentScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Logo />
      
      <Text style={styles.title}>
        This assessment evaluates your academic performance, interests, and experience level to generate personalized career recommendations.
      </Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push('/grades/page')}
      >
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
}