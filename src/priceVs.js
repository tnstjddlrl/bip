import React, { useRef, useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Alert,
    TextInput,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';

if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;

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
const google = require('../img/google.png')
const google_logo = require('../img/google-logo.png')


const PriceVs = () => {

    const tip = useRef()

    const navigation = useNavigation()

    const [name, setName] = useState('')

    const [atomImg, setAtomImg] = useRecoilState(productImg)
    const [productN, setProductN] = useRecoilState(productName)

    useEffect(() => {
        console.log('넘어온 값 : ' + productN)
        setName(productN)
    }, [])


    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: '#FFFAFA' }}>

            <View style={{ height: '92%' }}>

                {/* 헤더 시작 */}
                <View style={{ backgroundColor: '#6E6E6E' }}>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                        <View style={{ width: '20%', alignItems: 'center', marginTop: 5 }}>
                            <Text style={{ fontSize: 40, color: 'orange', fontWeight: 'bold' }}><Icon style={{ fontSize: 40 }} name="cart-sharp"></Icon></Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', position: 'absolute', top: '8%', left: '45%' }}>P</Text>
                        </View>
                        <View style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 20, width: '75%', backgroundColor: '#DCDCDC', alignItems: 'center', justifyContent: 'center' }}>
                            <TextInput ref={tip} style={{ color: 'black', marginLeft: 10, width: '100%' }} placeholder={'직접 입력해주세요.'} onChangeText={(txt) => { setName(txt), setProductN(txt), console.log(txt) }} value={name}></TextInput>
                            <TouchableWithoutFeedback onPress={() => { setName(''), setProductN('') }}>
                                <View style={{ position: 'absolute', right: '5%', top: '25%', alignItems: 'center' }}><Icon name='close-circle' color={'gray'} style={{ fontSize: 20 }}></Icon></View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>

                <View style={{ borderWidth: 0.7, borderColor: 'gray', width: '100%' }}></View>
                {/* 헤더 끝 */}



                {/* 본문 */}
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

                    {/* 가격 비교 버튼 시작 */}
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>

                        <View style={{ marginTop: 30 }}></View>

                        {/* 한줄 */}
                        <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
                            <TouchableWithoutFeedback onPress={() => { setName(productN), navigation.navigate('웹뷰') }}>
                                <View style={{ alignItems: 'center' }}>
                                    <View style={{ borderWidth: 1, borderRadius: 20, borderColor: 'gray' }}>
                                        <AutoHeightImage style={{ borderRadius: 20, margin: 0.1 }} source={naver} width={chwidth / 2 - 80}></AutoHeightImage>
                                    </View>
                                    <Text style={{ marginTop: 10 }}>네이버</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => { setName(productN), navigation.navigate('쿠팡웹뷰') }}>
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
                            <TouchableWithoutFeedback onPress={() => { setName(productN), navigation.navigate('지마켓웹뷰') }}>
                                <View style={{ alignItems: 'center' }}>
                                    <View style={{ borderWidth: 1, borderRadius: 20, borderColor: 'gray' }}>
                                        <AutoHeightImage style={{ borderRadius: 20, margin: 0.1, backgroundColor: 'white' }} source={gmarket} width={chwidth / 2 - 80}></AutoHeightImage>
                                    </View>
                                    <Text style={{ marginTop: 10 }}>지마켓</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => { setName(productN), navigation.navigate('옥션웹뷰') }}>
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
                            <TouchableWithoutFeedback onPress={() => { setName(productN), navigation.navigate('11번가웹뷰') }}>
                                <View style={{ alignItems: 'center' }}>
                                    <View style={{ borderWidth: 1, borderRadius: 20, borderColor: 'gray' }}>
                                        <AutoHeightImage style={{ borderRadius: 20, margin: 0.1, backgroundColor: 'white' }} source={google_logo} width={chwidth / 2 - 80}></AutoHeightImage>
                                    </View>
                                    <Text style={{ marginTop: 10 }}>구글</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => { setName(productN), navigation.navigate('인터파크웹뷰') }}>
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

            {/* 하단바 시작 */}
            <View style={{ width: '100%', height: '8%', backgroundColor: '#ffe6b3', justifyContent: 'center', alignItems: 'center' }}>

                <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>

                    <TouchableWithoutFeedback onPress={() => navigation.navigate('바코드체크')}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text><Icon style={{ fontSize: 30, color: '#e69900' }} name="barcode-sharp" color="black"></Icon></Text>
                            <Text style={{ color: '#e69900' }}>바코드</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => { }}>
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

export default PriceVs