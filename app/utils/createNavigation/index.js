import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackScreen} from './create';

const AppNavigation = () => {
  return <NavigationContainer>{RootStackScreen()}</NavigationContainer>;
};

export default AppNavigation;
