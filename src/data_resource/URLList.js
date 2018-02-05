let exportURLList;
let _basePath = '';

try {
    //从jsp里定义全局变量basePath
    _basePath = basePath; //本机域名
    console.log('当前为正式环境');
} catch(e) {
    _basePath = '';
    console.log('当前为前端开发环境');
}

let devURLList = {
    basePath: _basePath,
    toAirMallOrderList: '/order_list/air_mall_order', //进入订单列表
    toOrderDetail: '/order_detail', //进入订单详情
    getAirMallOrder: '/service/plat/wechat/mainOrders', //获取订单列表
    getAirMallOrderDetail: '/service/plat/wechat/mainOrders/', //获取订单列表+查询参数
    cancelOrder: '/service/cancelOrder', //获取订单列表+查询参数
    getWxPayInfo: '/getWxPayInfo', //获取微信支付的必要信息
    toMemberRegisterPage: 'http://www.baidu.com' //常旅客注册地址
};

let productionURLLists = {
    basePath: _basePath,
    toAirMallOrderList: '/order_list/air_mall_order', //进入订单列表
    toOrderDetail: '/order_detail', //进入订单详情
    getAirMallOrder: _serviceBasePath + '/service/plat/wechat/mainOrders', //获取订单列表
    getAirMallOrderDetail: _serviceBasePath +'/service/plat/wechat/mainOrders/', //获取订单
    cancelOrder: _serviceBasePath +'/service/cancelOrder', //获取订单列表+查询参数
    getWxPayInfo: _basePath + 'order/payForOrder.do', //获取微信支付的必要信息
    toMemberRegisterPage: '' //常旅客注册地址

};

if(process.env.NODE_ENV === 'development') {
    exportURLList = devURLList;
} else if (process.env.NODE_ENV === 'production') {
    exportURLList = productionURLLists;
}

export default exportURLList;
