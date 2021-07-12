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
import { useNavigation } from '@react-navigation/native';


var rnw
var cbc = false;

const chwidth = Dimensions.get('window').width
const w33 = chwidth / 3

const Wb = ({ route }) => {
    const navigation = useNavigation()

    const { pname } = route.params

    console.log('뭐지? ' + JSON.stringify(pname))

    const barcodeimg = require('../img/barcode_img.png')

    var uri = 'https://msearch.shopping.naver.com/search/all?query=' + pname

    const [key, setKey] = useState(1)

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hwbp",
            function () {
                if (cbc && rnw) {
                    rnw.goBack();
                    return true;
                } else {
                    console.log('확인' + pname)
                    var pp = pname
                    navigation.navigate('가격비교', { pname: pp })
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
        <View style={{ flex: 1 }}>
            <WebView
                key={key}
                ref={wb => { rnw = wb }}
                source={{ uri: uri }}
                style={{ width: '100%', height: '90%' }}
                onNavigationStateChange={(navState) => { cbc = navState.canGoBack; }}
            />
            <View style={{ width: '100%', height: '10%', backgroundColor: 'white', flexDirection: 'row' }}>
                <TouchableWithoutFeedback onPress={() => { navigation.navigate('가격비교', { pname: pname }) }}>
                    <View style={{ width: w33, height: '100%', backgroundColor: 'rgb(125,138,168)', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>뒤로가기</Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => { navigation.navigate('바코드체크') }}>
                    <View style={{ width: w33, height: '100%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                        {/* <AutoHeightImage source={barcodeimg} width={w33 - 80}></AutoHeightImage> */}
                        <Text style={{ marginTop: 5 }}>바코드화면</Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => { }}>
                    <View style={{ width: w33, height: '100%', backgroundColor: 'rgb(255,150,0)', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>찜해두기</Text>
                    </View>
                </TouchableWithoutFeedback>

            </View>
        </View>
    )
}

export default Wb