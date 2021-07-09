
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

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import barcodeCheck from './src/barcodeCheck';
import PriceVs from './src/priceVs';
import Wb from './src/wb';

const Stack = createStackNavigator();


export default APP = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator headerMode={'none'}>
          <Stack.Screen name="바코드체크" component={barcodeCheck} />
          <Stack.Screen name="가격비교" component={PriceVs} />
          <Stack.Screen name="웹뷰" component={Wb} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  )
}


