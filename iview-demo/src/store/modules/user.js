/**
 * 用户相关
 */
import { getBaseInfo as ServiceGetUserInfo } from '@/services/user'

export default {
  namespaced: true, // 启用命名空间，使用的时候是 命名空间/mutation 命名空间/action
  state: {
    id: undefined,
    name: undefined,
    userName: undefined,
    nickName: undefined,
    lastLoginTime: undefined,
    lastLoginIp: undefined,
    avatar: undefined,
    roles: []
  },
  getters: {
  },
  /**
   * store 中的状态的唯一方法
   * 通过store.commit()方法触发，来改变状态值
   */
  mutations: {
    'UPDATE_USER_INFO' (state, user) {
      state.id = user.id
      state.name = user.name
      state.userName = user.userName
      state.nickName = user.nickName
      state.lastLoginTime = user.lastLoginTime
      state.lastLoginIp = user.lastLoginIp
      state.avatar = user.avatar
      state.roles.splice(0, state.roles.length, ...user.roles)
    },
    'RESET_USER_INFO' (state) {
      state.id = undefined
      state.name = undefined
      state.userName = undefined
      state.nickName = undefined
      state.lastLoginTime = undefined
      state.lastLoginIp = undefined
      state.avatar = undefined
      state.roles.splice(0, state.roles.length)
    }
  },
  /**
   * 通过store.dispatch()方法来触发
   */
  actions: {
    'GetUserInfo' ({ commit, dispatch, state }) {
      // 调用接口获取用户信息
      return ServiceGetUserInfo().then(result => {
        if (result.isSuccess) {
          const data = result.data
          // 更新用户信息【不包含权限信息， 权限信息在更新完菜单后更新】
          commit('UPDATE_USER_INFO', data)
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
    }
  }
}
