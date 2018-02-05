/*所需的全部URLList，被setVarForJsp调用*/
let URLLists = {
    /*创建订单的页面*/
    toCreateOrderPage: '/luggage/toCreatePage',
    /*创建订单*/
    createOrder: '/luggage/create',
    /*获取优惠列表*/
    getListCoupon: '/luggage/listCoupon',
    /*进入订单列表页面*/
    toOrderList: '/luggage/toListPage',
    /*获取订单列表数据*/
    getOrderListDate: '/luggage/listDate',
    /*进入订单详情页面*/
    toOrderDetail: '/luggage/toDetailPage',
    /*获取订单详情数据*/
    getOrderDetailDate: '/luggage/getDetailDate',
    /*行李员已取件*/
    sendLuggageFrom: '/luggage/sendLuggageFrom',
    /*行李员已送达*/
    sendLuggageTo: '/luggage/sendLuggageTo',
    /*客户已取件*/
    completeLuggage: '/luggage/completeLuggage',
    /*上传附件*/
    uploadFile: '/file/upload',
    /*删除订单*/
    deleteLuggage: '/luggage/deleteLuggage',
    /*订单支付*/
    /*payOrder: */
    /*获取用户信息*/
    getUserInfo: '/luggage/getUserInfo',
    createPayOrder: '/luggage/createPayOrder' //创建订单支付接口
};
let devURLLists = {
    /*创建订单的页面*/
    toCreateOrderPage: '/luggage/toCreatePage',
    /*创建订单*/
    createOrder: '/luggage/create',
    /*获取优惠列表*/
    getListCoupon: '/luggage/listCoupon',
    /*进入订单列表页面*/
    toOrderList: '/order_list.html',
    /*获取订单列表数据*/
    getOrderListDate: '/luggage/listDate',
    /*进入订单详情页面*/
    toOrderDetail: '/luggage/toDetailPage',
    /*获取订单详情数据*/
    getOrderDetailDate: '/luggage/getDetailDate',
    /*行李员已取件*/
    sendLuggageFrom: '/luggage/sendLuggageFrom',
    /*行李员已送达*/
    sendLuggageTo: '/luggage/sendLuggageTo',
    /*客户已取件*/
    completeLuggage: '/luggage/completeLuggage',
    /*上传附件*/
    uploadFile: '/file/upload',
    /*删除订单*/
    deleteLuggage: '/luggage/deleteLuggage',
    /*订单支付*/
    /*payOrder: */
    /*获取用户信息*/
    getUserInfo: '/luggage/getUserInfo',
    createPayOrder: '/luggage/createPayOrder' //创建订单支付接口
};
export {
    URLLists, devURLLists
}
