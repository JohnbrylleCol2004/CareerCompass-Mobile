import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../screen/styles/GradeStyles';

export default function GradesScreen() {
  const router = useRouter();

  const gradeOptions = [
    '95-100',
    '90-94',
    '85-89',
    '80-84',
    '75-79',
    'Below 75',
    'Not taken'
  ];

  const subjects = [
    'Programming',
    'Database Management',
    'Networking',
    'Web Development',
    'Cybersecurity',
    'Cloud Computing'
  ];

  const [grades, setGrades] = useState({
    Programming: '',
    DatabaseManagement: '',
    Networking: '',
    WebDevelopment: '',
    Cybersecurity: '',
    CloudComputing: ''
  });

  const [expandedSubject, setExpandedSubject] = useState(null);

  const handleGradeSelect = (subject, grade) => {
    const key = subject.replace(/\s+/g, '');
    setGrades(prev => ({
      ...prev,
      [key]: grade
    }));
    setExpandedSubject(null);
  };

  const toggleDropdown = (subject) => {
    setExpandedSubject(expandedSubject === subject ? null : subject);
  };

  const handleProceed = async () => {
    const allGrades = Object.values(grades);
    const hasEmptyGrade = allGrades.some(grade => grade === '');
    
    if (hasEmptyGrade) {
      Alert.alert('Incomplete', 'Please select grades for all subjects');
      return;
    }
    
    try {
      await AsyncStorage.setItem('user_grades', JSON.stringify(grades));
      router.push('/interests/page');
    } catch (error) {
      Alert.alert('Error', 'Failed to save grades');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Grades</Text>
      
      {subjects.map((subject) => {
        const key = subject.replace(/\s+/g, '');
        const isExpanded = expandedSubject === subject;
        const selectedGrade = grades[key];

        return (
          <View key={subject} style={styles.subjectContainer}>
            <Text style={styles.subjectLabel}>{subject}</Text>
            
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => toggleDropdown(subject)}
            >
              <Text style={selectedGrade ? styles.selectedText : styles.placeholderText}>
                {selectedGrade || 'Select Grade'}
              </Text>
              <Text style={styles.dropdownIcon}>▼</Text>
            </TouchableOpacity>

            {isExpanded && (
              <View style={styles.dropdownMenu}>
                {gradeOptions.map((grade) => (
                  <TouchableOpacity
                    key={grade}
                    style={[
                      styles.dropdownItem,
                      grades[key] === grade && styles.dropdownItemSelected
                    ]}
                    onPress={() => handleGradeSelect(subject, grade)}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        grades[key] === grade && styles.dropdownItemTextSelected
                      ]}
                    >
                      {grade}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        );
      })}

      <TouchableOpacity style={styles.button} onPress={handleProceed}>
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}