import Vue from 'vue'
import App from './App'

import store from './store'

import myutil from '@/common/util'


Vue.config.productionTip = false

Vue.prototype.$store = store

Vue.prototype.$myutil = myutil

App.mpType = 'app'

import api from '@/common/vmeitime-http/'

// 全局挂载后使用
Vue.prototype.$api = api

const app = new Vue({
    store,
    ...App
})
app.$mount()
