import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
