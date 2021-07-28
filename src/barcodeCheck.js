import axios from 'axios';
import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
const cheerio = require('cheerio');
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
    TouchableWithoutFeedback
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';


if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;


import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { productCurList, productImg, productList, productName } from '../atom/atoms';

import AsyncStorage from '@react-native-async-storage/async-storage';


const chwidth = Dimensions.get('screen').width
const chheight = Dimensions.get('screen').height

var checkappboot = 0

const BarcodeCheck = () => {
    const navigation = useNavigation()

    const camera = useRef()
    const [barcc, setBarcc] = useState('바코드 탐지중!')

    const [atomImg, setAtomImg] = useRecoilState(productImg)
    const [productN, setProductN] = useRecoilState(productName)

    const [atomCurList, setatomCurList] = useRecoilState(productCurList)
    const [atomList, setatomList] = useRecoilState(productList)


    const bottomSheetModalRef = useRef(< BottomSheetModal ></BottomSheetModal>);

    // variables
    const snapPoints = useMemo(() => ['40%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);



    function barcodeCheck(pp) {

        var regex = /[a-z0-9]|[\[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;

        axios.get('http://www.koreannet.or.kr/home/hpisSrchGtin.gs1?gtin=' + pp,
        ).then(function (response) {

            const $ = cheerio.load(response.data);

            // console.log($('div.productDetailView').find('div.productTit').text().indexOf(pp))

            var test = $('div.productDetailView').find('div.productTit').text();

            var arr = test.trim().substring(13, test.length).trim().split(' ')
            var target = arr.indexOf($('div.productDetailView').find('dd.productDetail').find('dl').find('dd:nth-of-type(2)').text())

            console.log('회사명 불러오기' + $('div.productDetailView').find('dd.productDetail').find('dl').find('dd:nth-of-type(2)').text())


            // console.log(test.substring(25, test.length).split(' '))
            setAtomImg($('div.productDetailView').find('div.imgArea').find('img').attr('src'))


            if (arr.indexOf($('div.productDetailView').find('dd.productDetail').find('dl').find('dd:nth-of-type(2)').text()) < 0) {
                //회사명 미포함
                console.log('회사명 미포함')

                setProductN(arr.join(' ').replace(regex, ''))
            } else {
                //회사명 포함
                console.log('회사명 포함 : ' + target)

                arr.splice(arr.indexOf($('div.productDetailView').find('dd.productDetail').find('dl').find('dd:nth-of-type(2)').text()), 1)
                // arr.splice(arr.length - 1, 1, arr[arr.length - 1].replace(/ /g, ""))

                setProductN(arr.join(' ').replace(regex, ''))
            }

        }).catch(function (error) {
            Alert.alert('인터넷 연결을 확인하세요!')
            console.log(error);
        })

    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@choi_list')
            console.log('choi : ')
            console.log(jsonValue != null ? JSON.parse(jsonValue) : null)
            setatomCurList(jsonValue != null ? JSON.parse(jsonValue) : [])
        } catch (e) {
            // error reading value
            console.log(e)
        }
    }

    const getData_jjim = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@jjim_list')
            console.log('jjim : ')
            console.log(jsonValue != null ? JSON.parse(jsonValue) : null)
            setatomList(jsonValue != null ? JSON.parse(jsonValue) : [])
        } catch (e) {
            // error reading value
            console.log(e)
        }
    }

    const storeData = async (value) => {
        console.log('뭐지??????????????? ' + JSON.stringify(value))

        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@choi_list', jsonValue)
            console.log('어싱크 저장완료')
        } catch (e) {
            // saving error
            console.log(e)
        }
    }

    useEffect(() => {
        if (checkappboot == 0) {
            getData()
            getData_jjim()
            checkappboot = 1
        }
    }, [checkappboot])

    useEffect(() => {
        console.log('effect확인 ===' + JSON.stringify(atomCurList))
        storeData(atomCurList)
    }, [atomCurList])

    function savechoi() {

        for (var i = 0; i < atomCurList.length; i++) {
            if (atomCurList[i].name == productN) {
                navigation.navigate('가격비교')
                console.log('최근 본 목록에 이미 존재합니다.')
                return
            }
        }

        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month

        if (String(date).length == 1) {
            date = '0' + date
        }

        if (String(month).length == 1) {
            month = '0' + month
        }

        setatomCurList((ex) => [...ex,
        {
            name: productN,
            img: atomImg,
            date: month + '-' + date
        }
        ])

        navigation.navigate('가격비교')
        console.log('최근 본 목록에 추가합니다.')

        return

    }


    return (
        <BottomSheetModalProvider>
            <View style={{ width: '100%', height: '100%' }}>

                <View style={{ width: '100%', height: '92%' }}>
                    <View style={{ width: '100%', height: '70%' }}>

                        <RNCamera
                            ref={camera}
                            style={{ width: chwidth, height: '100%', alignSelf: "center" }}
                            type={RNCamera.Constants.Type.back}
                            flashMode={RNCamera.Constants.FlashMode.auto}
                            androidCameraPermissionOptions={{
                                title: '카메라 사용 권한',
                                message: '카메라 사용 권한 허용이 필요합니다.',
                                buttonPositive: '확인',
                                buttonNegative: '거절',
                            }}

                            onBarCodeRead={(data) => {
                                setBarcc(data.data)
                                barcodeCheck(data.data)
                            }}>
                            <BarcodeMask
                                width={'80%'} height={'50%'} showAnimatedLine={true} outerMaskOpacity={0.8}
                            />
                        </RNCamera>

                    </View>

                    <View style={{ width: '100%', height: '30%', backgroundColor: 'white' }}>
                        <View style={{ height: '60%' }}>
                            <View style={{ width: chwidth - 40, marginLeft: 20, alignItems: 'center', flexDirection: 'row', marginTop: '3%' }}>
                                <Text><Icon style={{ fontSize: 45, color: productN === '' ? 'gray' : 'orange' }} name="barcode-sharp" color="black" /> </Text><Text style={{}}> :   {barcc}</Text>
                            </View>

                            {productN != '' ?
                                <View style={{ width: chwidth - 40, marginLeft: 20, alignItems: 'center', flexDirection: 'row' }}>
                                    <Text><Icon style={{ fontSize: 45, color: 'orange' }} name="basket-sharp" color="black" /></Text><Text>  :   {productN}</Text>
                                </View>
                                :
                                <View style={{ width: chwidth - 40, marginLeft: 20, alignItems: 'center', flexDirection: 'row' }}>
                                    <Text><Icon style={{ fontSize: 45 }} name="basket-sharp" color="gray" /></Text><Text>  :   상품 검색중!</Text>
                                </View>
                            }
                        </View>

                        <TouchableWithoutFeedback onPress={() => {
                            if (productN != '') {
                                savechoi()
                            }
                        }}>
                            <View style={{ width: chwidth - 40, height: '24%', borderRadius: 10, marginTop: '3%', marginLeft: 20, elevation: productN === '' ? 0 : 10, backgroundColor: productN === '' ? '#d9d9d9' : 'orange', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: productN === '' ? 'black' : 'white', fontSize: 18 }}>최저가 비교</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={{ width: '100%', height: '9%', backgroundColor: '#ffe6b3', justifyContent: 'center', alignItems: 'center' }}>

                        <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>

                            <TouchableWithoutFeedback onPress={() => { }}>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Text><Icon style={{ fontSize: 30, color: '#e64d00' }} name="barcode-sharp" color="black"></Icon></Text>
                                    <Text style={{ color: '#e64d00' }}>바코드</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => navigation.navigate('가격비교')}>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Text><Icon style={{ fontSize: 30, color: '#e69900' }} name="pricetags-outline" color="black"></Icon></Text>
                                    <Text style={{ color: '#e69900' }}>가격비교</Text>
                                </View>
                            </TouchableWithoutFeedback>


                            <TouchableWithoutFeedback onPress={() => navigation.navigate('찜목록')}>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Text><Icon style={{ fontSize: 30, color: '#e69900' }} name="cart-outline" color="black"></Icon></Text>
                                    <Text style={{ color: '#e69900' }}>찜목록</Text>
                                </View>
                            </TouchableWithoutFeedback>

                        </View>


                    </View>

                </View>

                <TouchableWithoutFeedback onPress={() => {

                    handlePresentModalPress()

                }}>
                    <View style={{ position: 'absolute' }}>
                        <Text style={{ color: 'orange', margin: 10, fontSize: 18 }}>직접입력</Text>
                    </View>
                </TouchableWithoutFeedback>

            </View>

            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <View style={styles.contentContainer}>
                    <Text>Awesome 🎉</Text>
                </View>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    )
}


export default BarcodeCheck