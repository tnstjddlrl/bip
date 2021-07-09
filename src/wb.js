import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Dimensions,
    BackHandler,
    Alert
} from 'react-native';

import { WebView } from 'react-native-webview';

import { useRecoilState } from 'recoil';
import { productName } from '../atom/atoms';


var rnw
var cbc = false;


const Wb = () => {

    var uri = 'https://msearch.shopping.naver.com/search/all?query=' + productN

    const [key, setKey] = useState(1)

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hwbp",
            function () {
                if (cbc && rnw) {
                    rnw.goBack();
                    return true;
                }
            }
        );
        return () => backHandler.remove();
    }, []);

    console.log('넘어온 값 : ' + productN)

    useEffect(() => {
        setKey((k) => k + 1)
        console.log(key)
    }, [productN])

    return (
        <View style={{ flex: 1 }}>
            <WebView
                key={key}
                ref={wb => { rnw = wb }}
                source={{ uri: uri }}
                style={{ width: '100%', height: '90%' }}
                onNavigationStateChange={(navState) => { cbc = navState.canGoBack; }}
            />
            <View style={{ width: '100%', height: '10%', backgroundColor: 'blue' }}></View>
        </View>
    )
}

export default Wb