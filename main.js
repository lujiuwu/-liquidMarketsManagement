import App from './App'

// #ifndef VUE3

import Vue from 'vue'
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
import './uni.promisify.adaptor'
import store from '@/store/store.js'
// 引入lodash 
import _ from 'lodash';
Vue.config.productionTip = false
App.mpType = 'app'

// 把lodash挂载在原型上面
Vue.prototype.$_ = _ ; 
const app = new Vue({
  ...App,
  store
})
app.$mount()
// #endif

// #ifdef VUE3
// main.js
import { createSSRApp } from 'vue'
import App from './App'
import store from '@/store/store.js'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
	// 挂载store
	store
  }
}
// #endif