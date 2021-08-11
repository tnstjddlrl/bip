import React, { Component, useEffect, useRef } from 'react';
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
    Alert,
    TouchableWithoutFeedback,
    Image
} from 'react-native';

if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;

import Icon from 'react-native-vector-icons/Ionicons';

import { useRecoilState } from 'recoil';
import { productCurList, productImg, productList, productName } from '../atom/atoms';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';


import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import AutoHeightImage from 'react-native-auto-height-image';

const adUnitId = 'ca-app-pub-8664195159890176/9599301349';


const chwidth = Dimensions.get('window').width

const newlogo2 = require('../img/newlogo2.jpg')


const JjimItem = (prop) => {
    const navigation = useNavigation()

    const [atomList, setatomList] = useRecoilState(productList)
    const [productN, setProductN] = useRecoilState(productName)

    if (prop.img == '/images/common/no_img.gif') {
        var uri = ''
        var noimg = true
    } else {
        var uri = prop.img
        var noimg = false
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            switch (prop.where) {
                case '네이버':
                    console.log('네이버');
                    setProductN(prop.name)
                    navigation.navigate('웹뷰')
                    break;
                case '옥션':
                    console.log('옥션');
                    setProductN(prop.name)
                    navigation.navigate('옥션웹뷰')
                    break;
                case '쿠팡':
                    console.log('쿠팡');
                    setProductN(prop.name)
                    navigation.navigate('쿠팡웹뷰')
                    break;
                case '지마켓':
                    console.log('지마켓');
                    setProductN(prop.name)
                    navigation.navigate('지마켓웹뷰')
                    break;
                case '인터파크':
                    console.log('인터파크');
                    setProductN(prop.name)
                    navigation.navigate('인터파크웹뷰')
                    break;
                case '11번가':
                    console.log('11번가');
                    setProductN(prop.name)
                    navigation.navigate('11번가웹뷰')
                    break;
            }
        }}
            onLongPress={(e) => {
                console.log(prop.id),
                    setatomList((ex) => [
                        ...ex.slice(0, prop.id),
                        ...ex.slice(prop.id + 1, ex.length)
                    ])


            }}
        >
            <View style={{ width: chwidth / 3 - 20, justifyContent: 'center', alignItems: 'center', marginTop: 25, marginLeft: 15 }}>
                <View style={{ width: chwidth / 3 - 20, height: chwidth / 3 - 20, borderRadius: 20, borderWidth: 1, borderColor: 'gray', justifyContent: 'center', alignItems: 'center' }}>
                    {uri != '' ?
                        <Image source={{ uri: uri }} style={{ width: '100%', height: '100%', borderRadius: 20, }}></Image>
                        :
                        <Text style={{ fontFamily: 'DoHyeon-Regular' }}>관련 이미지 없음</Text>
                    }
                </View>
                <Text numberOfLines={1} style={{ fontWeight: 'bold', marginTop: 3 }}>{prop.name.replace(' ', '')}</Text>
                <Text numberOfLines={1} style={{ marginTop: 3 }}>{prop.where}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const JjimPush = () => {

    const [atomList, setatomList] = useRecoilState(productList)

    var List = []

    for (var i = 0; i < atomList.length; i++) {
        List.push(<JjimItem key={i} id={i} name={atomList[i].name} where={atomList[i].where} img={atomList[i].img}></JjimItem>)
    }

    console.log(atomList)

    return List;
}


const ChoiItem = (prop) => {
    const navigation = useNavigation()

    const [productN, setProductN] = useRecoilState(productName)
    const [atomImg, setAtomImg] = useRecoilState(productImg)
    const [atomCurList, setatomCurList] = useRecoilState(productCurList)


    if (prop.img == '/images/common/no_img.gif') {
        var uri = ''
    } else {
        var uri = prop.img
    }


    return (
        <TouchableWithoutFeedback
            onPress={() => {
                setProductN(prop.name)
                setAtomImg(prop.img)
                setTimeout(() => {
                    navigation.navigate('가격비교')
                }, 200);
            }}
            onLongPress={(e) => {
                console.log(prop.id),
                    setatomCurList((ex) => [
                        ...ex.slice(0, prop.id),
                        ...ex.slice(prop.id + 1, ex.length)
                    ])

            }}
        >
            <View style={{ width: chwidth / 3 - 20, justifyContent: 'center', alignItems: 'center', marginTop: 25, marginLeft: 15 }}>
                <View style={{ width: chwidth / 3 - 20, height: chwidth / 3 - 20, borderRadius: 20, borderWidth: 1, borderColor: 'gray', justifyContent: 'center', alignItems: 'center' }}>
                    {uri != '' ?
                        <Image source={{ uri: uri }} style={{ width: '100%', height: '100%', borderRadius: 20, }}></Image>
                        :
                        <Text style={{ fontFamily: 'DoHyeon-Regular' }}>관련 이미지 없음</Text>
                    }
                </View>
                <Text numberOfLines={1} style={{ fontWeight: 'bold', marginTop: 3 }}>{prop.name}</Text>
                <Text>{prop.date}</Text>

            </View>
        </TouchableWithoutFeedback>
    )
}


const ChoiPush = () => {

    const [atomCurList, setatomCurList] = useRecoilState(productCurList)

    var List = []

    for (var i = 0; i < atomCurList.length; i++) {
        List.push(<ChoiItem key={i} id={i} name={atomCurList[i].name} img={atomCurList[i].img} date={atomCurList[i].date}></ChoiItem>)
    }

    console.log(atomCurList)

    return List;
}






const Jjim = () => {
    const ii = useRef()

    const navigation = useNavigation()

    const [state, setState] = useState('jjim')

    const [atomList, setatomList] = useRecoilState(productList)
    const [atomCurList, setatomCurList] = useRecoilState(productCurList)

    useEffect(() => {
        console.log('effect확인 ===' + JSON.stringify(atomCurList))
        storeData(atomCurList)
    }, [atomCurList])

    useEffect(() => {
        console.log('effect확인 ===' + JSON.stringify(atomList))
        storeData_jjim(atomList)
    }, [atomList])

    const storeData = async (value) => {
        console.log('데이터 확인' + JSON.stringify(value))

        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@choi_list', jsonValue)
            console.log('저장완료')
        } catch (e) {
            // saving error
            console.log(e)
        }
    }

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

                    <AutoHeightImage width={60} style={{ maxHeight: 50, marginLeft: 10, marginRight: 10 }} source={newlogo2}></AutoHeightImage>

                    <TouchableWithoutFeedback onPress={() => {
                        if (state == 'jjim')
                            setatomList([]);
                        else {
                            setatomCurList([])
                            storeData(atomCurList)
                        }
                    }}>
                        <View style={{ width: '21%', borderRadius: 10, backgroundColor: '#ffe6b3', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 17, color: 'orange', fontWeight: 'bold', margin: 5 }}>전체삭제</Text>
                        </View>
                    </TouchableWithoutFeedback>

                </View>
            </View>

            {/* 헤더 끝 */}

            {/* 본문 시작 */}
            <View style={{ width: '100%', height: '84%' }}>

                {/* 상단 메뉴 */}
                <View style={{ width: '100%', height: '10%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end' }}>
                    <TouchableWithoutFeedback onPress={() => { setState('jjim'), ii.current.scrollTo({ x: 0, y: 0 }) }}>
                        <Text style={{ fontSize: 25, color: state == 'jjim' ? '#e69900' : 'gray' }}>찜한 상품</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => { setState('choi'), ii.current.scrollTo({ x: 800, y: 0 }) }}>
                        <Text style={{ fontSize: 25, color: state != 'jjim' ? '#e69900' : 'gray' }}>최근 본 상품</Text>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{ width: '100%', borderWidth: 1, borderColor: 'gray', marginTop: 6 }}></View>
                {/* 상단 메뉴 끝 */}

                <ScrollView ref={ii} style={{ width: chwidth, height: '100%' }} horizontal showsHorizontalScrollIndicator={false} pagingEnabled={true}
                    onScroll={(res) => { if (res.nativeEvent.contentOffset.x < 150) setState('jjim'); else setState('choi'); }}
                >
                    {/* 찜한 상품 시작 */}
                    <ScrollView style={{ width: chwidth, height: '100%' }}>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                            <JjimPush></JjimPush>

                        </View>

                    </ScrollView>
                    {/* 찜한 상품 끝 */}

                    <View style={{ height: '100%', borderWidth: 0.5, borderColor: 'gray' }}></View>

                    {/* 최근 본 상품 시작 */}
                    <ScrollView style={{ width: chwidth, height: '100%' }}>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                            <ChoiPush></ChoiPush>
                        </View>
                    </ScrollView>
                    {/* 최근 본 상품 끝 */}

                </ScrollView>

                <View style={{ width: chwidth }}>
                    <BannerAd
                        unitId={adUnitId}
                        size={BannerAdSize.ADAPTIVE_BANNER}
                        requestOptions={{
                            requestNonPersonalizedAdsOnly: true,
                        }}
                    />
                </View>

            </View>
            {/* 본문 끝 */}

            {/* 하단바 시작 */}
            <View style={{ width: '100%', height: '9%', backgroundColor: '#ffe6b3', justifyContent: 'center', alignItems: 'center' }}>

                <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>

                    <TouchableWithoutFeedback onPress={() => navigation.navigate('바코드체크')}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text><Icon style={{ fontSize: 30, color: '#e69900' }} name="barcode-sharp" color="black"></Icon></Text>
                            <Text style={{ color: '#e69900' }}>바코드</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => navigation.navigate('가격비교')}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text><Icon style={{ fontSize: 30, color: '#e69900' }} name="pricetags-outline" color="black"></Icon></Text>
                            <Text style={{ color: '#e69900' }}>가격비교</Text>
                        </View>
                    </TouchableWithoutFeedback>


                    <TouchableWithoutFeedback onPress={() => { }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text><Icon style={{ fontSize: 30, color: '#e64d00' }} name="cart-outline" color="black"></Icon></Text>
                            <Text style={{ color: '#e64d00' }}>찜목록</Text>
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

export default Jjim