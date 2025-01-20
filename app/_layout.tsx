import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [logoOpacity] = useState(new Animated.Value(0)); // Logo opacity animation
  const [logoScale] = useState(new Animated.Value(0.8)); // Logo scale animation

  useEffect(() => {
    if (loaded) {
      // Start animations
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTimeout(() => SplashScreen.hideAsync(), 1000); // Hide splash screen after animation
      });
    }
  }, [loaded]);

  if (!loaded) {
    return null; // Render nothing until fonts are loaded
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Animated Splash Screen */}
      <AnimatedSplashScreen logoOpacity={logoOpacity} logoScale={logoScale} />

      {/* Main App */}
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </View>
  );
}

function AnimatedSplashScreen({ logoOpacity, logoScale }) {
  return (
    <View style={styles.splashContainer}>
      <Animated.Image
        source={require('../assets/images/logo.png')} // Adjust the logo path
        style={[
          styles.logo,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ffffff', // Match the splash screen background color
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150, // Adjust the logo size
    height: 150,
  },
});
