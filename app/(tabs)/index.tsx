import React, { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { db } from '../config/firebaseConfig';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const router = useRouter();
  const auth = getAuth();

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user data in Firestore
      const userRef = doc(db, 'Users', user.uid); // Using user.uid as document ID
      await setDoc(userRef, {
        email: user.email,
        createdAt: new Date().toISOString(),
      });

      Alert.alert('Success', 'Sign Up Successful!');
      
      // Navigate to Map Screen
      router.push('/map');

    } catch (error: any) {
      console.error('Error signing up:', error.message);
      Alert.alert('Error', error.message);
    }
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
        <ThemedText type="title">Kasi Transie</ThemedText>
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
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry={!passwordVisible}
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
            <ThemedText type="icon">
              {passwordVisible ? '🙈' : '👁️'}
            </ThemedText>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <ThemedText type="buttonText">Sign Up</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginOption}>
          <ThemedText type="link">Already have an account? Login</ThemedText>
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
    height: 200,
    width: 200,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 60,
  },
});
