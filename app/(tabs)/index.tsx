import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.roundLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Kasi-Transie</ThemedText>
      </ThemedView>

      {/* Signup Form */}
      <ThemedView style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry={!passwordVisible}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
            <ThemedText type="icon">
              {passwordVisible ? '🙈' : '👁️'}
            </ThemedText>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button}>
          <ThemedText type="buttonText">Sign Up</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginOption}>
          <ThemedText type="link">
            Already have an account? Login
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  formContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  iconContainer: {
    paddingHorizontal: 12,
  },
  button: {
    backgroundColor: '#1D3D47',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginOption: {
    marginTop: 8,
    alignItems: 'center',
  },
  roundLogo: {
    height: 100,
    width: 100,
    borderRadius: 50, // Makes the logo round
    alignSelf: 'center',
  },
});
