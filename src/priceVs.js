import React, { useRef, useState, useEffect } from 'react';
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
    TextInput,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';

import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import AutoHeightImage from 'react-native-auto-height-image';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { productImg, productName } from '../atom/atoms';

import Icon from 'react-native-vector-icons/Ionicons';


const adUnitId = 'ca-app-pub-8664195159890176/9599301349';

const chwidth = Dimensions.get('screen').width

const naver = require('../img/naver_logo.jpg')
const coupang = require('../img/coupang_logo.png')
const gmarket = require('../img/gmarket_logo.png')
const oost = require('../img/oost_logo.png')
const auction = require('../img/auction_logo.png')
const interpark = require('../img/interpark_logo.png')


const PriceVs = () => {

    const tip = useRef()


    const navigation = useNavigation()

    const [name, setName] = useState('')

    const [atomImg, setAtomImg] = useRecoilState(productImg)
    const [productN, setProductN] = useRecoilState(productName)


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log('넘어온 값 : ' + productN)
            // setName((ex) => productN)

            console.log(atomImg)


            if (productN === '') {
                tip.current.focus()
            }
        });

        return unsubscribe;
    }, [navigation]);


    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: '#FFFAFA' }}>

            {/* 본문 */}
            <ScrollView style={{ flex: 1 }}>

                {/* 헤더 시작 */}
                <View style={{ backgroundColor: '#6E6E6E' }}>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                        <View style={{ width: '20%', alignItems: 'center' }}>
                            <Text style={{ fontSize: 40, color: 'orange', fontWeight: 'bold' }}>B</Text>
                        </View>
                        <View style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 20, width: '75%', backgroundColor: '#DCDCDC' }}>
                            <TextInput ref={tip} style={{ color: 'black', marginLeft: 10 }} placeholder={'직접 입력해주세요.'} onChangeText={(txt) => { setName(txt), setProductN(txt), console.log(txt) }} value={name}></TextInput>
                        </View>
                    </View>
                </View>

                <View style={{ borderWidth: 0.7, borderColor: 'gray', width: '100%' }}></View>
                {/* 헤더 끝 */}

                {/* 가격 비교 버튼 시작 */}
                <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>

                    <View style={{ marginTop: 40 }}></View>

                    {/* 한줄 */}
                    <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
                        <TouchableWithoutFeedback onPress={() => { setName((ex) => productN), navigation.navigate('웹뷰') }}>
                            <View style={{ alignItems: 'center' }}>
                                <View style={{ borderWidth: 1, borderRadius: 20, borderColor: 'gray' }}>
                                    <AutoHeightImage style={{ borderRadius: 20, margin: 0.1 }} source={naver} width={chwidth / 2 - 80}></AutoHeightImage>
                                </View>
                                <Text style={{ marginTop: 10 }}>네이버</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => { }}>
                            <View style={{ alignItems: 'center' }}>
                                <View style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 20 }}>
                                    {/* <AutoHeightImage style={{ borderRadius: 20, margin: 0.1 }} source={coupang} width={chwidth / 2 - 80}></AutoHeightImage> */}
                                    <Image style={{ borderRadius: 20, margin: 0.1, width: chwidth / 2 - 80, height: chwidth / 2 - 80 }} source={coupang}></Image>
                                </View>
                                <Text style={{ marginTop: 10 }}>쿠팡</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    {/* 한줄 */}
                    <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
                        <TouchableWithoutFeedback onPress={() => { }}>
                            <View style={{ alignItems: 'center' }}>
                                <View style={{ borderWidth: 1, borderRadius: 20, borderColor: 'gray' }}>
                                    <AutoHeightImage style={{ borderRadius: 20, margin: 0.1, backgroundColor: 'white' }} source={gmarket} width={chwidth / 2 - 80}></AutoHeightImage>
                                </View>
                                <Text style={{ marginTop: 10 }}>지마켓</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => { }}>
                            <View style={{ alignItems: 'center' }}>
                                <View style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 20 }}>
                                    <Image style={{ borderRadius: 20, margin: 0.1, width: chwidth / 2 - 80, height: chwidth / 2 - 80 }} source={auction}></Image>
                                </View>
                                <Text style={{ marginTop: 10 }}>옥션</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    {/* 한줄 */}
                    <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
                        <TouchableWithoutFeedback onPress={() => { }}>
                            <View style={{ alignItems: 'center' }}>
                                <View style={{ borderWidth: 1, borderRadius: 20, borderColor: 'gray' }}>
                                    <AutoHeightImage style={{ borderRadius: 20, margin: 0.1, backgroundColor: 'white' }} source={oost} width={chwidth / 2 - 80}></AutoHeightImage>
                                </View>
                                <Text style={{ marginTop: 10 }}>11번가</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => { }}>
                            <View style={{ alignItems: 'center' }}>
                                <View style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 20 }}>
                                    <Image style={{ borderRadius: 20, margin: 0.1, width: chwidth / 2 - 80, height: chwidth / 2 - 80 }} source={interpark}></Image>
                                </View>
                                <Text style={{ marginTop: 10 }}>인터파크</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>







                </View>



                {/* 가격 비교 버튼 끝 */}


            </ScrollView>
            {/* 본문 끝 */}


            {/* 하단 광고 */}
            <View style={{ width: '100%' }}>
                <BannerAd
                    unitId={adUnitId}
                    size={BannerAdSize.SMART_BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                />
            </View>
            {/* 하단 광고 끝 */}


        </View>
    )
}

export default PriceVs