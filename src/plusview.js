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
    Alert,
    TouchableWithoutFeedback
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { useRecoilState } from 'recoil';
import { productName } from '../atom/atoms';
import { useNavigation } from '@react-navigation/native';


const chwidth = Dimensions.get('window').width

const Plusview = () => {
    const navigation = useNavigation()

    return (
        <View style={{ width: '100%', height: '100%' }}>

            {/* 헤더 시작 */}
            <View style={{ backgroundColor: '#6E6E6E', width: '100%', height: '8%', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignItems: 'center' }}>
                    <View style={{ width: '20%' }}>
                        <Icon name='ios-arrow-back-sharp' color='orange' style={{ fontSize: 40 }}></Icon>
                    </View>

                    <View style={{ width: '20%', alignItems: 'center' }}>
                        <Text style={{ fontSize: 40, color: 'orange', fontWeight: 'bold' }}>B</Text>
                    </View>

                    <TouchableWithoutFeedback onPress={() => { }}>
                        <View style={{ width: '20%', borderRadius: 10, backgroundColor: '#ffe6b3', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, color: 'orange', fontWeight: 'bold', margin: 5 }}>찜하기</Text>
                        </View>
                    </TouchableWithoutFeedback>

                </View>
            </View>

            {/* 헤더 끝 */}

            <View style={{ width: '100%', height: '84%' }}>
                <Text>배신자컴퍼니는 디자이너, 프로그래머 한 명씩으로 구성된 2인조 개발 그룹입니다. 첫번째 앱출시를 성공하게 되었습니다. 비록 부족한 부분이 많지만 너그럽게 양해를 바라며 아래의 정보를 통해 버그제보도 받고있습니다.
                </Text>
            </View>

            {/* 하단바 시작 */}
            <View style={{ width: '100%', height: '9%', backgroundColor: '#ffe6b3', justifyContent: 'center', alignItems: 'center' }}>

                <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>

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


                    <TouchableWithoutFeedback onPress={() => { navigation.navigate('찜목록') }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text><Icon style={{ fontSize: 30, color: '#e69900' }} name="cart-outline" color="black"></Icon></Text>
                            <Text style={{ color: '#e69900' }}>찜목록</Text>
                        </View>
                    </TouchableWithoutFeedback>


                    <TouchableWithoutFeedback onPress={() => { }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text><Icon style={{ fontSize: 30, color: '#e64d00' }} name="grid-outline" color="black"></Icon></Text>
                            <Text style={{ color: '#e64d00' }}>더보기</Text>
                        </View>
                    </TouchableWithoutFeedback>

                </View>

            </View>
            {/* 하단바 끝 */}

        </View>
    )
}

export default Plusview