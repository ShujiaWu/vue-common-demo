import axios from '@common/backend'
// import store from '@/admin/store/index'
// import router from '@/admin/router/index'
// import MutationTypes from '@/admin/store/mutation-types'

// ==================================================================
// API 接口域配置
// ==================================================================
axios.defaults.baseURL = '/api'

// ==================================================================
// 钩子顺序： 【Service】 => 【通用request】 => 【系统request】 =>
//               【通用response】 => 【系统response】 => 【Service】
// ==================================================================
axios.interceptors.response.use(response => {
  return response
})

export default axios
