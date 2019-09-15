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
import routes from './routes'

// import { url as UserServiceUrl, getUserPagePermission } from '../services/user'
import store from '../store'

// 白名单
const whiteList = [
  '/login'
]

Vue.use(Router)

// const routes = filterRoutesSync(defaultRoutes)

const router = new Router({
  // mode: 'history',
  routes: routes,
  scrollBehavior: () => ({ y: 0 })
})

router.beforeEach((to, from, next) => {
  console.log(`离开页面: ${from.path}`)
  // console.log(`---进入页面 [${from.fullPath}] => [${to.fullPath}]----`)
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
  } else {
    store.dispatch('user/GetUserInfo').then(result => {
      if (result.isSuccess) {
        next()
      } else {
        next('/login?redirect=' + location.href.substr(location.href.indexOf('#/') + 1))
      }
    })
  }
})

router.afterEach(route => {
  console.log(`成功浏览到: 【${route.name}】 ${route.path}`)

  // ============================================================
  // 设置标题
  // ============================================================
  document.title = route.meta.title || document.title
  // ============================================================
  // 通知窗体发生改变，改变布局
  // ============================================================

  // 设置标题
  document.title = route.meta.title

  // 面包屑
  const breadcurmb = []
  // 如果不是主页，则加入主页
  // if (route.name !== 'Dashboard') {
  //   breadcurmb.push({
  //     meta: {
  //       title: '主页'
  //     },
  //     name: 'Home',
  //     path: '/'
  //   })
  // }
  // 遍历页面匹配路由，加入到面包屑中
  // route.matched.forEach(function (element) {
  //   // console.log(element)
  //   if (!element.meta.hidden) {
  //     breadcurmb.push({
  //       meta: element.meta,
  //       name: element.name,
  //       path: element.meta.disabled
  //         ? undefined
  //         : element.path === ''
  //           ? '/'
  //           : element.path
  //     })
  //   }
  // }, this)

  if (route.meta && route.meta.level) {
    for (let i = 1; i < route.meta.level.length; i++) {
      const element = route.meta.level[i]
      if (!element.meta.hidden) {
        breadcurmb.push({
          title: element.meta.title
        })
      }
    }
    if (!breadcurmb.length) {
      breadcurmb.push({
        title: route.meta.title
      })
    } else {
      if (route.name !== 'Dashboard') {
        breadcurmb.unshift({
          title: '主页'
        })
      }
    }
  }

  store.dispatch('app/UpdateBreadcurmb', breadcurmb)

  if (store) {
    setTimeout(() => {
      store.dispatch('window/Resize')
    }, 500)
  }
})

export default router
