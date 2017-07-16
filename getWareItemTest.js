'use strict';
require('pos_v1.js');
function testWareItem() {
    const testGoodItem=[
        {barcode:'ITEM000001',count:5,reduce_count:1},
        {barcode:'ITEM000003',count:2.5,reduce_count:0},
        {barcode:'ITEM000005',count:3,reduce_count:2}

    ];
    const expectresult3=[
        {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            count:5,
            reduce_count:1,
            itemPrice:12,
            reducePrice:3,
        },
        {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00,
            count:2.5,
            reduce_count:0,
            itemPrice:37.5,
            reducePrice:0,
        },
        {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.5,
            count:3,
            reduce_count:1,
            itemPrice:9,
            reducePrice:4.5,
        },

    ];
    const realResult3=getWareItem(testGoodItem)===expectresult3?'test passed':'test failed';
    console.log(realResult3);
}
testWareItem();