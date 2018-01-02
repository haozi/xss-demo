/**
 * 这是网站的启动入口，用于初始化全局配置，不要在这里写过多业务逻辑
 */
import cookie from 'browser-cookies'
import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
// import VueLazyload from 'vue-lazyload'

import App from './App'
import Router from './router'
import * as filters from './filter'
import store from './vuex/store'
// import {sync} from 'vuex-router-sync'

const win = window
const document = win.document
const location = win.location

{
  const s = document.createElement('script')
  s.src = 'https://s4.cnzz.com/z_stat.php?id=1261523779&web_id=1261523779'
  s.charset = 'utf-8'
  s.async = true
  document.body.appendChild(s)
}

{ // 更新缓存
  const applicationCache = window.applicationCache
  if (applicationCache) {
    applicationCache.addEventListener('updateready', () => {
      if (applicationCache.status === applicationCache.UPDATEREADY) {
        applicationCache.swapCache()
        location.reload()
      }
    })
  }
}

Vue.use(VueRouter)
Vue.use(Vuex)

// 图片懒加载
// Vue.use(VueLazyload, {
//   error: '/static/error.jpg',
//   loading: '/static/loading.gif',
//   try: 1
// })

// 自定义过滤器
Object.keys(filters).forEach(name => {
  Vue.filter(name, filters[name])
})

const router = new VueRouter(Router)
router.beforeEach((to, from, next) => {
  next()
})

const app = document.createElement('div')
app.id = 'app'

document.body.innerHTML = ''
document.body.appendChild(app)

// pwa
// if (navigator.serviceWorker) {
//   navigator.serviceWorker.register('sw.js')
//     .then(function (registration) {
//       console.log('Registered events at scope: ', registration.scope)
//     })
// }

const alert = window.alert
const prompt = window.prompt
if (!cookie.get('uid')) {
  const reg = /[|~!@#$%^&*()_+<>?:"{},./;'\]]/g
  const userName = (prompt('请输入你的昵称 (7 个字以内)') || '').trim()
  if (!(userName && !reg.test(userName) && userName.length <= 7)) {
    alert('昵称非法')
    throw new Error('昵称非法')
  }

  const uid = `${userName}|${Date.now()}`
  cookie.set('uid', uid, {expires: 3650})
  alert(`${userName} 你好， 请在 input code 框内输入代码，以至弹出 alert(1) 为过关`)
}

/* eslint no-new: 0 */
new Vue({
  router,
  store,
  el: '#app',
  template: '<App/>',
  components: {App}
})
