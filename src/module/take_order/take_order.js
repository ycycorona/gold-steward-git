// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import Vuex from 'vuex'
import App from './take_order.vue'
import { AjaxPlugin, LoadingPlugin } from 'vux'
/*使用jsp时，需要指定basepath*/
try {
    global.basePath = basePath;
    console.log('try,项目的basePath为：' + global.basePath + '此时应为正式环境');
} catch (e) {
    global.basePath = '';
    console.log('catch,项目的basePath为：' + global.basePath + '此时应为前端开发环境');
}
Vue.use(LoadingPlugin)
Vue.use(AjaxPlugin)

Vue.use(Vuex)
//vuex配置
let store = new Vuex.Store({
    state: {
        currPage: 0, //当前的Tab页
        SelectInnAddress: false,
        SelectStationAddress: false,
        senderPickerType:'activeInnAddSelector',
        innInfo: {
            address0: '',
            address1: '',
            address2: '',
            time: '',
        },
        stationInfo: {
            address0: '',
            address1: '',
            address2: '',
            time: ''
        },
        computedCost: {
            customerMobile: '',
            customerName: '',
            //flgInsurance:1,
            insuranceAmount: 500,
            insuranceCost: 0,
            insurancePrice: 0,
            luggageNumber: 0,
            luggageUnitPrice: 39,
            needInvoice: 1,
            orderPrice: 0,
            preferentialPrice: 0,
            remark: '',
            sendCost: 0
        },
        submitForm:{

        },
        picContainer: []
    },
    getters: {},
    mutations: {
        /*更新currPage*/
        changeCurrPage(state, newPage){
            state.currPage = newPage
        },
        /*改变地址选择器的激活状态*/
        toggleSelectInnAddress(state, newValue){
            state.SelectInnAddress = newValue
        },
        toggleSelectStationAddress(state, newValue){
            state.SelectStationAddress = newValue
        },
        inputInnInfo(state, newValue){
            state.innInfo = newValue
        },
        inputStationInfo(state, newValue){
            state.stationInfo = newValue
        },
        changeComputedCost(state, newValue){
            state.computedCost = newValue
        },
        changeSenderPickerType(state, newValue) {
            state.senderPickerType = newValue;
        },
        changeSubmitForm(state, newValue) {
            state.submitForm = newValue;
        },
        pushPic(state,newPicObj) {
            state.picContainer.push(newPicObj);
        }
    },
    actions: {}
})

FastClick.attach(document.body)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
    store,
    render: h => h(App)
}).$mount('#app-box')
