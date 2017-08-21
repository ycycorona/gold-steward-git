import Vue from 'vue'
import FastClick from 'fastclick'

import App from './App'
Vue.use(VueRouter)
FastClick.attach(document.body)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  render: h => h(App)
}).$mount('#app-box')

