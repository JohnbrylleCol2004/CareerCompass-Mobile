import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../screen/styles/InterestsStyles';

const { width } = Dimensions.get('window');

const IT_AREAS = [
  'Web Development',
  'Mobile Development',
  'Cybersecurity',
  'Data Science',
  'Networking',
  'Cloud Computing',
  'Software Engineering',
];

const EXPERIENCE_LEVELS = ['Entry', 'Junior', 'Senior'];

export default function InterestsScreen() {
  const router = useRouter();
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState('');
  const [isLevelDropdownVisible, setIsLevelDropdownVisible] = useState(false);

  const toggleArea = (area) => {
    setSelectedAreas((prev) =>
      prev.includes(area)
        ? prev.filter((a) => a !== area)
        : [...prev, area]
    );
  };

  const handleNext = async () => {
    if (selectedAreas.length === 0 || !experienceLevel) {
      alert('Please select at least one IT area and your experience level.');
      return;
    }

    try {
      await AsyncStorage.setItem(
        'user_interests',
        JSON.stringify({
          selectedAreas,
          experienceLevel,
        })
      );
      router.push('/analyzing/page');
    } catch (error) {
      console.error('Failed to save interests:', error);
      alert('Failed to save your preferences. Please try again.');
    }
  };

  // Android Font Fix: Ensures text doesn't have extra top/bottom padding
  const FontText = ({ children, style, ...props }) => (
    <Text 
      {...props} 
      includeFontPadding={Platform.OS === 'android'} 
      style={style}
    >
      {children}
    </Text>
  );

  return (
    <ScrollView
      style={styles.container}
      // FIXED: Removed the second contentContainerStyle definition
      contentContainerStyle={[
        styles.scrollContent, 
        { paddingBottom: Platform.OS === 'android' ? 40 : 60 }
      ]}
      showsVerticalScrollIndicator={Platform.OS === 'android'}
    >
      <FontText style={styles.title}>Interests & experience</FontText>

      {/* Preferred IT Areas */}
      <FontText style={styles.sectionTitle}>Preferred IT areas</FontText>
      <View style={styles.areasContainer}>
        {IT_AREAS.map((area) => {
          const isSelected = selectedAreas.includes(area);
          return (
            <TouchableOpacity
              key={area}
              style={[
                styles.areaItem,
                isSelected && styles.areaItemSelected,
              ]}
              onPress={() => toggleArea(area)}
              activeOpacity={0.7}
              delayPressIn={0}
            >
              <View
                style={[
                  styles.checkbox,
                  isSelected && styles.checkboxSelected,
                ]}
              />
              <FontText style={[styles.areaText, isSelected && styles.areaTextSelected]}>
                {area}
              </FontText>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Experience Level */}
      <FontText style={styles.sectionTitle}>Experience level</FontText>
      <View style={styles.levelContainer}>
        <TouchableOpacity
          style={styles.levelDropdown}
          onPress={() => setIsLevelDropdownVisible(true)}
          activeOpacity={0.8}
        >
          <FontText style={styles.levelText}>
            {experienceLevel || 'Select experience level'}
          </FontText>
          <Text style={styles.dropdownArrow}>▼</Text>
        </TouchableOpacity>

        <Modal
          visible={isLevelDropdownVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setIsLevelDropdownVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setIsLevelDropdownVisible(false)}
          >
            <View style={styles.modalContent}>
              {EXPERIENCE_LEVELS.map((level) => (
                <TouchableOpacity
                  key={level}
                  style={styles.modalItem}
                  onPress={() => {
                    setExperienceLevel(level);
                    setIsLevelDropdownVisible(false);
                  }}
                  activeOpacity={0.7}
                >
                  <FontText style={styles.modalText}>{level}</FontText>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleNext}
        activeOpacity={0.8}
      >
        <FontText style={styles.continueButtonText}>Continue</FontText>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}