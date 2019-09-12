import { initUserRouterAndMenu } from '../../libs/utils'
export default {
  namespaced: true, // 启用命名空间，使用的时候是 命名空间/mutation 命名空间/action
  state: {
    sideBar: [],
    sideBarId: undefined,
    navBar: []
  },
  getters: {
  },
  /**
   * store 中的状态的唯一方法
   * 通过store.commit()方法触发，来改变状态值
   */
  mutations: {
    'CLEAN_SIDE_BAR_MENUS' (state) {
      state.sideBar.splice(0, state.sideBar.length)
    },
    'UPDATE_SIDE_BAR_MENUS' (state, menus) {
      state.sideBar.splice(0, state.sideBar.length, ...menus)
    },
    'UPDATE_NAV_BAR_MENUS' (state, menus) {
      state.navBar.splice(0, state.navBar.length, ...menus)
    }
  },
  /**
   * 通过store.dispatch()方法来触发
   */
  actions: {
    'InitRouterAndMenu' ({ commit }) {
      return initUserRouterAndMenu().then(menus => {
        commit('UPDATE_SIDE_BAR_MENUS', [])
        commit('UPDATE_NAV_BAR_MENUS', menus)
        return Promise.resolve()
      })
    },
    'NavBarMenuItemChange' ({ commit }, menu) {
      commit('UPDATE_SIDE_BAR_MENUS', menu.children)
    },
    'UpdateSideBarMenus' ({ state, commit }, menu) {
      if (state.sideBarId !== menu.id) {
        commit('UPDATE_SIDE_BAR_MENUS', menu.children)
      }
    }
  }
}
