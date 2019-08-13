import { getUserAllPagePermission as ServiceGetUserAllPagePermission } from '../services/user'

function getUserAllPagePermission (userId) {
  console.log('getUserAllPagePermission --> userId', userId)
  if (userId) {
    return ServiceGetUserAllPagePermission(userId)
  } else {
    return Promise.resolve({})
  }
}

/**
 * 判断路由是否具有可访问权限
 * @param {String} permission 页面权限HashMap
 * @param {String} route 路由
 */
function hasPermission (permission, route) {
  if (route.meta && route.meta.permission) {
    // console.log(route.name, route.meta.permission, permission, !!permission[route.name])
    return !!permission[route.name]
  } else {
    return true
  }
}

/**
 * 递归过滤路由表，返回符合用户角色权限的路由表 【异步】
 * @param routes 路由
 */
export function filterRoutes (routes, userId) {
  return getUserAllPagePermission(userId).then(permission => {
    const res = []
    routes.forEach(route => {
      const tmp = { ...route }
      if (hasPermission(permission, tmp)) {
        if (tmp.children) {
          tmp.children = filterRoutesSync(tmp.children, permission)
        }
      }
      res.push(tmp)
    })

    return Promise.resolve(res)
  })
}

/**
 * 递归过滤路由表，返回符合用户角色权限的路由表 【同步】
 * @param routes 路由
 * @param permission 用户权限
 */
export function filterRoutesSync (routes, permission = {}) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(permission, tmp)) {
      if (tmp.children) {
        tmp.children = filterRoutesSync(tmp.children, permission)
      }
      res.push(tmp)
    }
  })
  return res
}

// TODO: 写一个从全部路由中提取不需要权限验证的方法
