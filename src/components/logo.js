// src/components/Logo.jsx
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import logo from '../../assets/images/career-compass.png';

const Logo = () => (
  <Image source={logo} style={styles.logo} />
);

const styles = StyleSheet.create({
  logo: {
    width: 250,
    height: 200,
    resizeMode: 'contain',
    marginVertical: 20,
  },
});

export default Logo;