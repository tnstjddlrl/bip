
import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions
} from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import barcodeCheck from './src/barcodeCheck';

const Stack = createStackNavigator();


export default APP = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="바코드체크" component={barcodeCheck} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


