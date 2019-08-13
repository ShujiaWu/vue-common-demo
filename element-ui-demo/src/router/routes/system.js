
import Layout from '@common/pages/Layout'
export default [
  {
    path: '/system',
    name: 'System',
    component: Layout,
    redirect: '/system/game-menu',
    alwaysShow: false, // TODO: 后期设置为false
    meta: {
      title: '系统管理'
    },
    children: [
      {
        path: 'role',
        name: 'SystemRoleList',
        component: () => import('../../pages/system/role'),
        meta: {
          title: '角色管理',
          permission: true
        }
      },
      {
        path: 'user',
        name: 'SystemUserList',
        component: () => import('../../pages/system/user'),
        meta: {
          title: '用户管理',
          permission: true
        }
      }
    ]
  }
]
