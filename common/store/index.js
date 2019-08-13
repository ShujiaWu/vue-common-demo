import Vue from 'vue'
import Vuex from 'vuex'

import permission from './modules/permission'
import app from './modules/app'
import user from './modules/user'
import window from './modules/window'
import constants from './modules/constants'

Vue.use(Vuex)

// 全局唯一Store
let store = null

// 初始化函数
function init (config) {
  config = config || {}
  config.actions = config.actions || {}
  config.getters = config.getters || {}
  config.modules = config.modules || {}

  // Object.assign(config.actions, actions)
  // Object.assign(config.getters, getters)
  Object.assign(config.modules, {
    permission,
    app,
    user,
    window,
    constants
  })
  store = new Vuex.Store(config)
  return store
}

export {
  store,
  init
}
