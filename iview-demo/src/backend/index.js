import axios from 'axios'
import router from '../router'
import cookie from 'js-cookie'
import Qs from 'qs'
axios.defaults.baseURL = '/coa/admin'
axios.defaults.paramsSerializer = function (params) {
  return Qs.stringify(params, {
    arrayFormat: 'repeat'
  })
}
/**
 * 请求处理
 */
axios.interceptors.request.use(config => {
  if (!config.headers) {
    config.headers = {}
  }
  // 写入 CSRF Token
  const csrfToken = cookie.get('csrfToken')
  config.headers['x-csrf-token'] = csrfToken
  // 写入 token
  const token = cookie.get('token')
  config.headers.authorization = `Bearer ${token}`
  // 写入地址位置信息
  // config.headers['User-Gps'] = store.getters.getGeoposition
  switch (true) {
    case config.method.toLowerCase() === 'post':
    case config.method.toLowerCase() === 'put':
    case config.method.toLowerCase() === 'patch':
      if (!config.data) {
        config.data = {}
      }
      config.data.channel = 'PC'
      break
    case config.method.toLowerCase() === 'get':
    case config.method.toLowerCase() === 'delete':
    case config.method.toLowerCase() === 'head':
    case config.method.toLowerCase() === 'options':
      // GET请求
      if (!config.params) {
        config.params = {}
      }
      config.params.channel = 'PC'
      break
  }
  if (!config.params) {
    config.params = {}
  }
  config.params._t = new Date().getTime()
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应处理
 * 200: 成功
 * 400: Bad Request
 * 401: 未登录
 * 403: 权限不足
 * 404: NotFound
 * 40001: 系统处理异常
 * 40002: 业务处理异常
 * 40003: 参数有误
 */
axios.interceptors.response.use(response => {
  let isSuccess = true
  let message = ''
  switch (response.data.code) {
    case '200':
    case 200:
    case 'Success':
      isSuccess = true
      message = response.data.msg || response.data.message
      break
    case '401':
    case 401:
      // 未登录
      isSuccess = false
      message = response.data.msg
      // 获取用户信息接口需要单独处理
      if (response.request.responseURL.indexOf('u/info') === -1) {
        router.replace({
          path: '/login',
          query: {
            redirect: location.href.substr(location.href.indexOf('#/') + 1)
          }
        })
      }
      break
    case '403':
    case 403:
      // 权限不足
      isSuccess = false
      message = response.data.msg || response.data.message
      router.replace({
        name: '401'
      })
      break
    default:
      isSuccess = false
      message = response.data.subMsg || response.data.msg || response.data.message
      break
  }

  return {
    isSuccess: isSuccess,
    code: response.data.code,
    message: message,
    data: response.data.result || response.data.data
  }
}, error => {
  // HTTP 请求失败
  console.log(error)
  const response = error.response
  let message = 'HTTP请求失败:' + response.statusText
  let code = 'HTTP_ERROR'
  const status = response.status || 400
  if (response.data && response.data.message) {
    message = response.data.message
    code = response.data.statusCode
  }
  return {
    isSuccess: false,
    status: status,
    message: message,
    code: code
  }
})
export default axios
