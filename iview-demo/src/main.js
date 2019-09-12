import Vue from 'vue'
import App from './views/layout/App'
import router from './router'
import store from './store'
import axios from './backend/index'
import filters from './filters/index'
import components from './components/base/index'
import { debounce } from 'lodash'

import SessionStorage from '@vue-common/utils/session-storage'
import LocalStorage from '@vue-common/utils/local-storage'

import './plugins'
// 导入Icon
import '@/icons'

// logo
import LogoImg from './assets/img/logo.png'

import '@/assets/styles/index.less'

Vue.config.productionTip = false

// 将axios注册成为Vue原型属性
Vue.prototype.http = axios

Vue.prototype.$SessionStorage = SessionStorage
Vue.prototype.$LocalStorage = LocalStorage

// ===============================================
// 系统信息配置
// ===============================================
Vue.prototype.APP = {
  name: '撸外服管理后台',
  logo: LogoImg,
  showLogo: true
}

// ===============================================
// 注册过滤器
// ===============================================
for (var key in filters) {
  if (Object.hasOwnProperty.call(filters, key)) {
    Vue.filter(key, filters[key])
  }
}

// ===============================================
// 注册全局组件
// ===============================================
Vue.use(components)

// ===============================================
// 窗体改变事件
// ===============================================
const onresize = debounce(() => {
  store.dispatch('window/Resize')
}, 100)

window.onresize = onresize

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  mounted () {
    console.log('-------------------App 挂载')
    // initUserRouterAndMenu()
    this.$store.dispatch('app/InitRouterAndMenu')
  }
})

// TODO: 获取用户信息
// store.dispatch('user/GetUserInfo').then(() => {
//   new Vue({
//     router,
//     store,
//     render: h => h(App)
//   }).$mount('#app')
// })
