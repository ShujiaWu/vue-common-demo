export default {
  namespaced: true, // 启用命名空间，使用的时候是 命名空间/mutation 命名空间/action
  state: {
    body: {
      width: 0,
      height: 0
    },
    header: {
      height: 50
    }
  },
  /**
   * store 中的状态的唯一方法
   * 通过store.commit()方法触发，来改变状态值
   */
  mutations: {
    /**
     * 窗体改变
     */
    'UPDATE_WINDOW_SIZE' (state, status) {
      Object.assign(state, status)
    }
  },
  /**
   * 通过store.dispatch()方法来触发
   */
  actions: {
    /**
     * 窗体改变
     */
    'Resize' ({ commit }) {
      const obj = {}

      // 计算Body
      obj.body = {
        width: window.innerWidth,
        height: window.innerHeight
      }

      // 计算 Header
      const headerEle = document.getElementById('header')
      if (headerEle) {
        obj.header = {
          height: headerEle.clientHeight
        }
        // // 如果页面用了模板 + 10px （如果有全局通知就不加）
        // let pageEle = document.getElementsByClassName('router-view')
        // if (pageEle.length && pageEle[0].classList.contains('page') && !headerEle.getElementsByClassName('global-alert').length) {
        //   obj.header.height += 10
        // }
      }

      // // let contentBox = window.getComputedStyle(document.getElementById('main-layout-page'))
      // let mainBox = document.getElementById('main-layout-page')
      // if (!mainBox) {
      //   return
      // }
      // let mainBoxStyle = window.getComputedStyle(mainBox)

      // obj.mainBox = {
      //   width: mainBox.clientWidth - parseFloat(mainBoxStyle.paddingLeft) - parseFloat(mainBoxStyle.paddingRight),
      //   height: mainBox.clientHeight - parseFloat(mainBoxStyle.paddingTop) - parseFloat(mainBoxStyle.paddingBottom)
      // }
      // obj.mainBox.maxHeight = obj.body.height - parseFloat(mainBoxStyle.paddingTop) - parseFloat(mainBoxStyle.paddingBottom)

      // obj.contentBox = {
      //   width: obj.mainBox.width - 20 - 20,
      //   height: obj.mainBox.height - 20 - 20
      // }

      // obj.contentBox.maxHeight = obj.mainBox.maxHeight - 20 - 20

      commit('UPDATE_WINDOW_SIZE', obj)
    }
  },
  /**
   * 对外暴露的方法
   */
  getters: {

  }
}
