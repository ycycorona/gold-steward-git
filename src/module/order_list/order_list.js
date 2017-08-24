// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import Vuex from 'vuex'
import App from './order_list.vue'
import {AjaxPlugin, LoadingPlugin} from 'vux'
/*用tyr-catch来测试处于正式还是开发环境，进行不同的变量配置，使用jsp时，需要指定basepath*/
try {
    global.basePath = basePath;
    global.orderList = luggageList;
    /*正式用 URL列表*/
    global.URLLists = {
        /*创建订单*/
        createOrder: global.basePath + '/luggage/wx/createOrder.do',
        /*订单列表*/
        OrderList: global.basePath + '/luggage/wx/toMyOrderList.do?code=1',
        /*订单详情*/
        OrderDetail: global.basePath + '/luggage/wx/toOrderDetailPage.do',
    };
    console.log('try,项目的basePath为：' + global.basePath + '此时应为正式环境');
} catch (e) {
    /*URL列表 开发用*/
    global.URLLists = {
        /*创建订单*/
        createOrder: 'http://172.16.12.39:8080/wxmp/luggage/wx/createOrder.do',
        /*订单列表*/
        OrderList: 'http://172.16.12.39:8080/wxmp/luggage/wx/toMyOrderList.do?code=1',
        /*订单详情*/
        /*OrderDetail: 'http://172.16.12.39:8080/wxmp/luggage/wx/toOrderDetailPage.do',*/
        OrderDetail: '/order_detail.html',
    };
    global.basePath = '';
    global.orderList = [
        {
            "id": 354,
            "openId": "oWwFQw-FqknWMh8BEZwnUfzd5HGY",
            "orderNo": "2017080161",
            "sendCity": "青岛市",
            "sendAddress": "市南区",
            "sendTime": "2017-08-23",
            "takeCity": "青岛市",
            "takeAddress": "飞机场-流亭机场",
            "takeTime": "2017-08-23",
            "luggageNumber": 1,
            "luggageUnitPrice": 39.0,
            "insurancePrice": 5.0,
            "insuranceAmount": 500.0,
            "preferentialPrice": 0.0,
            "orderPrice": 44.0,
            "remark": "sdsdsd",
            "needInvoice": 0,
            "customerName": "ycy",
            "customerMobile": "15655555",
            "orderStatus": 0,
            "orderCreateTime": "2017-08-23"
        },
        {
            "id": 382,
            "openId": "oWwFQw-FqknWMh8BEZwnUfzd5HGY",
            "orderNo": "2017080189",
            "orderPrice": 99.0,
            "orderStatus": 0,
            "orderCreateTime": "2017-08-23"
        },
        {
            "id": 383,
            "openId": "oWwFQw-FqknWMh8BEZwnUfzd5HGY",
            "orderNo": "2017080190",
            "orderPrice": 99.0,
            "orderStatus": 0,
            "orderCreateTime": "2017-08-23"
        }
    ];
    console.log('catch,项目的basePath为：' + global.basePath + '此时应为前端开发环境');
}
Vue.use(LoadingPlugin)
Vue.use(AjaxPlugin)

Vue.use(Vuex)
//vuex配置
let store=new Vuex.Store({
  state:{
    currPage:0, //当前的Tab页
    SelectInnAddress:false,
    SelectStationAddress:false,
    innInfo:{
      address0:"",
      address1:"",
      address2:"",
      time:"",
    },
    stationInfo:{
      address0:"",
      address1:"",
      address2:"",
      time:""
    },
    computedCost: {
      customerMobile:"",
      customerName:"",
      //flgInsurance:1,
      insuranceAmount:500,
      insuranceCost:0,
      insurancePrice:0,
      luggageNumber:0,
      luggageUnitPrice:39,
      needInvoice:1,
      orderPrice:0,
      preferentialPrice:0,
      remark:"",
      sendCost:0
    }
  },
  getters:{

  },
  mutations:{
    /*更新currPage*/
    changeCurrPage(state, newPage){
      state.currPage = newPage;
    },
    /*改变地址选择器的激活状态*/
    toggleSelectInnAddress(state, newValue){
      state.SelectInnAddress = newValue;
    },
    toggleSelectStationAddress(state, newValue){
      state.SelectStationAddress = newValue;
    },
    inputInnInfo(state, newValue){
      state.innInfo = newValue;
    },
    inputStationInfo(state, newValue){
      state.stationInfo = newValue;
    },
    changeComputedCost(state, newValue){
      state.computedCost = newValue;
    }

  },
  actions:{

  }
});

FastClick.attach(document.body)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  store,
  render: h => h(App)
}).$mount('#app-box')
