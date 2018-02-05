// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import FastClick from "fastclick";
import Vuex from "vuex";
import App from "./service_introduce.vue";
import {AjaxPlugin, LoadingPlugin, ToastPlugin} from "vux";

import { setVarForJsp } from '../../util/setVarForJsp.js'
/*用tyr-catch来测试处于正式还是开发环境，进行不同的变量配置，使用jsp时，需要指定basepath*/
setVarForJsp();
try {
    global.isProduction = production;
} catch (e) {
    console.log('catch!!!!');
}
Vue.use(LoadingPlugin)
Vue.use(AjaxPlugin)
Vue.use(ToastPlugin)

Vue.use(Vuex)
//vuex配置
let store = new Vuex.Store({
    state: {

    },
    getters: {},
    mutations: {


    },
    actions: {}
});

/*添加全局属性的插件*/
import addGlobalProperty from '@/vue_plugins/addGlobalProperty'

/*需要被添加的全局属性*/
import towxPay from '@/data_resource/towxPay'
import ajaxDataSerialize from '@/util/ajaxDataSerialize'

Vue.use(addGlobalProperty, [
        {name: 'ajaxDataSerialize', value: ajaxDataSerialize},
        {name: 'towxPay', value: towxPay}
    ]
);


FastClick.attach(document.body)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
    store,
    render: h => h(App)
}).$mount('#app-box')
