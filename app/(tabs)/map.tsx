import React, { useState } from 'react';
import { Alert, StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapScreen() {
  const [pickupLocation, setPickupLocation] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');
  const [showInputs, setShowInputs] = useState(false);
  const [buttonTitle, setButtonTitle] = useState('Where to?');

  const handleButtonPress = () => {
    if (buttonTitle === 'Where to?') {
      setShowInputs(true);
    } else {
      if (!pickupLocation || !destinationLocation) {
        Alert.alert('Enter location', 'Please enter both pickup and destination locations.');
        return;
      }
      Alert.alert('Request Sent', 'Your ride has been requested!');
      setShowInputs(false);
      setButtonTitle('Where to?');
      setPickupLocation('');
      setDestinationLocation('');
    }
  };

  const handleLocationInput = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Location permission is required to fetch your current location.');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setPickupLocation(`${location.coords.latitude}, ${location.coords.longitude}`);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -26.289,
          longitude: 27.896,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {pickupLocation && (
          <Marker
            coordinate={{
              latitude: parseFloat(pickupLocation.split(',')[0]),
              longitude: parseFloat(pickupLocation.split(',')[1]),
            }}
            title="Pickup Location"
            pinColor="blue"
          />
        )}
        {destinationLocation && (
          <Marker
            coordinate={{
              latitude: parseFloat(destinationLocation.split(',')[0]),
              longitude: parseFloat(destinationLocation.split(',')[1]),
            }}
            title="Destination"
            pinColor="red"
          />
        )}
      </MapView>
      <View style={styles.overlay}>
        {showInputs && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Pickup Location"
              value={pickupLocation}
              onChangeText={setPickupLocation}
              onFocus={handleLocationInput}
            />
            <TextInput
              style={styles.input}
              placeholder="Destination Location"
              value={destinationLocation}
              onChangeText={setDestinationLocation}
            />
          </>
        )}
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
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
  overlay: {
    position: 'absolute',
    top: 20,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1D3D47',
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});




