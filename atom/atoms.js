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