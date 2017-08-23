// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App'
import TakeOrder from './components/TakeOrder'
import OrderList from './components/OrderList'
import OrderDetail from './components/OrderDetail'
import Hello from './components/Hello'
/*import test from './components/test'*/
import SubmitOrderTab from './components/baseComponents/SubmitOrderTab'
import {AjaxPlugin, LoadingPlugin} from 'vux'

Vue.use(LoadingPlugin)
Vue.use(AjaxPlugin)
Vue.use(VueRouter)
Vue.use(Vuex)
//vuex配置
let store=new Vuex.Store({
  state:{
    currPage:0, //当前的Tab页
    SelectInnAddress:false,
    SelectStationAddress:false,
    senderPickerType:'activeInnAddSelector',
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
    },
    submitForm:{

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
    },
    changeSenderPickerType(state, newValue) {
      state.senderPickerType = newValue;
    }


  },
  actions:{

  }
});
//路由配置
const routes = [{
    path: '/index',
    components: {
      mainPage:TakeOrder,
      bottomTab:SubmitOrderTab
    }
},{
    path: '/order-list',
    components: {
      mainPage:OrderList,
    }
},
  {
    path: '/hello',
    component: Hello
  },
  {
    path: '/order-detail',
    components: {
      mainPage:OrderDetail,
    }
  }]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
