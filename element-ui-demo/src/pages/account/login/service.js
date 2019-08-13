import axios from 'axios'
import md5 from 'md5'

export function login (data) {
  let params = {
    account: data.account,
    password: md5(data.pwd)
  }
  return axios.post('/login', params).then(result => {
    if (result.isSuccess) {
      let data = result.data
      result.data = {
        account: data.account,
        id: data.id,
        lastLoginTime: data.lastLoginTime,
        name: data.name,
        permission: data.permission
      }
    }
    return result
  })
}
