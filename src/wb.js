import React, { Component, useEffect } from 'react';
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

    const [productN, setProductN] = useRecoilState(productName)

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

    useEffect(() => {
        console.log(rnw)
    }, [rnw])

    return (
        <View style={{ flex: 1 }}>
            <WebView
                ref={wb => { rnw = wb }}
                source={{ uri: 'https://msearch.shopping.naver.com/search/all?query=' + productN }}
                style={{ width: '100%', height: '90%' }}
                onNavigationStateChange={(navState) => { cbc = navState.canGoBack; }}
            />
            <View style={{ width: '100%', height: '10%', backgroundColor: 'blue' }}></View>
        </View>
    )
}

export default Wb