// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import Vuex from 'vuex'
import App from './order_list.vue'
import {AjaxPlugin, LoadingPlugin} from 'vux'
import { setVarForJsp } from '../../util/setVarForJsp.js'
/*使用jsp时，需要指定basepath {name:'para1',val:123}*/
setVarForJsp();
/*用tyr-catch来测试处于正式还是开发环境，进行不同的变量配置，使用jsp时，需要指定basepath*/
try {
    global.orderList = luggageList;
} catch (e) {
    global.orderList = [{"id":354,"openId":"oWwFQw-FqknWMh8BEZwnUfzd5HGY","orderNo":"2017080161","sendCity":"青岛市","sendAddress":"市南区","sendTime":"2017-08-23","takeCity":"青岛市","takeAddress":"飞机场-流亭机场","takeTime":"2017-08-23","luggageNumber":1,"luggageUnitPrice":39.0,"insurancePrice":5.0,"insuranceAmount":500.0,"preferentialPrice":0.0,"orderPrice":44.0,"remark":"sdsdsd","needInvoice":0,"customerName":"ycy","customerMobile":"15655555","orderStatus":0,"orderCreateTime":"2017-08-23"},{"id":382,"openId":"oWwFQw-FqknWMh8BEZwnUfzd5HGY","orderNo":"2017080189","orderPrice":99.0,"orderStatus":0,"orderCreateTime":"2017-08-23"},{"id":383,"openId":"oWwFQw-FqknWMh8BEZwnUfzd5HGY","orderNo":"2017080190","orderPrice":99.0,"orderStatus":0,"orderCreateTime":"2017-08-23"},{"id":417,"openId":"oWwFQw-FqknWMh8BEZwnUfzd5HGY","orderNo":"2017080224","sendCity":"","sendAddress":"","takeCity":"","takeAddress":"","luggageNumber":0,"luggageUnitPrice":39.0,"insurancePrice":0.0,"insuranceAmount":500.0,"preferentialPrice":0.0,"orderPrice":0.0,"remark":"","needInvoice":1,"customerName":"","customerMobile":"","orderStatus":0,"orderCreateTime":"2017-08-25"},{"id":418,"openId":"oWwFQw-FqknWMh8BEZwnUfzd5HGY","orderNo":"2017080225","sendCity":"","sendAddress":"","takeCity":"","takeAddress":"","luggageNumber":0,"luggageUnitPrice":39.0,"luggagePic":"884d91a3-3f80-4295-a928-ec2bb38fb49e","insurancePrice":0.0,"insuranceAmount":500.0,"preferentialPrice":0.0,"orderPrice":0.0,"remark":"","needInvoice":1,"customerName":"","customerMobile":"","orderStatus":0,"orderCreateTime":"2017-08-25"},{"id":427,"openId":"oWwFQw-FqknWMh8BEZwnUfzd5HGY","orderNo":"2017080234","sendCity":"青岛市","sendAddress":"市南区","sendTime":"2017-08-25","takeCity":"青岛市","takeAddress":"飞机场-流亭机场","takeTime":"2017-08-25","luggageNumber":1,"luggageUnitPrice":39.0,"luggagePic":"91066a93-4d62-42eb-a8e7-27a8396dccad","insurancePrice":5.0,"insuranceAmount":500.0,"preferentialPrice":0.0,"orderPrice":44.0,"remark":"阿斯蒂芬阿斯蒂芬","needInvoice":0,"customerName":"呵呵哒","customerMobile":"545451","orderStatus":0,"orderCreateTime":"2017-08-25"}];
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
