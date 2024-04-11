import React, { useEffect } from 'react';
import { View, Image, StatusBar } from 'react-native';
import image from '../design/CAPS.png'

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login')
    }, 3000)
  }, [])
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#104DBFff',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <StatusBar hidden />
      <Image source={image}
        style={{
          width: 83,
          height: 95,
          resizeMode: 'contain'
        }} />
    </View>
  );
};

export default SplashScreen;
