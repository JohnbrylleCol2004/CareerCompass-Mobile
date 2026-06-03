import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../screen/styles/ResultsStyles';
import Logo from '../../components/logo';

export default function ResultsScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [recommendation, setRecommendation] = useState(null);

  const careerPaths = {
    'Programming': 'Software Engineer / Developer',
    'Database Management': 'Database Administrator (DBA)',
    'Networking': 'Network Engineer / Architect',
    'Web Development': 'Full Stack Web Developer',
    'Cybersecurity': 'Information Security Analyst',
    'Cloud Computing': 'Cloud Solutions Architect'
  };

  const careerTips = {
    'Software Engineer / Developer': [
      'Focus on algorithms and data structures.',
      'Build a portfolio of projects on GitHub.',
      'Learn multiple languages (e.g., Java, Python, JavaScript).'
    ],
    'Database Administrator (DBA)': [
      'Master SQL and NoSQL databases.',
      'Learn about cloud database services (AWS RDS, Azure SQL).',
      'Understand data modeling and optimization.'
    ],
    'Network Engineer / Architect': [
      'Get certified (Cisco CCNA/CCNP, CompTIA Network+).',
      'Learn about SD-WAN and network security.',
      'Understand routing and switching protocols.'
    ],
    'Full Stack Web Developer': [
      'Master React, Angular, or Vue.js.',
      'Learn backend technologies (Node.js, Django).',
      'Understand RESTful APIs and GraphQL.'
    ],
    'Information Security Analyst': [
      'Get certified (CompTIA Security+, CISSP).',
      'Learn ethical hacking and penetration testing.',
      'Stay updated on the latest cyber threats.'
    ],
    'Cloud Solutions Architect': [
      'Get certified (AWS Solutions Architect, Azure Architect).',
      'Learn containerization (Docker, Kubernetes).',
      'Understand DevOps and CI/CD pipelines.'
    ]
  };

  useEffect(() => {
    const calculateResults = async () => {
      try {
        const gradesData = await AsyncStorage.getItem('user_grades');
        if (!gradesData) {
          router.push('/grades/page');
          return;
        }

        const grades = JSON.parse(gradesData);
        
        // Convert grade ranges to numbers for comparison
        const gradeMap = {
          '95-100': 97,
          '90-94': 92,
          '85-89': 87,
          '80-84': 82,
          '75-79': 77,
          'Below 75': 70,
          'Not taken': 0
        };

        let highestScore = -1;
        let bestSubject = '';

        // Find the subject with the highest grade
        for (const [subject, grade] of Object.entries(grades)) {
          // Convert kebab-case key to display name (e.g., "Web Development")
          const displayName = subject.replace(/([A-Z])/g, ' $1').trim();
          // Re-format to match the keys in careerPaths exactly
          const cleanSubject = displayName.charAt(0).toUpperCase() + displayName.slice(1);
          
          const score = gradeMap[grade] || 0;
          if (score > highestScore) {
            highestScore = score;
            bestSubject = cleanSubject;
          }
        }

        if (bestSubject && careerPaths[bestSubject]) {
          setRecommendation({
            career: careerPaths[bestSubject],
            subject: bestSubject,
            tips: careerTips[careerPaths[bestSubject]]
          });
        } else {
          setRecommendation({
            career: 'General IT Specialist',
            subject: 'General',
            tips: ['Explore various IT fields to find your passion.', 'Consider a broad certification like CompTIA A+.', 'Build a strong foundation in computer science basics.']
          });
        }

      } catch (error) {
        console.error('Error calculating results:', error);
      } finally {
        setLoading(false);
      }
    };

    calculateResults();
  }, [router]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A9F8F" />
        <Text style={styles.loadingText}>Analyzing your profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Logo />
      
      <Text style={styles.header}>Your Career Path</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Based on your strength in</Text>
        <Text style={styles.subjectText}>{recommendation?.subject}</Text>
        
        <Text style={styles.label}>We recommend</Text>
        <Text style={styles.careerText}>{recommendation?.career}</Text>
      </View>

      <View style={styles.tipsContainer}>
        <Text style={styles.tipsHeader}>Why this path?</Text>
        {recommendation?.tips.map((tip, index) => (
          <View key={index} style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push('/')}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}