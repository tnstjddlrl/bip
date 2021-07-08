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
    Alert,
    TextInput
} from 'react-native';

import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';

const adUnitId = 'ca-app-pub-8664195159890176/9599301349';

const PriceVs = () => {
    const [name, setName] = useState('')


    return (
        <View style={{ width: '100%', height: '100%' }}>
            <View style={{ flex: 1 }}>
                <TextInput onChange={(txt) => setName(txt)} value={name}></TextInput>


            </View>

            <View style={{ width: '100%' }}>
                <BannerAd
                    unitId={adUnitId}
                    size={BannerAdSize.SMART_BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                />

            </View>
        </View>
    )
}

export default PriceVs