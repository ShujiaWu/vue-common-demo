import Vue from 'vue'
import Router from 'vue-router'
// 默认通用路由
import defaultRoutes from './routes'

import { store } from '../store'

import { filterRoutesSync } from '../utils/router'

import NProgress from '@vue-common/components/common/nprogress'

Vue.use(Router)

let router = null
let fullRoutes = null

function init (_routes, beforeEach, afterEach) {
  if (!_routes || !(_routes instanceof Array)) {
    _routes = []
  }

  fullRoutes = _routes.concat(...defaultRoutes)
  let routes = filterRoutesSync(fullRoutes)

  router = new Router({
    routes: routes,
    scrollBehavior: () => ({ y: 0 })
  })

  router.beforeEach((to, from, next) => {
    // console.log(`离开页面: ${from.path}`)
    NProgress.start()
    if (beforeEach && typeof beforeEach === 'function') {
      beforeEach(to, from, next)
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
        store.dispatch('WindowResize')
      }, 500)
    }

    // ============================================================
    // 接下来处理每个系统特有的钩子
    // ============================================================
    if (afterEach && typeof afterEach === 'function') {
      afterEach(route)
    }
    NProgress.done()
  })

  return router
}

/**
 * 重置路由
 */
function resetRouter () {
  // console.log('重置路由')
  const newRouter = new Router({
    routes: [],
    scrollBehavior: () => ({ y: 0 })
  })
  router.matcher = newRouter.matcher
}

export {
  router,
  init,
  resetRouter,
  fullRoutes
}
