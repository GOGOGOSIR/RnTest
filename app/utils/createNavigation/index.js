import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootStackScreen} from './create';

const AppNavigation = () => {
  return (
    // <SafeAreaProvider>
    <NavigationContainer>{RootStackScreen()}</NavigationContainer>
    // </SafeAreaProvider>
  );
};

export default AppNavigation;
