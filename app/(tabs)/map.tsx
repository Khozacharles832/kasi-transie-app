import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location'; // For Expo users

export default function MapScreen() {
  const [region, setRegion] = useState({
    latitude: -26.2041, // Default to Johannesburg
    longitude: 28.0473,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [pickupLocation, setPickupLocation] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Permission to access location was denied. Please allow location access in settings.'
        );
        return;
      }
    })();
  }, []);

  const handleUseCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setPickupLocation('Current Location');
      setRegion({
        ...region,
        latitude,
        longitude,
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch current location.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
      </MapView>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Pickup Location"
          value={pickupLocation}
          onChangeText={setPickupLocation}
        />
        <TouchableOpacity style={styles.currentLocationButton} onPress={handleUseCurrentLocation}>
          <Text style={styles.currentLocationText}>Use Current Location</Text>
        </TouchableOpacity>
        <TextInput style={styles.input} placeholder="Destination" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  form: {
    position: 'absolute',
    bottom: 50,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  currentLocationButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  currentLocationText: {
    color: 'white',
    fontWeight: 'bold',
  },
});



