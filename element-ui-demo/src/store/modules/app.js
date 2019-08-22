/**
 * 系统相关
 */
export default {
  namespaced: true, // 启用命名空间，使用的时候是 命名空间/mutation 命名空间/action
  state: {
    sidebar: {
      collapse: false
    },
    header: {
      fixed: true
    },
    globalAlert: {
      show: false,
      type: 'info',
      closable: false,
      closeText: undefined,
      showIcon: false,
      title: '',
      content: ''
    },
    pageHash: {},
    openedPageTags: [
      // 打开的页面的标签
    ],
    cachedPage: []
  },
  getters: {
  },
  /**
   * store 中的状态的唯一方法
   * 通过store.commit()方法触发，来改变状态值
   */
  mutations: {
    // SideBar 状态
    'SET_APP_SIDEBAR_COLLAPSE_STATUS' (state, status) {
      state.sidebar.collapse = !!status
    },
    // 显示全局通知
    'SET_APP_GLOBAL_ALERT_SHOW' (state, config) {
      Object.assign(state.globalAlert, config)
    },
    // 关闭全局通知
    'SET_APP_GLOBAL_ALERT_CLOSE' (state) {
      state.globalAlert.show = false
    },
    // 新增标签页
    'INSERT_APP_OPENED_TAG' (state, page) {
      state.openedPageTags.push(page)
    },
    // 更新标签页
    'UPDATE_APP_OPENED_TAG' (state, data) {
      Object.assign(state.openedPageTags[data.pos], data.page)
    },
    // 关闭标签页
    'CLOSE_APP_OPENED_TAG' (state, index) {
      state.openedPageTags.splice(index, 1)
    },
    // 关闭其他标签页
    'CLOSE_APP_OPENED_TAG_OTHER' (state, index) {
      let current = state.openedPageTags.splice(index, 1)
      state.openedPageTags.splice(0, state.openedPageTags.length, ...current)
      // 清理缓存的队列
      state.cachedPage.splice(0, state.cachedPage.length, current[0].name)
    },
    // 关闭所有标签页
    'CLOSE_APP_OPENED_TAG_ALL' (state, index) {
      state.openedPageTags.splice(0, state.openedPageTags.length)
    },
    'INSERT_CACHE_PAGE' (state, page) {
      console.log(page.name, !page.meta, (page.meta && !page.meta.noCached))
      if (page.name && (!page.meta || (page.meta && !page.meta.noCached))) {
        // 页面具有 Name 并且 （无页面meta 或有 meta 但没有指定为不缓存）
        if (!state.cachedPage.includes(page.name)) {
          state.cachedPage.push(page.name)
        }
      }
    },
    'DELETE_CACHE_PAGE_ALL' (state) {
      state.cachedPage.splice(0, state.cachedPage.length)
    },
    'DELETE_CACHE_PAGE' (state, name) {
      let pos = state.cachedPage.indexOf(name)
      if (pos !== -1) {
        state.cachedPage.splice(pos, 1)
      }
    },
    // 页面Hash值管理: 记录 hash 值
    'SET_PAGE_HASH' (state, { page, value }) {
      state.pageHash[page] = value
    },
    // 页面Hash值管理: 删除 hash 值
    'DELETE_PAGE_HASH' (state, { page }) {
      state.pageHash[page] = undefined
    }
  },
  /**
   * 通过store.dispatch()方法来触发
   */
  actions: {
    // SideBar 状态改变
    'AppSideBarCollapseStatusChange' ({ commit }, status) {
      commit('SET_APP_SIDEBAR_COLLAPSE_STATUS', status)
    },
    // 显示全局通知
    'AppGlobalAlertShow' ({ commit, dispatch }, config) {
      // 默认配置
      let defaultConfig = {
        show: true,
        type: 'info',
        closable: false,
        closeText: undefined,
        showIcon: false,
        title: '',
        content: ''
      }
      commit('SET_APP_GLOBAL_ALERT_SHOW', Object.assign(defaultConfig, config))
      setTimeout(() => {
        dispatch('window/WindowResize', null, { root: true })
      }, 50)
    },
    // 关闭全局通知
    'AppGlobalAlertClose' ({ commit, dispatch }) {
      commit('SET_APP_GLOBAL_ALERT_CLOSE')
      setTimeout(() => {
        dispatch('window/WindowResize', null, { root: true })
      }, 100)
    },
    // 打开新的页面
    'AppOpenNewPage' (context, page) {
      context.commit('INSERT_APP_OPENED_TAG', page)
      context.commit('INSERT_CACHE_PAGE', page)
    },
    // 更新打开的页面
    'UpdateOpenNewPage' (context, { pos, target }) {
      context.commit('UPDATE_APP_OPENED_TAG', {
        pos,
        page: target
      })
    },
    // 关闭页面
    'AppClosePage' (context, { page, index }) {
      context.commit('CLOSE_APP_OPENED_TAG', index)
      context.commit('DELETE_CACHE_PAGE', page.name)
    },
    // 关闭其他页面
    'AppCloseOtherPage' (context, index) {
      context.commit('CLOSE_APP_OPENED_TAG_OTHER', index)
    },
    // 关闭其他页面
    'AppCloseAllPage' (context) {
      context.commit('CLOSE_APP_OPENED_TAG_ALL')
      context.commit('DELETE_CACHE_PAGE_ALL')
    },
    'AppRefreshPage' (context, { page }) {
      return new Promise((resolve) => {
        context.commit('DELETE_CACHE_PAGE', page.name)
        resolve()
      })
    },
    // =====================================
    // CachePage 相关
    // =====================================
    // 进入新的页面
    'AppLeaveCachePage' (context, { page, value }) {
      context.commit('SET_PAGE_HASH', { page, value })
    },
    // 离开页面
    'AppEnterCachePage' (context, { page }) {
      context.commit('DELETE_PAGE_HASH', { page })
    }
  }
}
