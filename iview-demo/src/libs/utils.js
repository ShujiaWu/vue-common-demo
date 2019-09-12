import router from '../router'
import defaultRoutes, { Error404 } from '../router/routes'

import Router from 'vue-router'

import axios from 'axios'
import path from 'path'

export function initUserRouterAndMenu () {
  // const data = [
  //   {
  //     id: '125909152017944576', // ID
  //     component: 'layout/Main', // 组件文件名称
  //     path: '/', // 路径
  //     url: '', // 第三方网页链接
  //     name: 'MainDemo', // 组件命名
  //     title: 'XBoot管理系统', // 标题
  //     icon: 'md-home', // 图标
  //     level: 0, // 层级
  //     parentId: '', // 父ID
  //     children: // 子路由
  //       [
  //         {
  //           id: '125909152017944577', // ID
  //           component: 'pages/demo/about', // 组件文件名称
  //           path: 'demo/about', // 路径
  //           url: '', // 第三方网页链接
  //           name: 'DemoAbout', // 组件命名
  //           title: 'Demo About', // 标题
  //           icon: 'md-home', // 图标
  //           level: 1, // 层级
  //           parentId: '125909152017944576', // 父ID
  //           buttonType: '',
  //           permTypes: null,
  //           showAlways: true,
  //           type: -1
  //         }
  //       ],
  //     buttonType: '',
  //     permTypes: null,
  //     showAlways: true,
  //     type: -1
  //   }
  // ]

  return axios.get('user/menus').then(result => {
    if (result.isSuccess) {
      const data = initMenuData(result.data)
      initUserRouter(data)
      console.log(data)
      return data
    } else {
      return []
    }
  })

  // initUserRouter(data)
}

function initUserRouter (data) {
  const routes = [].concat(defaultRoutes)

  data.forEach(item => {
    if (item.children) {
      routes.push(...item.children)
    }
  })

  // 插入 404 页面
  routes.push(Error404)
  // 重置路由并更新路由
  resetRouter()
  router.addRoutes(routes)
}

// function initRouterNode (routers, data, parent) {
//   for (var item of data) {
//     const menu = Object.assign({}, item)

//     // menu.level = parent ? [].concat(parent.level) : []
//     // menu.level.push(menu)

//     // menu.level = []

//     menu.component = lazyLoading(menu.component)

//     if (item.children && item.children.length > 0) {
//       menu.children = []
//       initRouterNode(menu.children, item.children)
//     }

//     const meta = {}
//     // 给页面添加权限、标题、第三方网页链接
//     meta.title = menu.title ? menu.title + ' - iView 管理后台' : null
//     meta.url = menu.url ? menu.url : null
//     menu.meta = meta

//     routers.push(menu)
//   }
// }

function initMenuData (menus, parent) {
  const outMenus = []
  menus.forEach(item => {
    const level = parent ? [].concat(parent.meta.level) : []
    const outItem = {
      id: item.id,
      path: item.path,
      name: item.name,
      title: item.title,
      componentPath: item.component,
      component: lazyLoading(item.component),
      meta: {
        hidden: item.hidden,
        title: item.title + ' - iView 管理后台',
        url: item.url,
        icon: item.icon,
        parent: parent,
        level: level
      }
    }
    level.push(outItem)
    outItem.fullPath = path.resolve(
      ...(level.slice(1).map(value => value.path))
    )

    if (item.children && item.children.length) {
      // 有下一级
      // 递归处理
      outItem.children = initMenuData(item.children, outItem)
    }

    outMenus.push(outItem)
  })
  return outMenus
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
