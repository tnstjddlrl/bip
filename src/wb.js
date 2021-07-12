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

import Icon from 'react-native-vector-icons/Ionicons';

import { WebView } from 'react-native-webview';

import { useRecoilState } from 'recoil';
import { productName } from '../atom/atoms';
import { useNavigation } from '@react-navigation/native';


var rnw
var cbc = false;

const chwidth = Dimensions.get('window').width
const w33 = chwidth / 3

const Wb = () => {
    const navigation = useNavigation()

    const [productN, setProductN] = useRecoilState(productName)


    const barcodeimg = require('../img/barcode_img.png')

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

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setKey((k) => k + 1)
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={{ width: '100%', height: '100%' }}>
            <View style={{ width: '100%', height: '92%' }}>
                <WebView
                    key={key}
                    ref={wb => { rnw = wb }}
                    source={{ uri: uri }}
                    style={{ width: '100%', height: '100%' }}
                    onNavigationStateChange={(navState) => { cbc = navState.canGoBack; }}
                />
            </View>
            <View style={{ width: '100%', height: '8%', backgroundColor: '#ffe6b3', justifyContent: 'center', alignItems: 'center' }}>

                <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text><Icon style={{ fontSize: 30 }} name="barcode-sharp" color="black"></Icon></Text>
                        <Text>바코드</Text>
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text><Icon style={{ fontSize: 30 }} name="pricetags-outline" color="black"></Icon></Text>
                        <Text>가격비교</Text>
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text><Icon style={{ fontSize: 30 }} name="basket-outline" color="black"></Icon></Text>
                        <Text>찜목록</Text>
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text><Icon style={{ fontSize: 30 }} name="grid-outline" color="black"></Icon></Text>
                        <Text>더보기</Text>
                    </View>
                </View>


            </View>
        </View>
    )
}

export default Wb