export default () => {
  const obj = {
    // 表单数据
    data: {
      id: undefined, // ID
      parentId: undefined, // 父级ID
      title: undefined, // 标题
      titleEn: undefined, // 标题(En)
      name: undefined, // 名称
      icon: undefined, // 图标
      path: undefined, // 路径
      url: undefined, // 第三方页面地址
      component: undefined, // 组件路径
      type: 'Fn', // 类型（TopMenu/MenuGroup/Menu/Fn）
      sortOrder: undefined,
      showAlways: 0, // 是否一直显示
      fnType: 'add', // 功能类型
      status: 1 // 状态
    },
    // 校验规则
    rule: {
      title: [
        {
          required: true,
          message: '名称不能为空',
          trigger: 'blur'
        }
      ],
      name: [
        {
          required: true,
          message: '路由英文名不能为空',
          trigger: 'blur'
        }
      ],
      icon: [
        {
          required: true,
          message: '图标不能为空',
          trigger: 'click'
        }],
      path: [
        {
          required: true,
          message: '路径不能为空',
          trigger: 'blur'
        }],
      component: [
        {
          required: true,
          message: '前端组件不能为空',
          trigger: 'blur'
        }
      ]
    }
  }
  return obj
}
