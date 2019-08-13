import Vue from 'vue'
import Vuex from 'vuex'

import permission from './modules/permission'
import app from './modules/app'
import user from './modules/user'
import window from './modules/window'
import constants from './modules/constants'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    permission,
    app,
    user,
    window,
    constants
  }
})

export default store
