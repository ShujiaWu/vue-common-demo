
import Layout from '@/pages/Layout'
export default [
  {
    path: '/demo',
    name: 'Demo',
    component: Layout,
    redirect: '/demo/pdf',
    alwaysShow: false, // TODO: 后期设置为false
    meta: {
      title: 'Demo'
    },
    children: [
      {
        path: 'global-alert',
        name: 'GlobalAlertPage',
        component: () => import('../../pages/demo/global-alert'),
        meta: {
          title: '全局通知',
          permission: true
        }
      },
      {
        path: 'long-page',
        name: 'LongPage',
        component: () => import('../../pages/demo/long-page'),
        meta: {
          title: '长页面展示',
          permission: true
        }
      },
      {
        path: 'svg-icon',
        name: 'SvgIconPage',
        component: () => import('../../pages/demo/svg-icon'),
        meta: {
          title: 'SVG ICON',
          permission: true
        }
      },
      {
        path: 'icon-font',
        name: 'IconFontPage',
        component: () => import('../../pages/demo/icon-font'),
        meta: {
          title: 'ICON FONT',
          permission: true
        }
      },
      {
        path: 'pdf/iframe',
        name: 'PDF_Iframe_Page',
        component: () => import('../../pages/demo/pdf-iframe'),
        meta: {
          title: 'PDF查看(原生)',
          permission: true
        }
      },
      {
        path: 'pdf/iframe/pdfjs',
        name: 'PDF_PDFJS_Page',
        component: () => import('../../pages/demo/pdf-iframe-pdfjs'),
        meta: {
          title: 'PDF查看(PDF.js)',
          permission: true
        }
      }
    ]
  }
]
