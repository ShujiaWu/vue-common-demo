import axios from 'axios'
// import md5 from 'md5'
export default {

  /**
   * 用户登录
   * @param {*} user  用户登录信息
   */
  login (user) {
    return axios.post('/login', {
      username: user.user,
      password: user.pwd
    })
  }
}
