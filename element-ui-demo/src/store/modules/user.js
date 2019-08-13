/**
 * 用户相关
 */
import router from '../../router'
import Router from 'vue-router'
import { getBaseInfo as ServiceGetUserInfo } from '@/services/user'

/**
 * 重置路由
 */
function resetRouter () {
  const newRouter = new Router({
    routes: [],
    scrollBehavior: () => ({ y: 0 })
  })
  router.matcher = newRouter.matcher
}

export default {
  state: {
    id: undefined,
    account: undefined,
    name: '用户',
    permission: undefined
  },
  getters: {
  },
  /**
   * store 中的状态的唯一方法
   * 通过store.commit()方法触发，来改变状态值
   */
  mutations: {
    'SET_USER_PERMISSION' (state, permission) {
      state.permission = permission
    },
    'UPDATE_USER_INFO' (state, user) {
      state.id = user.id
      state.account = user.account
      state.name = user.name
    },
    'RESET_USER_INFO' (state) {
      state.id = undefined
      state.account = undefined
      state.name = '用户'
      state.permission = undefined
    }
  },
  /**
   * 通过store.dispatch()方法来触发
   */
  actions: {
    'ChangeUserPermission' ({ state, commit, dispatch }, permission) {
      console.log('ChangeUserPermission -->', state.permission, permission, state.permission !== permission)
      if (state.permission !== permission) {
        commit('SET_USER_PERMISSION', permission)
        resetRouter()
        dispatch('GenerateRoutes').then(routes => {
          router.addRoutes(routes)
        })
      }
    },
    'GetUserInfo' ({ commit, dispatch, state }) {
      // 调用接口获取用户信息
      return ServiceGetUserInfo().then(result => {
        if (result.isSuccess) {
          let data = result.data
          // 存储用户信息
          // localStorage.setItem('User_Info', JSON.stringify(data))
          console.log('GetUserInfo -->', state.permission, data.permission, state.permission !== data.permission)
          // 更新用户信息【不包含权限信息， 权限信息在更新完菜单后更新】
          commit('UPDATE_USER_INFO', data)
          if (state.permission !== data.permission) {
            console.log('GetUserInfo -->', '更新用户权限')
            // 更新权限信息
            dispatch('ChangeUserPermission', data.permission)
          }
        } else {
          // 获取用户信息失败
          dispatch('UserLogout')
        }
        return result
      })
    },
    'UserLogin' ({ commit, dispatch }, data) {
      commit('RESET_USER_INFO')
      return dispatch('GetUserInfo')
    },
    'UserLogout' ({ commit, dispatch }) {
      commit('RESET_USER_INFO')
      resetRouter()
      dispatch('GenerateRoutes').then(routes => {
        router.addRoutes(routes)
      })
      dispatch('AppCloseAllPage')
    }

  }
}
