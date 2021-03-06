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
    Alert, TouchableWithoutFeedback

} from 'react-native';

if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;

import Icon from 'react-native-vector-icons/Ionicons';

import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';

const adUnitId = 'ca-app-pub-8664195159890176/9599301349';

import { WebView } from 'react-native-webview';

import { useRecoilState } from 'recoil';
import { productImg, productList, productName } from '../atom/atoms';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AutoHeightImage from 'react-native-auto-height-image';


var rnw
var cbc = false;

const chwidth = Dimensions.get('window').width
const w33 = chwidth / 3

const newlogo2 = require('../img/newlogo2.jpg')


const Wb = () => {

    const navigation = useNavigation()

    const [productN, setProductN] = useRecoilState(productName)
    const [atomList, setatomList] = useRecoilState(productList)
    const [atomImg, setAtomImg] = useRecoilState(productImg)


    const barcodeimg = require('../img/barcode_img.png')

    // var uri = 'https://msearch.shopping.naver.com/search/all?query=' + productN
    var uri = 'https://msearch.shopping.naver.com/search/all?frm=NVSHSRC&pagingIndex=1&pagingSize=40&productSet=total&query=' + productN + '&sort=price_asc&viewType=lst'
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

    useEffect(() => {
        console.log('effect?????? ===' + JSON.stringify(atomList))
        storeData_jjim(atomList)
    }, [atomList])

    const storeData_jjim = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@jjim_list', jsonValue)
            console.log('????????????')
        } catch (e) {
            // saving error
            console.log(e)
        }
    }


    function savelist() {
        for (var i = 0; i < atomList.length; i++) {
            if (atomList[i].name == productN) {
                Alert.alert('?????? ????????? ???????????? ???????????????.')
                navigation.goBack()
                return
            }
        }

        setatomList((ex) => [...ex,
        {
            name: productN,
            where: '?????????',
            img: atomImg
        }
        ])
        setProductN('')
        setAtomImg('')

        Alert.alert('??? ??????!')
        navigation.navigate('???????????????')
    }

    return (
        <View style={{ width: '100%', height: '100%' }}>

            {/* ?????? ?????? */}
            <View style={{ backgroundColor: '#6E6E6E', width: '100%', height: '6%', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignItems: 'center' }}>
                    <TouchableWithoutFeedback onPress={() => { navigation.goBack() }}>
                        <View style={{ width: '20%' }}>
                            <Icon name='ios-arrow-back-sharp' color='orange' style={{ fontSize: 30 }}></Icon>
                        </View>
                    </TouchableWithoutFeedback>

                    <AutoHeightImage width={50} style={{ maxHeight: 50, marginLeft: 10, marginRight: 10 }} source={newlogo2}></AutoHeightImage>

                    <TouchableWithoutFeedback onPress={() => {
                        savelist()
                    }}>
                        <View style={{ width: '20%', borderRadius: 10, backgroundColor: '#ffe6b3', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 18, color: 'orange', fontWeight: 'bold', margin: 3 }}>?????????</Text>
                        </View>
                    </TouchableWithoutFeedback>

                </View>
            </View>

            {/* ?????? ??? */}



            <View style={{ flex: 1 }}>
                <WebView
                    key={key}
                    ref={wb => { rnw = wb }}
                    source={{ uri: uri }}
                    style={{ width: '100%', height: '100%' }}
                    onNavigationStateChange={(navState) => { cbc = navState.canGoBack; }}
                />
            </View>

            <View style={{ width: '100%', height: '10%' }}>
                <BannerAd
                    unitId={adUnitId}
                    size={BannerAdSize.SMART_BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                />
            </View>

            {/* ????????? ?????? */}
            {/* <View style={{ width: '100%', height: '8%', backgroundColor: '#ffe6b3', justifyContent: 'center', alignItems: 'center' }}>

                <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>

                    <TouchableWithoutFeedback onPress={() => navigation.navigate('???????????????')}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text><Icon style={{ fontSize: 30, color: '#e69900' }} name="barcode-sharp" color="black"></Icon></Text>
                            <Text style={{ color: '#e69900' }}>?????????</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => navigation.navigate('????????????')}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text><Icon style={{ fontSize: 30, color: '#e64d00' }} name="pricetags-outline" color="black"></Icon></Text>
                            <Text style={{ color: '#e64d00' }}>????????????</Text>
                        </View>
                    </TouchableWithoutFeedback>


                    <TouchableWithoutFeedback onPress={() => navigation.navigate('?????????')}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text><Icon style={{ fontSize: 30, color: '#e69900' }} name="cart-outline" color="black"></Icon></Text>
                            <Text style={{ color: '#e69900' }}>?????????</Text>
                        </View>
                    </TouchableWithoutFeedback>


                    <TouchableWithoutFeedback onPress={() => navigation.navigate('?????????')}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text><Icon style={{ fontSize: 30, color: '#e69900' }} name="grid-outline" color="black"></Icon></Text>
                            <Text style={{ color: '#e69900' }}>?????????</Text>
                        </View>
                    </TouchableWithoutFeedback>

                </View>


            </View> */}
            {/* ????????? ??? */}


        </View>
    )
}

export default Wb