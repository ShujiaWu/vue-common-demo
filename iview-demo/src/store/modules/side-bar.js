export default {
  namespaced: true, // 启用命名空间，使用的时候是 命名空间/mutation 命名空间/action
  state: {
    menus: [
      {
        id: '0',
        title: '没有子菜单的情况', // 标题
        name: 'URL-0', // 组件命名
        icon: 'ios-paper', // 图标
        type: 'ROUTE',
        url: 'URL-0',
        path: 'URL-0'
      },
      {
        id: '1',
        title: '菜单组', // 标题
        name: 'URL-1', // 组件命名
        icon: 'ios-paper', // 图标
        type: 'ROUTE',
        url: 'URL-1',
        path: 'URL-1',
        children: [
          {
            id: '1-1',
            title: '子菜单 1', // 标题
            name: 'URL-1-1', // 组件命名
            icon: 'ios-paper', // 图标
            type: 'ROUTE',
            url: 'URL-1-1',
            path: 'URL-1-1'
          }
        ]
      },
      {
        id: '2',
        title: '一级菜单', // 标题
        name: 'URL-2', // 组件命名
        icon: 'ios-paper', // 图标
        type: 'ROUTE',
        url: 'URL-2',
        path: 'URL-2',
        children: [
          {
            id: '2-1',
            title: '二级菜单', // 标题
            name: 'URL-2-1', // 组件命名
            icon: 'ios-paper', // 图标
            type: 'ROUTE',
            url: 'URL-2-1',
            path: 'URL-2-1'
          },
          {
            id: '2-2',
            title: '二级菜单', // 标题
            name: 'URL-2-2', // 组件命名
            icon: 'ios-paper', // 图标
            type: 'ROUTE',
            url: 'URL-2-2',
            path: 'URL-2-2',
            children: [
              {
                id: '2-2-1',
                title: '三级菜单', // 标题
                name: 'URL-2-2-1', // 组件命名
                icon: 'ios-paper', // 图标
                type: 'ROUTE',
                url: 'URL-2-2-1',
                path: 'URL-2-2-1'
              }
            ]
          },
          {
            id: '2-3',
            title: '二级菜单', // 标题
            name: 'URL-2-3', // 组件命名
            icon: 'ios-paper', // 图标
            type: 'ROUTE',
            url: 'URL-2-3',
            path: 'URL-2-3'
          }
        ]
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
