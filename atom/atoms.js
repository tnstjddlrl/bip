import {
    atom,
} from 'recoil';

export const productName = atom({
    key: 'productName',
    default: '',
});

export const productList = atom({
    key: 'productList',
    default: [],
});

export const productCurList = atom({
    key: 'productCurList',
    default: [],
});

export const productImg = atom({
    key: 'productImg',
    default: '',
});