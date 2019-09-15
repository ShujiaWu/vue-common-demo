import axios from 'axios'
export function getBaseInfo () {
  const params = {}
  return axios.get('user/info', params).then(result => {
    if (result.isSuccess) {
      const data = result.data
      const roles = []
      result.data.roles.forEach(element => {
        roles.push(element.name)
      })
      result.data = {
        id: data.id,
        name: data.name,
        userName: data.username,
        nickName: data.nickname,
        lastLoginTime: data.lastLoginTime,
        lastLoginIp: data.lastLoginIp,
        avatar: data.photo,
        roles: roles
      }
    }
    return result
  })
}
