import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
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

import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import { useNavigation } from '@react-navigation/native';

const chwidth = Dimensions.get('screen').width
const chheight = Dimensions.get('screen').height


const BarcodeCheck = () => {
    const navigation = useNavigation()


    const camera = useRef()
    const [barcc, setBarcc] = useState('바코드 탐지중!')
    const [product, setproduct] = useState('')

    function barcodeCheck(pp) {
        // 8809482500662
        axios.get('http://www.koreannet.or.kr/home/hpisSrchGtin.gs1?gtin=' + pp,
        ).then(function (response) {

            const $ = cheerio.load(response.data);

            var test = $('div.productDetailView').find('div.productTit').text().replace(/(\s*)/g, "");

            console.log(test.substring(13, test.length))
            setproduct(test.substring(13, test.length))

        }).catch(function (error) {
            Alert.alert('인터넷 연결을 확인하세요!')
            console.log(error);
        })
    }

    return (
        <View style={{ flex: 1 }}>
            <RNCamera
                ref={camera}
                style={{ width: chwidth, height: chheight - 200, alignSelf: "center" }}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.auto}
                androidCameraPermissionOptions={{
                    title: '카메라 사용 권한',
                    message: '카메라 사용 권한 허용이 필요합니다.',
                    buttonPositive: '확인',
                    buttonNegative: '거절',
                }}

                onBarCodeRead={(data) => {
                    setTimeout(() => {
                        setBarcc(data.data)
                        barcodeCheck(data.data)
                    }, 500);
                }}>
                <BarcodeMask
                    width={'80%'} height={'50%'} showAnimatedLine={true} outerMaskOpacity={0.8}
                />

            </RNCamera>

            <Text>{barcc}</Text>
            <Text>{product}</Text>
            <TouchableWithoutFeedback onPress={() => { navigation.navigate('가격비교'), console.log('클릭') }}>
                <View style={{ position: 'absolute' }}>
                    <Text style={{ color: 'orange' }}>직접입력</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}


const styles = StyleSheet.create({
});

export default BarcodeCheck