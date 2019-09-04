/**
 * 路由配置
 *
 * 系统路由配置
 */
import MainLayout from '@/views/layout/Main'

/**
* hidden: true                   是否在左侧菜单隐藏显示，默认：false
* alwaysShow: true               强制显示
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             必填
* meta : {
    roles: -1                    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
**/

export const defaultRoutes = [
  {
    path: '/redirect',
    component: MainLayout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@vue-common/pages/common/redirect')
      }
    ]
  },
  {
    path: '/',
    component: MainLayout,
    redirect: 'dashboard',
    meta: {
      title: '主面板'
    },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/pages/dashboard'),
        hidden: true,
        meta: {
          title: 'Dashboard',
          noCached: true
        }
      },
      {
        path: 'system/menus',
        name: 'SystemMenu',
        component: () => import('@/views/pages/system/menu'),
        hidden: true,
        meta: {
          title: '菜单配置',
          noCached: true
        }
      }
    ]
  }
]

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRoutes = {
  path: '/',
  name: 'otherRouter',
  // redirect: '/home',
  component: MainLayout,
  children: [
  ]
}
// 错误处理页面
export const errorRoutes = [
  {
    path: '/401',
    name: '401',
    hidden: true,
    meta: {
      title: '401',
      white: true
    },
    component: resolve => require(['@vue-common/pages/common/error/401'], resolve)
  }

]

export const Error404 = {
  path: '*',
  name: '404',
  hidden: true,
  meta: {
    title: '404',
    white: true
  },
  component: resolve => require(['@vue-common/pages/common/error/404'], resolve)
}

export default [
  ...defaultRoutes,
  otherRoutes,
  ...errorRoutes
]
