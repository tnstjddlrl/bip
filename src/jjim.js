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
    TouchableWithoutFeedback,
    Image
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { useRecoilState } from 'recoil';
import { productName } from '../atom/atoms';
import { useNavigation } from '@react-navigation/native';


const chwidth = Dimensions.get('window').width

const testd = [{ name: '펩시 제로 210ml캔', where: '네이버', img: 'http://gs1.koreannet.or.kr/product/info/detail/photoView.do?fileNm=8801056000011_8801056175832_1.jpg&filePath=8801056000011/8801056175832' }, { name: '콜라', where: '네이버', img: '' }, { name: '콜라', where: '네이버', img: '' }, { name: '콜라', where: '네이버', img: '' }]

const JjimItem = (prop) => {
    return (
        <View style={{ width: chwidth / 3 - 20, justifyContent: 'center', alignItems: 'center', marginTop: 35, marginLeft: 15 }}>
            <View style={{ width: chwidth / 3 - 20, height: chwidth / 3 - 20, borderRadius: 20, borderWidth: 1, borderColor: 'gray', justifyContent: 'center', alignItems: 'center' }}>
                {prop.img != '' ?
                    <Image source={{ uri: prop.img }} style={{ width: '100%', height: '100%', borderRadius: 20, }}></Image>
                    :
                    <Text>이미지 없음</Text>
                }
            </View>
            <Text numberOfLines={1} style={{ fontWeight: 'bold', marginTop: 3 }}>{prop.name}</Text>
            <Text numberOfLines={1} style={{ marginTop: 3 }}>{prop.where}</Text>
        </View>
    )
}

const JjimPush = () => {
    var List = []

    for (var i = 0; i < testd.length; i++) {
        List.push(<JjimItem key={i} name={testd[i].name} where={testd[i].where} img={testd[i].img}></JjimItem>)
    }


    return List;
}


const Jjim = () => {
    const navigation = useNavigation()

    const [state, setState] = useState('jjim')

    return (
        <View style={{ width: '100%', height: '100%' }}>

            {/* 헤더 시작 */}
            <View style={{ backgroundColor: '#6E6E6E', width: '100%', height: '8%', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignItems: 'center' }}>
                    <View style={{ width: '21%' }}>
                        <Icon name='ios-arrow-back-sharp' color='orange' style={{ fontSize: 40 }}></Icon>
                    </View>

                    <View style={{ width: '20%', alignItems: 'center' }}>
                        <Text style={{ fontSize: 40, color: 'orange', fontWeight: 'bold' }}>B</Text>
                    </View>

                    <TouchableWithoutFeedback onPress={() => { }}>
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
                    <TouchableWithoutFeedback onPress={() => { setState('jjim') }}>
                        <Text style={{ fontSize: 25, color: state == 'jjim' ? '#e69900' : 'gray' }}>찜한 상품</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => { setState('choi') }}>
                        <Text style={{ fontSize: 25, color: state != 'jjim' ? '#e69900' : 'gray' }}>최근 본 상품</Text>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{ width: '100%', borderWidth: 1, borderColor: 'gray', marginTop: 6 }}></View>
                {/* 상단 메뉴 끝 */}

                {/* 찜한 상품 시작 */}
                {state == 'jjim' &&
                    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                            <JjimPush></JjimPush>

                        </View>

                    </ScrollView>
                }
                {/* 찜한 상품 끝 */}

                {/* 최근 본 상품 시작 */}
                {state == 'choi' &&
                    <ScrollView style={{ flex: 1, backgroundColor: 'skyblue' }}>

                    </ScrollView>
                }
                {/* 최근 본 상품 끝 */}

            </View>
            {/* 본문 끝 */}

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


                    <TouchableWithoutFeedback onPress={() => { }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text><Icon style={{ fontSize: 30, color: '#e64d00' }} name="cart-outline" color="black"></Icon></Text>
                            <Text style={{ color: '#e64d00' }}>찜목록</Text>
                        </View>
                    </TouchableWithoutFeedback>


                    <TouchableWithoutFeedback onPress={() => navigation.navigate('더보기')}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text><Icon style={{ fontSize: 30, color: '#e69900' }} name="grid-outline" color="black"></Icon></Text>
                            <Text style={{ color: '#e69900' }}>더보기</Text>
                        </View>
                    </TouchableWithoutFeedback>

                </View>

            </View>
            {/* 하단바 끝 */}

        </View>
    )
}

export default Jjim