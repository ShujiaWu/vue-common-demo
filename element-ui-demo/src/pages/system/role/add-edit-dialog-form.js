export default {
  loading: false,
  data: {
    id: undefined,
    name: undefined,
    page: []
  },
  placeholder: {
    name: '请输入角色名称'
  },
  rules: {
    name: [
      {
        required: true,
        message: '角色名称不能为空',
        trigger: 'blur'
      }
    ]
  }
}
