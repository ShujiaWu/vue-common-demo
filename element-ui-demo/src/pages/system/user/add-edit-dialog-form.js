export default {
  loading: false,
  data: {
    id: undefined,
    name: undefined,
    account: undefined,
    pwd: undefined,
    roles: []
  },
  placeholder: {
    name: '请输入昵称',
    account: '请输入登录账号',
    pwd: '请输入登录密码'
  },
  rules: {
    name: [
      {
        required: true,
        message: '昵称不能为空',
        trigger: 'blur'
      }
    ],
    account: [
      {
        required: true,
        message: '登录账号不能为空',
        trigger: 'blur'
      }
    ],
    pwd: [
      {
        required: true,
        message: '登录密码不能为空',
        trigger: 'blur'
      }
    ]
  }
}
