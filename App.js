
import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  Linking,
  Alert
} from 'react-native';

import {
  RecoilRoot,
} from 'recoil';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import VersionCheck from 'react-native-version-check';

import barcodeCheck from './src/barcodeCheck';
import PriceVs from './src/priceVs';
import Wb from './src/wb';
import Jjim from './src/jjim';
import Plusview from './src/plusview';
import Auction_wb from './wb/auction_wb';
import Coupang_wb from './wb/coupang_wb';
import Gmarket_wb from './wb/gmarket_wb';
import Interpart_wb from './wb/interpark_wb';
import Oost_wb from './wb/oost_wb';

const Stack = createStackNavigator();

export default APP = () => {

  console.log(VersionCheck.getPackageName());        // com.reactnative.app
  console.log(VersionCheck.getCurrentBuildNumber()); // 10
  console.log(VersionCheck.getCurrentVersion());     // 0.1.1

  VersionCheck.needUpdate()
    .then(async res => {
      console.log(res.isNeeded);    // true
      if (res.isNeeded) {
        Alert.alert('앱을 업데이트 해주세요!', '최신 기능을 사용하기 위해선 어플 업데이트가 필요합니다!',
          [
            {
              text: "나중에",
              onPress: () => console.log("Cancel Pressed"),
            },
            { text: "업데이트", onPress: () => Linking.openURL(res.storeUrl) }
          ]
        )
      } else {
        console.log('최신버전!')
      }
    });

  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator headerMode={'none'}>
          <Stack.Screen name="바코드체크" component={barcodeCheck} />
          <Stack.Screen name="가격비교" component={PriceVs} />
          <Stack.Screen name="찜목록" component={Jjim} />
          <Stack.Screen name="더보기" component={Plusview} />

          <Stack.Screen name="웹뷰" component={Wb} />
          <Stack.Screen name="옥션웹뷰" component={Auction_wb} />
          <Stack.Screen name="쿠팡웹뷰" component={Coupang_wb} />
          <Stack.Screen name="지마켓웹뷰" component={Gmarket_wb} />
          <Stack.Screen name="인터파크웹뷰" component={Interpart_wb} />
          <Stack.Screen name="11번가웹뷰" component={Oost_wb} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>

  )
}


