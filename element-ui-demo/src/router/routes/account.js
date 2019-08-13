export default [
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    meta: {
      title: '登录',
      noCached: true
    },
    component: resolve => require(['@/pages/account/login'], resolve)
  }
]
