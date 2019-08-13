
import Layout from '@common/pages/Layout'
export default [
  {
    path: '/wiki',
    name: 'Wiki',
    component: Layout,
    redirect: '',
    alwaysShow: false, // TODO: 后期设置为false
    meta: {
      title: '文章中心'
    },
    children: [
      {
        path: 'category',
        name: 'WikiCategory',
        component: () => import('../../pages/wiki/category'),
        meta: {
          title: '文章分类',
          permission: true
        }
      },
      {
        path: 'article',
        name: 'WikiArticleList',
        component: () => import('../../pages/wiki/article'),
        meta: {
          title: '文章列表',
          permission: true
        }
      }
    ]
  }
]
