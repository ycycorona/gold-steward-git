// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import FastClick from "fastclick";
import Vuex from "vuex";
import App from "./order_detail.vue";
import {AjaxPlugin, LoadingPlugin} from "vux";
import { setVarForJsp } from '../../util/setVarForJsp.js'
/*用tyr-catch来测试处于正式还是开发环境，进行不同的变量配置，使用jsp时，需要指定basepath*/
setVarForJsp();
try {
    global.luggage = luggage;
} catch (e) {
    global.luggage = JSON.parse('{"id":398,"openId":"oWwFQw-FjQUp0Ui4imgTUMBrQ-rs","orderNo":"2017080205","sendCity":"青岛","sendAddress":"市南区市政府","sendTime":"2017-08-23","takeCity":"青岛市","takeAddress":"流亭机场","takeTime":"2017-08-23","luggageNumber":2,"luggageUnitPrice":39.0,"luggagePic":"ee1fcdce-89a6-4a34-887a-b5242c57968b","flgInsurance":1,"insurancePrice":5.0,"insuranceAmount":500.0,"preferentialPrice":10.0,"orderPrice":60.0,"remark":"快点给我送","needInvoice":1,"customerName":"pyn","customerMobile":"13791932143","orderStatus":0,"orderCreateTime":"2017-08-24","imgsUrl":["upload/201708/2727654f-89f5-4ebe-af31-71978ea161ea.jpg","upload/201708/96337f19-1b8d-459c-9095-53957fc420aa.jpg"]}');
}
Vue.use(LoadingPlugin)
Vue.use(AjaxPlugin)

Vue.use(Vuex)
//vuex配置
let store = new Vuex.Store({
    state: {
        currPage: 0, //当前的Tab页
        imgsUrl: [], /*订单详情页面展示照片的URL*/

    },
    getters: {},
    mutations: {
        /*更新currPage*/
        changeCurrPage(state, newPage){
            state.currPage = newPage;
        },
        updateImgsUrl (state, newVal) {
            state.imgsUrl = newVal;
        }

    },
    actions: {}
});

FastClick.attach(document.body)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
    store,
    render: h => h(App)
}).$mount('#app-box')
