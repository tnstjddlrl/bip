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
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import AutoHeightImage from 'react-native-auto-height-image';

import { WebView } from 'react-native-webview';

import { useRecoilState } from 'recoil';
import { productName } from '../atom/atoms';


var rnw
var cbc = false;

const chwidth = Dimensions.get('screen').width


const Wb = () => {
    const barcodeimg = require('../img/barcode_img.png')

    const [productN, setProductN] = useRecoilState(productName)

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
            <View style={{ width: '100%', height: '10%', backgroundColor: 'white', flexDirection: 'row' }}>
                <TouchableWithoutFeedback>
                    <View style={{ width: '33%', height: '100%', backgroundColor: 'yellow', justifyContent: 'center', alignItems: 'center' }}>
                        <Text>뒤로가기</Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback>
                    <View style={{ width: '33%', height: '100%', backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center' }}>
                        {/* <AutoHeightImage></AutoHeightImage> */}
                        <Text>바코드화면</Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback>
                    <View style={{ width: '33%', height: '100%', backgroundColor: 'skyblue', justifyContent: 'center', alignItems: 'center' }}>
                        <Text>찜해두기</Text>
                    </View>
                </TouchableWithoutFeedback>

            </View>
        </View>
    )
}

export default Wb