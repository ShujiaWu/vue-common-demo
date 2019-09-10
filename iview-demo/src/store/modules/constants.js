/**
 * 通用常量
 */
export default {
  namespaced: true, // 启用命名空间，使用的时候是 命名空间/mutation 命名空间/action
  state: {
    gender: [
      {
        label: '男',
        value: 1
      },
      {
        label: '女',
        value: 0
      }
    ]
  },
  getters: {
  },
  /**
   * store 中的状态的唯一方法
   * 通过store.commit()方法触发，来改变状态值
   */
  mutations: {
  },
  /**
   * 通过store.dispatch()方法来触发
   */
  actions: {
  }
}
