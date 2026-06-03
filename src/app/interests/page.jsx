import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../screen/styles/InterestsStyles';

export default function InterestsScreen() {
  const router = useRouter();

  const itAreas = [
    'Web Development', 'Mobile Development', 'Cybersecurity',
    'Data Science', 'Networking', 'Cloud Computing', 'Software Engineering'
  ];

  const technologies = [
    'Python', 'Java', 'C++', 'JavaScript', 'React', 'Artificial Intelligence',
    'AWS', 'Linux', 'Kotlin', 'Swift', 'MySQL', 'Flutter'
  ];

  const experienceLevels = ['Entry', 'Junior', 'Senior'];
  const yearLevels = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'N/A'];

  const [selectedAreas, setSelectedAreas] = useState([]);
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [expandedExperience, setExpandedExperience] = useState(false);
  const [expandedYear, setExpandedYear] = useState(false);

  const toggleArea = (area) => {
    setSelectedAreas(prev =>
      prev.includes(area) ? prev.filter(item => item !== area) : [...prev, area]
    );
  };

  const toggleTech = (tech) => {
    setSelectedTechs(prev =>
      prev.includes(tech) ? prev.filter(item => item !== tech) : [...prev, tech]
    );
  };

  const handleExperienceSelect = (level) => {
    setExperienceLevel(level);
    setExpandedExperience(false);
  };

  const handleYearSelect = (year) => {
    setYearLevel(year);
    setExpandedYear(false);
  };

  const handleProceed = async () => {
    if (!experienceLevel || !yearLevel) {
      Alert.alert('Incomplete', 'Please select Experience Level and Current Year Level');
      return;
    }

    const data = {
      selectedAreas,
      selectedTechs,
      experienceLevel,
      yearLevel
    };

    try {
      await AsyncStorage.setItem('user_interests', JSON.stringify(data));
      router.push('/results/page');
    } catch (error) {
      Alert.alert('Error', 'Failed to save interests');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Interests & experience</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferred IT areas</Text>
        <View style={styles.checkboxGroup}>
          {itAreas.map((area) => (
            <TouchableOpacity
              key={area}
              style={styles.checkboxContainer}
              onPress={() => toggleArea(area)}
            >
              <View style={[styles.checkbox, selectedAreas.includes(area) && styles.checkboxSelected]}>
                {selectedAreas.includes(area) && <Text style={styles.checkboxCheck}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>{area}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Technologies Familiar with</Text>
        <View style={styles.techGrid}>
          {technologies.map((tech) => (
            <TouchableOpacity
              key={tech}
              style={[styles.techCheckbox, selectedTechs.includes(tech) && styles.techCheckboxSelected]}
              onPress={() => toggleTech(tech)}
            >
              <Text style={[styles.techText, selectedTechs.includes(tech) && styles.techTextSelected]}>
                {tech}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience level</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => {
            setExpandedExperience(!expandedExperience);
            setExpandedYear(false);
          }}
        >
          <Text style={experienceLevel ? styles.selectedText : styles.placeholderText}>
            {experienceLevel || 'Select Experience Level'}
          </Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>

        {expandedExperience && (
          <View style={styles.dropdownMenu}>
            {experienceLevels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[styles.dropdownItem, experienceLevel === level && styles.dropdownItemSelected]}
                onPress={() => handleExperienceSelect(level)}
              >
                <Text style={[styles.dropdownItemText, experienceLevel === level && styles.dropdownItemTextSelected]}>
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Year Level</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => {
            setExpandedYear(!expandedYear);
            setExpandedExperience(false);
          }}
        >
          <Text style={yearLevel ? styles.selectedText : styles.placeholderText}>
            {yearLevel || 'Select Year Level'}
          </Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>

        {expandedYear && (
          <View style={styles.dropdownMenu}>
            {yearLevels.map((year) => (
              <TouchableOpacity
                key={year}
                style={[styles.dropdownItem, yearLevel === year && styles.dropdownItemSelected]}
                onPress={() => handleYearSelect(year)}
              >
                <Text style={[styles.dropdownItemText, yearLevel === year && styles.dropdownItemTextSelected]}>
                  {year}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleProceed}>
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}