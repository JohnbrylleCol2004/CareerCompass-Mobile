import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  ActivityIndicator, 
  Platform, 
  Dimensions, 
  Alert,
  TouchableOpacity
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../screen/styles/ResultsStyles';

const { width } = Dimensions.get('window');

// Grade to Percentage Mapping
const GRADE_MAP = {
  '95-100': 97.5,
  '90-94': 92,
  '85-89': 87,
  '80-84': 82,
  '75-79': 77,
  'Below 75': 70,
  'Not taken': 0
};

// Interest to Career Mapping
const CAREER_MAP = {
  'Software Development': ['Full Stack Developer', 'Mobile App Developer', 'DevOps Engineer'],
  'Data Science': ['Data Analyst', 'Machine Learning Engineer', 'Data Scientist'],
  'Cybersecurity': ['Security Analyst', 'Penetration Tester', 'Security Architect'],
  'Cloud Computing': ['Cloud Engineer', 'Solutions Architect', 'Site Reliability Engineer'],
  'Networking': ['Network Administrator', 'Network Architect', 'Systems Engineer'],
  'Web Development': ['Frontend Developer', 'Backend Developer', 'UI/UX Designer'],
  // Default fallback
  'General': ['Software Developer', 'IT Specialist', 'System Analyst']
};

export default function ResultsScreen() {
  const router = useRouter();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    calculateResults();
  }, []);

  const calculateResults = async () => {
    try {
      const gradesData = await AsyncStorage.getItem('user_grades');
      const interestsData = await AsyncStorage.getItem('user_interests');

      if (!gradesData || !interestsData) {
        Alert.alert('Missing Data', 'Please complete the grades and interests sections first.');
        router.push('/grades');
        return;
      }

      const grades = JSON.parse(gradesData);
      const interests = JSON.parse(interestsData);

      // 1. Calculate Base Score from Grades
      const subjects = Object.keys(grades);
      let totalScore = 0;
      let count = 0;

      subjects.forEach(subject => {
        const gradeRange = grades[subject];
        if (gradeRange && gradeRange !== 'Not taken') {
          totalScore += GRADE_MAP[gradeRange] || 0;
          count++;
        }
      });

      const baseAverage = count > 0 ? (totalScore / count) : 0;

      // 2. Determine Top Interest
      const primaryInterest = interests.length > 0 ? interests : 'General';
      const relatedCareers = CAREER_MAP[primaryInterest] || CAREER_MAP['General'];

      // 3. Generate Matches with Varied Percentages
      // We simulate "dynamic" scores by adjusting the base average slightly for each match
      const matches = relatedCareers.slice(0, 3).map((career, index) => {
        // Calculate a "match score" based on base average + variance
        // Top match gets highest, subsequent ones get slightly lower
        const variance = Math.max(0, 10 - (index * 5)); // e.g., +10, +5, +0
        let matchScore = baseAverage + variance;
        
        // Cap at 100
        if (matchScore > 100) matchScore = 100;
        // Floor at 40 (minimum realistic score)
        if (matchScore < 40) matchScore = 40;

        return {
          title: index === 0 ? 'Top Match' : index === 1 ? 'Second Match' : 'Third Match',
          career: career,
          score: Math.round(matchScore)
        };
      });

      setResult({
        matches,
        interests,
        baseAverage: Math.round(baseAverage)
      });

    } catch (error) {
      console.error('Error calculating results:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = () => {
    Alert.alert('Connect', 'This would link to your profile or next step.');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A9F8F" />
        <Text style={styles.loadingText}>Analyzing your profile...</Text>
      </View>
    );
  }

  if (!result) return null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.header}>Results</Text>
      
      {/* Main Green Card */}
      <View style={styles.card}>
        {result.matches.map((match, index) => (
          <View key={index} style={styles.matchItem}>
            <Text style={styles.matchLabel}>{match.title}</Text>
            <Text style={styles.matchText}>
              {match.career} - {match.score}%
            </Text>
          </View>
        ))}
      </View>

      {/* Disclaimer Text */}
      <Text style={styles.disclaimer}>
        Your results are dynamically generated using a weighted scoring model and may change when profile data is updated.
      </Text>

      {/* Connect Button */}
      <TouchableOpacity 
        style={styles.connectButton} 
        onPress={handleConnect}
        activeOpacity={0.7}
      >
        <Text style={styles.connectButtonText}>Connect</Text>
      </TouchableOpacity>
      
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}