var barcodeItem = [
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-2.5',
    'ITEM000005',
    'ITEM000005-2',
];
function loadAllItems() {
    return [
        {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000002',
            name: '苹果',
            unit: '斤',
            price: 5.50
        },
        {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
        },
        {
            barcode: 'ITEM000004',
            name: '电池',
            unit: '个',
            price: 2.00
        },
        {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
        }
    ];
}
function loadPromotions() {
    return [
        'ITEM000000',
        'ITEM000001',
        'ITEM000005'
    ];


}
function  getItem(barcodeItem) {
    var item_arry=[];
    for(var i=0;i<barcodeItem.length;i++){
        if(barcodeItem[i].indexOf('-')===-1){
            item_arry.push({barcode:barcodeItem[i],count:1});
        }
        else {
            item_arry.push({barcode:barcodeItem[i].split('-')[0],count:parseFloat(barcodeItem[i].split('-')[1])});
        }
    }

    return item_arry;

}
function getGoodItem(arry) {
    let goodItem = [];
    let promotions=loadPromotions();
    for (let i = 0; i < arry.length; i++) {
        let tag = 0;
        for (let j = 0; j < goodItem.length; j++) {
            if (arry[i].barcode === goodItem[j].barcode) {
                goodItem[j].count += arry[i].count;
                tag = 1;
            }
            else {
                continue;
            }
        }
        if (tag === 0) {
            goodItem.push(arry[i]);
        }
        for(let i=0;i<goodItem.length;i++){
            goodItem[i].reduce_count=0;
            for(let j=0;j<promotions.length;j++){
                if(goodItem[i].barcode===promotions[j]&&goodItem[i].count>2){
                    goodItem[i].reduce_count=1;
                }
                else {
                    continue;
                }
            }
        }
    }
    return goodItem;
}

function getWareItem(item) {
    let allItems=loadAllItems();
    for(let i=0;i<item.length;i++){
        for(let j=0;j<allItems.length;j++){
            if(item[i].barcode===allItems[j].barcode){
                item[i].name=allItems[j].name;
                item[i].price=allItems[j].price;
                item[i].unit=allItems[j].unit;
                item[i].reducePrice=item[i].reduce_count*item[i].price;
                item[i].itemPrice=item[i].count*item[i].price-item[i].reducePrice;

            }

        }
    }
    return item;
}
function  getAllPrice(arry2) {
    var all_price=0;
    for(var i=0;i<arry2.length;i++){
        all_price+=arry2[i].itemPrice;
    }
    return all_price;
}//计算总价
function getAllReducePrice(arry3) {
    var  all_reduce=0;
    for(var i=0;i<arry3.length;i++){
        all_reduce+=arry3[i].reducePrice;
    }
    return all_reduce;
}
var ware=getItem(barcodeItem);
let goodItemArry=getGoodItem(ware);
let wareItem=getWareItem(goodItemArry);
let allPrice=getAllPrice(wareItem);
let allReducePrice=getAllReducePrice(wareItem);
let result = "***<没钱赚商店>收据***\n";
for (var i = 0; i < wareItem.length; i++) {
    result += '名称：' + wareItem[i].name + '，数量：' + wareItem[i].count + '，单价：' + wareItem[i].price + '(元)，小计：' + wareItem[i].itemPrice + '(元)\n';
}
result += '----------------------\n';
result += '总计：' + allPrice + '(元)\n';
result += '总节约：' + allReducePrice + '(元)\n';
result += '**********************';

console.log(result);
