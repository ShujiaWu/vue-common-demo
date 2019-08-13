import axios from 'axios'
// import { store } from '../store'
export const url = {
  logout: '',
  info: '',
  getUserPagePermission: '',
  getAllPagePermission: ''
}

export function logout () {
  return axios.post(url.logout)
}

// TODO: 这里的接口需要根据实际修改
export function getBaseInfo () {
  let params = {}
  return axios.get(url.info, params).then(result => {
    if (result.isSuccess) {
      let data = result.data
      result.data = {
        account: data.account,
        id: data.id,
        lastLoginTime: data.lastLoginTime,
        name: data.name,
        permission: data.permission
      }
      // 获取成功
      // store.dispatch('GetUserInfo', result.data)
    }
    return result
  })
  // let result = {
  //   isSuccess: true,
  //   data: {
  //     nickName: '新用户',
  //     permission: true
  //   }
  // }
  // store.dispatch('GetUserInfo', result.data)
  // return Promise.resolve(result)
}

export function getUserPagePermission (pageName) {
  let params = {
  }
  return axios.get(`${url.getUserPagePermission}/${pageName}`, { params }).then(result => {
    if (result.isSuccess) {
      // result.data = result.data
    } else {
      result.data = 0
    }
    return result
  })
}

export function getUserAllPagePermission (userId) {
  let params = {
    userId: userId
  }
  return axios.get(url.getAllPagePermission, { params }).then(result => {
    let map = {}
    if (result.isSuccess) {
      result.data.forEach(page => {
        map[page.pageName] = page.permission
      })
    }
    return map
  })
}
