import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

export default function HomeScreen() {
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [nearbyDeviceLocations, setNearbyDeviceLocations] = useState([]);
  const [nearestDevice, setNearestDevice] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      if (currentLocation) {
        const { latitude, longitude } = currentLocation.coords;
        Location.reverseGeocodeAsync({ latitude, longitude })
          .then(location => {
            const addressString = `${location[0].name}, ${location[0].city}, ${location[0].region}, ${location[0].country}`;
            setAddress(addressString);

            // Now, fetch true coordinates for nearby device locations based on the user's address
            fetchNearbyDeviceLocations(latitude, longitude);
          })
          .catch(error => console.log('Error in reverse geocoding:', error));
      }
    })();
  }, []);

  const fetchNearbyDeviceLocations = async (latitude, longitude) => {
    // You need to replace this with your logic to fetch true coordinates based on the user's address
    // For demonstration purposes, I'm using simulated nearby device locations with hardcoded coordinates
    const simulatedNearbyLocations = [
      { id: 1, latitude: latitude + 0.001, longitude: longitude + 0.001, name: 'Device 1' },
      { id: 2, latitude: latitude - 0.001, longitude: longitude - 0.001, name: 'Device 2' },
      { id: 3, latitude: latitude + 0.002, longitude: longitude - 0.002, name: 'Device 3' },
      { id: 4, latitude: latitude - 0.002, longitude: longitude + 0.002, name: 'Device 4' },
    ];

    setNearbyDeviceLocations(simulatedNearbyLocations);

    // Calculate distances and find the nearest device
    calculateNearestDevice(latitude, longitude, simulatedNearbyLocations);
  };

  const calculateNearestDevice = (latitude, longitude, nearbyLocations) => {
    let minDistance = Number.MAX_VALUE;
    let nearest = null;

    nearbyLocations.forEach(deviceLocation => {
      const distance = getDistance(latitude, longitude, deviceLocation.latitude, deviceLocation.longitude);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = deviceLocation;
      }
    });

    setNearestDevice(nearest);
  };

  useEffect(() => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [location]);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km

    // Convert distance to meters if less than 1 km
    return d < 1 ? d * 1000 : d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  // Calculate ETA based on distance and average speed (for demonstration purposes, set to 30 km/h)
  const calculateETA = (distance) => {
    const averageSpeed = 30; // Average speed in km/h

    // Calculate ETA in hours
    let etaHours = distance / averageSpeed;

    // Convert ETA to minutes if less than 1 hour
    if (etaHours < 1) {
      return (etaHours * 60).toFixed(0) + ' mins';
    } else {
      return etaHours.toFixed(1) + ' hours';
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={false}
        showsMyLocationButton={false}
        initialRegion={{
          latitude: location ? location.coords.latitude : 0,
          longitude: location ? location.coords.longitude : 0,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title='Home'
            pinColor='#104DBF'
          />
        )}
        {nearbyDeviceLocations.map(device => (
          <Marker
            key={device.id}
            coordinate={{
              latitude: device.latitude,
              longitude: device.longitude,
            }}
            title={device.name}
          // pinColor='green'
          >
            <Image
              source={require("../design/coolor@4x-8.png")}
              style={{ width: 25, height: 25, resizeMode: 'contain', borderWidth: 2 }}
            />
          </Marker>
        ))}
        {nearestDevice && (
          <Marker
            coordinate={{
              latitude: nearestDevice.latitude,
              longitude: nearestDevice.longitude,
            }}
            title={nearestDevice.name}
          // pinColor='green' // Set pin color to green for the nearest device
          >
            <Image
              source={require("../design/coolor@4x-8.png")}
              style={{ width: 25, height: 25, resizeMode: 'contain', borderWidth: 2 }}
            />
          </Marker>
        )}

      </MapView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'transparent',
          paddingHorizontal: 0,
          paddingBottom: 0,
          height: 250,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            padding: 30,
            flex: 1
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#104DBF' }}>
            Current Address:
            <Text style={{ fontWeight: 'normal', color: 'gray', fontSize: 20 }}> {address}</Text>
          </Text>
          {nearestDevice && (
            <View>
              <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold', color: '#104DBF' }}>
                Nearest Modern Jeep:
                <Text style={{ fontWeight: 'normal', color: 'gray', fontSize: 20 }}> {nearestDevice.name} </Text>
              </Text>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#104DBF' }}>
                Distance:
                <Text style={{ fontWeight: 'normal', color: 'gray', fontSize: 20 }}> {getDistance(location.coords.latitude, location.coords.longitude, nearestDevice.latitude, nearestDevice.longitude).toFixed(2)} km </Text>
              </Text>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#104DBF' }}>
                ETA:
                <Text style={{ fontWeight: 'normal', color: 'gray', fontSize: 20 }}> {calculateETA(getDistance(location.coords.latitude, location.coords.longitude, nearestDevice.latitude, nearestDevice.longitude))}</Text>
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
