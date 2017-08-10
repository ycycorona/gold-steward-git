// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App'
import TakeOrder from './components/TakeOrder'
import OrderList from './components/OrderList'

Vue.use(VueRouter)
Vue.use(Vuex)
//vuex配置
let store=new Vuex.Store({
  state:{
    currPage:0
  },
  getters:{
    getCurrPage(state){
      return state.currPage;
    }
  },
  mutations:{

  },
  actions:{

  }
});
//路由配置
const routes = [{
  path: '/index',
  component: TakeOrder
},{
  path: '/order-list',
  component: OrderList
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
