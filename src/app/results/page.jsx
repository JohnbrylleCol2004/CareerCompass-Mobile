import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../screen/styles/ResultsStyles';

// Font helper for Android alignment
const FontText = ({ children, style, ...props }) => (
  <Text 
    {...props} 
    includeFontPadding={Platform.OS === 'android'} 
    style={style}
  >
    {children}
  </Text>
);

export default function ResultsScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const savedData = await AsyncStorage.getItem('user_interests');
        if (savedData) {
          const parsed = JSON.parse(savedData);
          setUserData(parsed);
          generateRecommendations(parsed);
        } else {
          // Fallback if no data found
          setUserData({ selectedAreas: ['General Tech'], experienceLevel: 'Entry' });
          generateRecommendations({ selectedAreas: ['General Tech'], experienceLevel: 'Entry' });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const generateRecommendations = (data) => {
    const { selectedAreas, experienceLevel } = data;
    
    // Algorithm: Adjust score based on experience and specific areas
    let baseScore = 75;
    if (experienceLevel === 'Senior') baseScore += 10;
    if (selectedAreas.includes('Cloud Computing')) baseScore += 5;
    if (selectedAreas.includes('Cybersecurity')) baseScore += 5;
    
    const finalScore = Math.min(Math.max(baseScore, 0), 100);

    // Generate specific role recommendations based on selection
    const roles = [];
    selectedAreas.forEach(area => {
      let roleTitle = '';
      let description = '';

      if (area === 'Web Development') {
        roleTitle = experienceLevel === 'Senior' ? 'Lead Frontend Architect' : 'Frontend Developer';
        description = experienceLevel === 'Senior' 
          ? 'Focus on system architecture, scalability, and team leadership.' 
          : 'Focus on building responsive user interfaces and frontend logic.';
      } else if (area === 'Data Science') {
        roleTitle = experienceLevel === 'Senior' ? 'Senior Data Scientist' : 'Junior Data Analyst';
        description = experienceLevel === 'Senior'
          ? 'Lead predictive modeling, ML strategy, and data pipeline architecture.'
          : 'Clean data, create initial visualizations, and support senior analysts.';
      } else if (area === 'Cybersecurity') {
        roleTitle = experienceLevel === 'Senior' ? 'Security Architect' : 'Security Analyst';
        description = experienceLevel === 'Senior'
          ? 'Design security frameworks and lead incident response strategy.'
          : 'Monitor networks, analyze logs, and respond to immediate threats.';
      } else if (area === 'Mobile Development') {
        roleTitle = experienceLevel === 'Senior' ? 'Mobile Tech Lead' : 'Mobile Developer';
        description = experienceLevel === 'Senior'
          ? 'Oversee mobile architecture and cross-platform strategy.'
          : 'Develop and maintain native or cross-platform mobile applications.';
      } else if (area === 'Cloud Computing') {
        roleTitle = experienceLevel === 'Senior' ? 'Cloud Solutions Architect' : 'Cloud Engineer';
        description = experienceLevel === 'Senior'
          ? 'Design cloud infrastructure and cost-optimization strategies.'
          : 'Deploy applications, manage cloud resources, and ensure availability.';
      } else if (area === 'Software Engineering') {
        roleTitle = experienceLevel === 'Senior' ? 'Principal Engineer' : 'Software Engineer';
        description = experienceLevel === 'Senior'
          ? 'Drive technical vision and system design across the organization.'
          : 'Write clean, maintainable code and participate in code reviews.';
      } else {
        roleTitle = `${area} Specialist`;
        description = `Apply your ${area} skills in a practical environment.`;
      }

      roles.push({
        title: roleTitle,
        desc: description,
        match: Math.floor(finalScore + (Math.random() * 10 - 5)), // Slight variation for realism
      });
    });

    setRecommendations(roles);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A9F8F" />
        <FontText style={styles.loadingText}>Analyzing your profile...</FontText>
      </View>
    );
  }

  if (!userData) return null;

  // Calculate average match for display
  const avgMatch = Math.round(
    recommendations.reduce((acc, curr) => acc + curr.match, 0) / recommendations.length
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <FontText style={styles.header}>Your Personalized Roadmap</FontText>
      
      <FontText style={styles.subHeader}>
        Based on your interest in <FontText style={styles.highlight}>{userData.selectedAreas.join(', ')}</FontText>
      </FontText>
      
      <FontText style={styles.subHeader}>
        and <FontText style={styles.highlight}>{userData.experienceLevel}</FontText> experience.
      </FontText>

      {/* Dynamic Score Card */}
      <View style={styles.scoreCard}>
        <FontText style={styles.scoreLabel}>Overall Match Score</FontText>
        <FontText style={styles.scoreValue}>{avgMatch}%</FontText>
        <FontText style={styles.scoreDesc}>
          You are a strong fit for roles in your selected areas!
        </FontText>
      </View>

      <FontText style={styles.sectionTitle}>Recommended Roles</FontText>
      
      {recommendations.map((role, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.roleCard} 
          activeOpacity={0.7}
          onPress={() => router.push(`/role-details/${index}`)} // Navigate to detail screen
        >
          <FontText style={styles.roleTitle}>{role.title}</FontText>
          <FontText style={styles.roleDesc}>{role.desc}</FontText>
          <View style={styles.matchBadge}>
            <FontText style={styles.matchText}>{role.match}% Match</FontText>
          </View>
        </TouchableOpacity>
      ))}

      {/* UPDATED BUTTON: Says "Connect" and goes to Interests */}
      <TouchableOpacity
        style={styles.retryButton}
        onPress={() => router.push('/interests')}
        activeOpacity={0.8}
      >
        <FontText style={styles.retryText}>Connect</FontText>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}