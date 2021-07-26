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

import { WebView } from 'react-native-webview';

import { useRecoilState } from 'recoil';
import { productImg, productList, productName } from '../atom/atoms';
import { useNavigation } from '@react-navigation/native';


var rnw
var cbc = false;

const chwidth = Dimensions.get('window').width
const w33 = chwidth / 3

const Gmarket_wb = () => {
    const navigation = useNavigation()

    const [productN, setProductN] = useRecoilState(productName)
    const [atomList, setatomList] = useRecoilState(productList)
    const [atomImg, setAtomImg] = useRecoilState(productImg)


    const barcodeimg = require('../img/barcode_img.png')

    var uri = 'https://browse.gmarket.co.kr/m/search?keyword=' + productN

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
        console.log('effect확인 ===' + JSON.stringify(atomList))
        storeData_jjim(atomList)
    }, [atomList])

    const storeData_jjim = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@jjim_list', jsonValue)
            console.log('저장완료')
        } catch (e) {
            // saving error
            console.log(e)
        }
    }


    function savelist() {
        for (var i = 0; i < atomList.length; i++) {
            if (atomList[i].name == productN) {
                Alert.alert('이미 제품이 찜목록에 존재합니다.')
                navigation.goBack()
                return
            }
        }

        setatomList((ex) => [...ex,
        {
            name: productN,
            where: '지마켓',
            img: atomImg
        }
        ])
        setProductN('')
        setAtomImg('')

        Alert.alert('저장완료')
        navigation.navigate('바코드체크')
    }

    return (
        <View style={{ width: '100%', height: '100%' }}>

            {/* 헤더 시작 */}
            <View style={{ backgroundColor: '#6E6E6E', width: '100%', height: '8%', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignItems: 'center' }}>
                    <TouchableWithoutFeedback onPress={() => { navigation.goBack() }}>
                        <View style={{ width: '20%' }}>
                            <Icon name='ios-arrow-back-sharp' color='orange' style={{ fontSize: 40 }}></Icon>
                        </View>
                    </TouchableWithoutFeedback>

                    <View style={{ width: '20%', alignItems: 'center' }}>
                        <Text style={{ fontSize: 40, color: 'orange', fontWeight: 'bold' }}><Icon style={{ fontSize: 40 }} name="cart-sharp"></Icon></Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', position: 'absolute', top: '8%', left: '45%' }}>P</Text>
                    </View>

                    <TouchableWithoutFeedback onPress={() => {
                        savelist()
                    }}>
                        <View style={{ width: '20%', borderRadius: 10, backgroundColor: '#ffe6b3', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, color: 'orange', fontWeight: 'bold', margin: 5 }}>찜하기</Text>
                        </View>
                    </TouchableWithoutFeedback>

                </View>
            </View>

            {/* 헤더 끝 */}



            <View style={{ width: '100%', height: '84%' }}>
                <WebView
                    key={key}
                    ref={wb => { rnw = wb }}
                    source={{ uri: uri }}
                    style={{ width: '100%', height: '100%' }}
                    onNavigationStateChange={(navState) => { cbc = navState.canGoBack; }}
                />
            </View>

            {/* 하단바 시작 */}
            <View style={{ width: '100%', height: '8%', backgroundColor: '#ffe6b3', justifyContent: 'center', alignItems: 'center' }}>

                <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>

                    <TouchableWithoutFeedback onPress={() => navigation.navigate('바코드체크')}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text><Icon style={{ fontSize: 30, color: '#e69900' }} name="barcode-sharp" color="black"></Icon></Text>
                            <Text style={{ color: '#e69900' }}>바코드</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => navigation.navigate('가격비교')}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text><Icon style={{ fontSize: 30, color: '#e64d00' }} name="pricetags-outline" color="black"></Icon></Text>
                            <Text style={{ color: '#e64d00' }}>가격비교</Text>
                        </View>
                    </TouchableWithoutFeedback>


                    <TouchableWithoutFeedback onPress={() => navigation.navigate('찜목록')}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text><Icon style={{ fontSize: 30, color: '#e69900' }} name="cart-outline" color="black"></Icon></Text>
                            <Text style={{ color: '#e69900' }}>찜목록</Text>
                        </View>
                    </TouchableWithoutFeedback>


                    {/* <TouchableWithoutFeedback onPress={() => navigation.navigate('더보기')}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text><Icon style={{ fontSize: 30, color: '#e69900' }} name="grid-outline" color="black"></Icon></Text>
                            <Text style={{ color: '#e69900' }}>더보기</Text>
                        </View>
                    </TouchableWithoutFeedback> */}

                </View>


            </View>
            {/* 하단바 끝 */}


        </View>
    )
}

export default Gmarket_wb