import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { geocodeAsync } from 'expo-location';
import haversine from 'haversine';

const LocationInfo = ({ origin, destination }) => {
  const [distance, setDistance] = useState(null);
  const [eta, setETA] = useState(null);

  useEffect(() => {
    const calculateDistanceAndETA = async () => {
      if (origin && destination) {
        const start = await geocodeAsync(origin);
        const end = await geocodeAsync(destination);
        if (start.length > 0 && end.length > 0) {
          const startCoords = {
            latitude: start[0].latitude,
            longitude: start[0].longitude,
          };
          const endCoords = {
            latitude: end[0].latitude,
            longitude: end[0].longitude,
          };
          const dist = haversine(startCoords, endCoords, { unit: 'meter' });
          setDistance(dist);

          // Assuming average walking speed of 1.4 m/s
          const walkingSpeed = 1.4;
          const timeInSeconds = dist / walkingSpeed;
          const hours = Math.floor(timeInSeconds / 3600);
          const minutes = Math.floor((timeInSeconds % 3600) / 60);
          setETA(`${hours}h ${minutes}m`);
        }
      }
    };

    calculateDistanceAndETA();
  }, [origin, destination]);

  return (
    <View>
      {distance && (
        <Text>
          Distance: {distance.toFixed(2)} meters
        </Text>
      )}
      {eta && (
        <Text>
          ETA: {eta}
        </Text>
      )}
    </View>
  );
};

export default LocationInfo;
