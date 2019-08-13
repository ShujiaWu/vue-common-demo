import Vue from 'vue'
import App from '@common/pages/App.vue'
import router from './router'
import store from './store'
import axios from './backend/index'
import filters from '@common/filters/index'
import components from '@common/components/element-ui/base/index'
import { debounce } from 'lodash'

import SessionStorage from '@vue-common/utils/session-storage'
import LocalStorage from '@vue-common/utils/local-storage'

import Color from '@vue-common/assets/styles/element-ui/variables/color.scss'

import Element from 'element-ui'
// 重置CSS
import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styles/index.scss'
// logo
import LogoImg from './assets/img/logo.png'

// 导入Icon
import '@/icons'

Vue.config.productionTip = false

// 将axios注册成为Vue原型属性
Vue.prototype.http = axios

Vue.prototype.$SessionStorage = SessionStorage
Vue.prototype.$LocalStorage = LocalStorage

Vue.prototype.$Color = Color

// ===============================================
// 系统信息配置
// ===============================================
Vue.prototype.APP = {
  name: '撸外服管理后台',
  logo: LogoImg,
  showLogo: true
}

// 使用Element UI
Vue.use(Element, {})

// ===============================================
// 注册过滤器
// ===============================================
for (let key in filters) {
  if (filters.hasOwnProperty(key)) {
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
let onresize = debounce(() => {
  store.dispatch('WindowResize')
}, 100)

window.onresize = onresize

// store.dispatch('GenerateRoutes')
// store.dispatch('ChangeUserPermission')

axios.get('/')

store.dispatch('GetUserInfo').then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})

// try {
//   let data = JSON.parse(localStorage.getItem('User_Info'))

//   if (data) {
//     store.dispatch('GetUserInfo', data)
//   } else {
//     store.dispatch('ChangeUserPermission')
//   }
// } catch (e) {
//   console.log(e)
//   store.dispatch('ChangeUserPermission')
// }
