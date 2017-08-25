/*所需的全部URLList，被setVarForJsp调用*/
let URLLists = {
    /*创建订单的页面*/
    toCreateOrderPage: global.basePath + 'luggage/wx/toCreateOrderPage.do',
    /*创建订单*/
    createOrder: global.basePath + '/luggage/wx/createOrder.do',
    /*订单列表*/
    OrderList: global.basePath + '/luggage/wx/toMyOrderList.do?code=1',
    /*订单详情*/
    OrderDetail: global.basePath + '/luggage/wx/toOrderDetailPage.do?code=1',
};
let devURLLists = {
    /*创建订单的页面*/
    /*toCreateOrderPage:'http://172.16.12.39:8080/wxmp/luggage/wx/toCreateOrderPage.do',*/
    toCreateOrderPage:'/take_order.html',
    /*创建订单*/
    createOrder: 'http://172.16.12.39:8080/wxmp/luggage/wx/createOrder.do',
    /*订单列表*/
    /*OrderList: 'http://172.16.12.39:8080/wxmp/luggage/wx/toMyOrderList.do?code=1'*/
    OrderList: '/order_list.html',
    /*订单详情*/
    /*OrderDetail: 'http://172.16.12.39:8080/wxmp/luggage/wx/toOrderDetailPage.do',*/
    OrderDetail: '/order_detail.html',
};
export {
    URLLists, devURLLists
}
