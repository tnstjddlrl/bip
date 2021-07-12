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

import Icon from 'react-native-vector-icons/Ionicons';



import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { productImg, productName } from '../atom/atoms';



const chwidth = Dimensions.get('screen').width
const chheight = Dimensions.get('screen').height


const BarcodeCheck = () => {
    const navigation = useNavigation()


    const camera = useRef()
    const [barcc, setBarcc] = useState('바코드 탐지중!')

    const [atomImg, setAtomImg] = useRecoilState(productImg)
    const [productN, setProductN] = useRecoilState(productName)



    function barcodeCheck(pp) {

        axios.get('http://www.koreannet.or.kr/home/hpisSrchGtin.gs1?gtin=' + pp,
        ).then(function (response) {

            const $ = cheerio.load(response.data);

            var test = $('div.productDetailView').find('div.productTit').text().replace(/(\s*)/g, "");


            // console.log($('div.productDetailView').find('div.imgArea').find('img').attr('src'))
            console.log(test.substring(13, test.length))
            setProductN(test.substring(13, test.length))
            setAtomImg($('div.productDetailView').find('div.imgArea').find('img').attr('src'))

        }).catch(function (error) {
            Alert.alert('인터넷 연결을 확인하세요!')
            console.log(error);
        })

    }

    return (
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
                            <Text><Icon style={{ fontSize: 50, color: productN === '' ? 'gray' : 'orange' }} name="barcode-sharp" color="black" /> </Text><Text style={{}}> :   {barcc}</Text>
                        </View>

                        {productN != '' ?
                            <View style={{ width: chwidth - 40, marginLeft: 20, alignItems: 'center', flexDirection: 'row' }}>
                                <Text><Icon style={{ fontSize: 50, color: 'orange' }} name="basket-sharp" color="black" /></Text><Text>  :   {productN}</Text>
                            </View>
                            :
                            <View style={{ width: chwidth - 40, marginLeft: 20, alignItems: 'center', flexDirection: 'row' }}>
                                <Text><Icon style={{ fontSize: 50 }} name="basket-sharp" color="black" /></Text><Text>  :   상품 검색중!</Text>
                            </View>
                        }
                    </View>

                    <TouchableWithoutFeedback onPress={() => { if (productN != '') navigation.navigate('가격비교') }}>
                        <View style={{ width: chwidth - 40, height: '24%', borderRadius: 20, marginTop: '3%', marginLeft: 20, backgroundColor: productN === '' ? '#d9d9d9' : 'orange', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: productN === '' ? 'black' : 'white', fontSize: 18 }}>최저가 비교</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <View style={{ width: '100%', height: '9%', backgroundColor: '#ffe6b3', justifyContent: 'center', alignItems: 'center' }}>

                    <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text><Icon style={{ fontSize: 30, color: '#e69900' }} name="barcode-sharp" color="black"></Icon></Text>
                            <Text style={{ color: '#e69900' }}>바코드</Text>
                        </View>

                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text><Icon style={{ fontSize: 30, color: '#e69900' }} name="pricetags-outline" color="black"></Icon></Text>
                            <Text style={{ color: '#e69900' }}>가격비교</Text>
                        </View>

                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text><Icon style={{ fontSize: 30, color: '#e69900' }} name="basket-outline" color="black"></Icon></Text>
                            <Text style={{ color: '#e69900' }}>찜목록</Text>
                        </View>

                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text><Icon style={{ fontSize: 30, color: '#e69900' }} name="grid-outline" color="black"></Icon></Text>
                            <Text style={{ color: '#e69900' }}>더보기</Text>
                        </View>
                    </View>


                </View>



            </View>




            <TouchableWithoutFeedback onPress={() => { navigation.navigate('가격비교', { pname: '' }) }}>
                <View style={{ position: 'absolute' }}>
                    <Text style={{ color: 'orange', margin: 10, fontSize: 18 }}>직접입력</Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => { }}>
                <View style={{ position: 'absolute', alignSelf: 'flex-end' }}>
                    <Text style={{ color: 'orange', margin: 10, fontSize: 18 }}>찜 목록</Text>
                </View>
            </TouchableWithoutFeedback>



        </View>
    )
}


const styles = StyleSheet.create({
});

export default BarcodeCheck