/*所需的全部URLList，被setVarForJsp调用*/
let URLLists = {
    /*创建订单的页面*/
    toCreateOrderPage: global.basePath + 'luggage/wx/toCreateOrderPage.do?code=1&openId=oWwFQw-FqknWMh8BEZwnUfzd5HGY',
    /*创建订单*/
    createOrder: global.basePath + '/luggage/wx/createOrder.do?openId=oWwFQw-FqknWMh8BEZwnUfzd5HGY',
    /*获取优惠列表*/
    /*订单列表*/
    OrderList: global.basePath + '/luggage/wx/toMyOrderList.do?code=1',
    /*订单详情*/
    OrderDetail: global.basePath + '/luggage/wx/toOrderDetailPage.do?code=1',
    /*订单支付*/
    /*payOrder: */
};
let devURLLists = {
    /*创建订单的页面*/
    /*toCreateOrderPage:'http://172.16.12.39:8080/wxmp/luggage/wx/toCreateOrderPage.do',*/
    toCreateOrderPage:'/take_order.html',
    /*创建订单*/
    createOrder: 'http://172.16.12.39:8080/luggage/create',
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
