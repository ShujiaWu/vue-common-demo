/**
 * 系统路由钩子配置
 *
 * 在这里可以做
 * 1、权限验证
 * 2、登录状态检测
 * 3、用户信息获取
 */

import Vue from 'vue'
import Router from 'vue-router'
// 默认通用路由
import defaultRoutes from './routes'

import { filterRoutesSync } from '../utils/router'

import NProgress from '@vue-common/components/common/nprogress'

import { url as UserServiceUrl, getUserPagePermission } from '../services/user'
import store from '../store'

// 配置接口
UserServiceUrl.logout = '/logout' // 登出
UserServiceUrl.info = '/user/info' // 获取用户信息
UserServiceUrl.getUserPagePermission = '/permission/page' // 获取指定页面权限
UserServiceUrl.getAllPagePermission = '/user/page-permissions' // 获取所有页面权限

// 白名单
let whiteList = [
  '/',
  '/login'
]

Vue.use(Router)

let routes = filterRoutesSync(defaultRoutes)

let router = new Router({
  routes: routes,
  scrollBehavior: () => ({ y: 0 })
})

router.beforeEach((to, from, next) => {
  // console.log(`离开页面: ${from.path}`)
  NProgress.start()
  console.log(`---进入页面 [${from.fullPath}] => [${to.fullPath}]----`)
  // =================================================
  // beforeEach
  // =================================================
  // 判断用户是否有权限，
  // 当用户id为 undefined 时，
  // 不管是什么页面（除白名单外）全部跳去登录页
  if (store.state.user.id === undefined) {
    if (whiteList.indexOf(to.path) === -1) {
      console.log('---未检测到用户信息， 直接去登录')
      // 非白名单，直接去登陆
      next('/login')
    } else {
      console.log('---未检测到用户信息， 白名单，跳过')
      // 白名单，去页面
      next()
    }
    return
  }
  // 判断页面是否需要登录
  let isNeedLogin = false
  if (to.meta && to.meta.permission) {
    isNeedLogin = true
  }
  console.log(to.name, '，是否需要登录：', isNeedLogin)
  if (isNeedLogin) {
    // 获取用户基础信息
    store.dispatch('user/GetUserInfo').then(result => {
      if (result.isSuccess) {
        getUserPagePermission(to.name).then(result => {
          if (result.data) {
            next()
          } else {
            next('/401')
          }
        })
        // ===============================================
        // 权限控制
        // ===============================================
        // let auth = 0
        // if (to.meta && to.meta.permission) {
        //   auth = to.meta.permission
        // } else {
        //   auth = -1
        // }
        // if (auth & result.data.permission) {
        //   next()
        // } else {
        //   next('/401')
        // }
      } else {
        next('/login?redirect=' + location.href.substr(location.href.indexOf('#/') + 1))
      }
    })
  } else {
    next()
  }
})

router.afterEach(route => {
  // console.log(`成功浏览到: 【${route.name}】 ${route.path}`)

  // ============================================================
  // 设置标题
  // ============================================================
  document.title = route.meta.title || document.title
  // ============================================================
  // 通知窗体发生改变，改变布局
  // ============================================================
  if (store) {
    setTimeout(() => {
      store.dispatch('window/WindowResize')
    }, 500)
  }
  NProgress.done()
  console.log(`***正式进入页面${route.fullPath}`)
})

export default router

/**
 * 重置路由
 */
export function resetRouter () {
  // console.log('重置路由')
  const newRouter = new Router({
    routes: [],
    scrollBehavior: () => ({ y: 0 })
  })
  router.matcher = newRouter.matcher
}

// export {
//   router,
//   init,
//   resetRouter,
//   fullRoutes
// }
