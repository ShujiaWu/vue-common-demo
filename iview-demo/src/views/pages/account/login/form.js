// import { RegExpPhone, RegExpPwd } from '@vue-common/utils/validator'
/**
 * 登录表单数据
 */
export default _this => {
  return {
    // 表单数据
    data: {
      user: 'admin',
      pwd: '123456'
    },
    // 表单标签
    label: {
      user: '用户名：',
      pwd: '密码：'
    },
    // 提示
    placeholder: {
      user: '请输入用户名',
      pwd: '请输入密码'
    },
    // 校验规则
    rule: {
      user: [
        {
          required: true,
          message: '账户名不能为空',
          trigger: 'blur'
        }
        // {
        //   pattern: RegExpPhone,
        //   message: '请输入正确的账户名',
        //   trigger: 'blur'
        // }
      ],
      pwd: [
        {
          required: true,
          message: '密码不能为空',
          trigger: 'blur'
        }
        // {
        //   pattern: RegExpPwd,
        //   message: '请输入8位以上密码',
        //   trigger: 'blur'
        // }
      ]
    }
  }
}
