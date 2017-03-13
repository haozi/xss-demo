/**
 * 这是网站的启动入口，用于初始化全局配置，不要在这里写过多业务逻辑
 */

import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
// import VueLazyload from 'vue-lazyload'

import App from './App'
import Router from './router'
// import * as filters from './filter'
import store from './vuex/store'
// import {sync} from 'vuex-router-sync'

Vue.use(VueRouter)
Vue.use(Vuex)

// 图片懒加载
// Vue.use(VueLazyload, {
//   error: '/static/error.jpg',
//   loading: '/static/loading.gif',
//   try: 1
// })

// 自定义过滤器
// Object.keys(filters).forEach(name => {
//   Vue.filter(name, filters[name])
// })

const router = new VueRouter(Router)
router.beforeEach((to, from, next) => {
  next()
})

const app = document.createElement('div')
app.id = 'app'

document.body.innerHTML = ''
document.body.appendChild(app)

/* eslint no-new: 0 */
new Vue({
  router,
  store,
  el: '#app',
  template: '<App/>',
  components: {App}
})
