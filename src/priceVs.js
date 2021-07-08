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
    TextInput,
    Image,
    TouchableWithoutFeedback
} from 'react-native';

import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import AutoHeightImage from 'react-native-auto-height-image';

const adUnitId = 'ca-app-pub-8664195159890176/9599301349';

const PriceVs = () => {
    const [name, setName] = useState('')


    const naver = require('../img/naver_logo.png')
    const coupang = require('../img/coupang_logo.jpg')
    const gmarket = require('../img/gmarket_logo.jpg')
    const oost = require('../img/oost_logo.png')
    const auction = require('../img/auction_logo.jpg')

    return (
        <View style={{ width: '100%', height: '100%' }}>

            {/* 본문 */}
            <View style={{ flex: 1 }}>

                {/* 헤더 시작 */}
                <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                    <View style={{ width: '20%', alignItems: 'center' }}>
                        <Text style={{ fontSize: 40, color: 'orange', fontWeight: 'bold' }}>B</Text>
                    </View>
                    <View style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 20, width: '75%' }}>
                        <TextInput onChange={(txt) => setName(txt)} value={name}></TextInput>
                    </View>
                </View>

                <View style={{ borderWidth: 0.7, borderColor: 'gray', width: '100%' }}></View>
                {/* 헤더 끝 */}

                {/* 가격 비교 버튼 시작 */}
                <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>

                    <View style={{ marginTop: 60 }}></View>

                    <TouchableWithoutFeedback onPress={() => { }}>
                        <View style={{ width: '70%', height: 50, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderWidth: 0.5, borderRadius: 10, marginBottom: 30 }}>
                            <AutoHeightImage source={naver} width={70}></AutoHeightImage>
                            <Text>가격비교</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => { }}>
                        <View style={{ width: '70%', height: 50, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderWidth: 0.5, borderRadius: 10, marginBottom: 30 }}>
                            <AutoHeightImage source={coupang} width={70}></AutoHeightImage>
                            <Text>가격비교</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => { }}>
                        <View style={{ width: '70%', height: 50, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderWidth: 0.5, borderRadius: 10, marginBottom: 30 }}>
                            <AutoHeightImage source={gmarket} width={70}></AutoHeightImage>
                            <Text>가격비교</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => { }}>
                        <View style={{ width: '70%', height: 50, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderWidth: 0.5, borderRadius: 10, marginBottom: 30 }}>
                            <AutoHeightImage source={oost} width={70}></AutoHeightImage>
                            <Text>가격비교</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => { }}>
                        <View style={{ width: '70%', height: 50, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderWidth: 0.5, borderRadius: 10, marginBottom: 30 }}>
                            <AutoHeightImage source={auction} width={70}></AutoHeightImage>
                            <Text>가격비교</Text>
                        </View>
                    </TouchableWithoutFeedback>


                </View>



                {/* 가격 비교 버튼 끝 */}


            </View>
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