import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  ActivityIndicator, 
  StyleSheet, 
  Dimensions, 
  Platform 
} from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

// Android-specific styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FDFB',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 30,
    width: width * 0.85,
    alignItems: 'center',
    // Android Elevation only
    elevation: 8,
    shadowColor: undefined, // Explicitly remove iOS shadow
    shadowOffset: undefined,
    shadowOpacity: undefined,
    shadowRadius: undefined,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
    includeFontPadding: false,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
    includeFontPadding: false,
  },
  indicatorContainer: {
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 14,
    color: '#4A9F8F',
    fontWeight: '600',
    marginTop: 10,
    includeFontPadding: false,
  },
  steps: {
    width: '100%',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 15,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  stepLast: {
    borderBottomWidth: 0,
    marginBottom: 0,
  },
  stepText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#999',
    includeFontPadding: false,
  },
  stepActive: {
    color: '#4A9F8F',
    fontWeight: '600',
  },
});

export default function AnalyzingScreen() {
  const router = useRouter();

  useEffect(() => {
    // Simulate processing time (2.5 seconds)
    const timer = setTimeout(() => {
      router.push('/results/page');
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.indicatorContainer}>
          <ActivityIndicator 
            size="large" 
            color="#4A9F8F" 
            animating={true} 
          />
        </View>
        
        <Text style={styles.title}>Analyzing Your Profile</Text>
        <Text style={styles.subtitle}>
          We are matching your interests and grades with the best career paths.
        </Text>

        <View style={styles.steps}>
          {/* Visual Steps for realism */}
          <View style={styles.step}>
            <View style={[styles.stepText, styles.stepActive, { width: 10, height: 10, borderRadius: 5, backgroundColor: '#4A9F8F', marginRight: 12 }]} />
            <Text style={[styles.stepText, styles.stepActive]}>Processing Grades</Text>
          </View>
          <View style={styles.step}>
            <View style={[styles.stepText, styles.stepActive, { width: 10, height: 10, borderRadius: 5, backgroundColor: '#4A9F8F', marginRight: 12 }]} />
            <Text style={[styles.stepText, styles.stepActive]}>Analyzing Interests</Text>
          </View>
          <View style={[styles.step, styles.stepLast]}>
            <View style={[styles.stepText, { width: 10, height: 10, borderRadius: 5, backgroundColor: '#4A9F8F', marginRight: 12 }]} />
            <Text style={[styles.stepText, { color: '#4A9F8F', fontWeight: '600' }]}>Generating Matches</Text>
          </View>
        </View>
        
        <Text style={styles.loadingText}>Please wait...</Text>
      </View>
    </View>
  );
}