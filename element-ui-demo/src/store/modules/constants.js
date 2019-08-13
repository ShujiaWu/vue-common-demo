/**
 * 通用常量
 */
export default {
  state: {
    gender: [
      {
        label: '男',
        value: 1
      },
      {
        label: '女',
        value: 0
      }
    ],
    securityLevel: [
      {
        label: '初级',
        value: 1
      }
    ],
    // 100:账号密码登录 200:QQ登录 300:微信登录
    lastLoginType: [
      {
        label: '账号密码登录',
        value: 100
      },
      {
        label: 'QQ联登',
        value: 200
      },
      {
        label: '微信联登',
        value: 300
      }
    ],
    // 订单状态: 1000 待付款 1001 关闭(未付款订单超时关闭) 2000 已付款(未发货) 4000 已发货(未评价) 5000 已完成(已评价;三天未评价:自动好评)
    orderStatus: [
      {
        label: '待付款',
        value: 1000
      },
      {
        label: '超时关闭',
        value: 1001
      },
      {
        label: '手工关闭',
        value: 1002
      },
      {
        label: '用户删除',
        value: 1011
      },
      {
        label: '已付款待发货',
        value: 2000
      },
      {
        label: '退款中',
        value: 2200
      },
      {
        label: '原通道退款中',
        value: 2210
      },
      {
        label: '原通道退款失败',
        value: 2211
      },
      {
        label: '已退款',
        value: 2300
      },
      {
        label: '已发货待评价',
        value: 4000
      },
      {
        label: '发货失败',
        value: 3001
      },
      {
        label: '自动发货失败',
        value: 3002
      },
      {
        label: '订单完成',
        value: 5000
      }
    ],
    // 发货方式: 100 手动发货 200 自动发货
    orderSentType: [
      {
        label: '手动发货',
        value: 100
      },
      {
        label: '自动发货',
        value: 200
      }
    ],
    payMethod: [
      {
        label: '支付宝',
        value: 1001,
        svg: 'alipay'
      },
      {
        label: '微信',
        value: 2001,
        svg: 'wechat-pay'
      }
    ]
  },
  getters: {
  },
  /**
   * store 中的状态的唯一方法
   * 通过store.commit()方法触发，来改变状态值
   */
  mutations: {
  },
  /**
   * 通过store.dispatch()方法来触发
   */
  actions: {
  }
}
