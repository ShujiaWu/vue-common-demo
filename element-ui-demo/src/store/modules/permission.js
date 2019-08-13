/**
 * 权限
 */
import fullRoutes from '@/router/routes'
import store from '../../store'
import { filterRoutes } from '../../utils/router'
// let routes = []
export default {
  state: {
    routes: []
  },
  getters: {
  },
  /**
   * store 中的状态的唯一方法
   * 通过store.commit()方法触发，来改变状态值
   */
  mutations: {
    'SET_ROUTES' (state, routes) {
      state.routes.splice(0, state.routes.length, ...routes)
    }
  },
  /**
   * 通过store.dispatch()方法来触发
   */
  actions: {
    'GenerateRoutes' ({ commit }) {
      console.log('store.state.user.id', JSON.stringify(store.state.user))
      return filterRoutes(fullRoutes, store.state.user.id).then(routes => {
        commit('SET_ROUTES', routes)
        return Promise.resolve(routes)
      })
    }
  }
}
