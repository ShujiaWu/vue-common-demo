import router from '../router'
import defaultRoutes, { Error404 } from '../router/routes'

import Router from 'vue-router'

export function initUserRouterAndMenu () {
  const data = [
    {
      id: '125909152017944576', // ID
      component: 'layout/Main', // 组件文件名称
      path: '/', // 路径
      url: '', // 第三方网页链接
      name: 'MainDemo', // 组件命名
      title: 'XBoot管理系统', // 标题
      icon: 'md-home', // 图标
      level: 0, // 层级
      parentId: '', // 父ID
      children: // 子路由
        [
          {
            id: '125909152017944577', // ID
            component: 'pages/demo/about', // 组件文件名称
            path: 'demo/about', // 路径
            url: '', // 第三方网页链接
            name: 'DemoAbout', // 组件命名
            title: 'Demo About', // 标题
            icon: 'md-home', // 图标
            level: 1, // 层级
            parentId: '125909152017944576', // 父ID
            buttonType: '',
            permTypes: null,
            showAlways: true,
            type: -1
          }
        ],
      buttonType: '',
      permTypes: null,
      showAlways: true,
      type: -1
    }
  ]

  initUserRouter(data)
}

function initUserRouter (data) {
  const routes = [].concat(defaultRoutes)

  initRouterNode(routes, data)

  // 插入 404 页面
  routes.push(Error404)
  // 重置路由并更新路由
  resetRouter()
  router.addRoutes(routes)
}

function initRouterNode (routers, data) {
  for (var item of data) {
    const menu = Object.assign({}, item)
    // menu.component = import(`@/views/${menu.component}.vue`);
    menu.component = lazyLoading(menu.component)

    if (item.children && item.children.length > 0) {
      menu.children = []
      initRouterNode(menu.children, item.children)
    }

    const meta = {}
    // 给页面添加权限、标题、第三方网页链接
    meta.permTypes = menu.permTypes ? menu.permTypes : null
    meta.title = menu.title ? menu.title + ' - iView 管理后台' : null
    meta.url = menu.url ? menu.url : null
    menu.meta = meta

    routers.push(menu)
  }
}

function lazyLoading (url) {
  return () => import(`@/views/${url}`)
}

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
