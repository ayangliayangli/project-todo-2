/**
 * todo
 * 1. 数据方案比较杂乱，需要一个封装， 来处理和idb的交互
 *  1.1 可以模仿 orm 的方式来处理idb
 *  1.2
 * 2. todo 需要一个过滤器
 */
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import myIdbPlugin from './js/db/myIdbPlugin'
import globalfiltersPlugin from '@/js/filters/globalfiltersPlugin.js'

import '@/css/index.scss'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(myIdbPlugin)
Vue.use(globalfiltersPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
