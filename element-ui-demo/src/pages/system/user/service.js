
import axios from 'axios'
import md5 from 'md5'
export function getList (data) {
  let params = {
    // 分页信息
    pageNow: data.page.page,
    pageSize: data.page.size,
    // 过滤条件
    id: data.filter.id,
    name: data.filter.name,
    account: data.filter.account
  }
  return axios.get('/users', {
    params
  }).then(result => {
    if (result.isSuccess) {
      // 列表数据
      let list = []
      for (let i = 0; i < result.data.list.length; i++) {
        let item = result.data.list[i]
        list.push({
          id: item.id,
          name: item.name,
          account: item.account,
          enable: item.enable,
          lastLoginTime: item.lastLoginTime || '-',
          createTime: item.createdAt
        })
      }
      result.data = {
        list: list,
        // 分页数据
        pagination: {
          total: result.data.pagination.total,
          current: result.data.pagination.pageNum,
          size: result.data.pagination.pageSize,
          pages: result.data.pagination.pages
        }
      }
    }
    return result
  })
}
export function getAllRoles (userId) {
  let params = {
  }
  return axios.get('permission/roles', {
    params
  }).then(result => {
    if (result.isSuccess) {
      // 列表数据
      let list = []
      for (let i = 0; i < result.data.length; i++) {
        let item = result.data[i]
        list.push({
          label: item.name,
          value: item.id
        })
      }
      result.data = list
    }
    return result
  })
}

export function getUserRoles (userId) {
  let params = {}
  return axios.get(`/permission/user/${userId}/roles`, {
    params
  }).then(result => {
    if (result.isSuccess) {
      // 列表数据
      let list = []
      for (let i = 0; i < result.data.length; i++) {
        let item = result.data[i]
        list.push(item)
      }
      result.data = list
    }
    return result
  })
}

export function add (data) {
  let params = {
    account: data.account,
    name: data.name,
    password: data.pwd ? md5(data.pwd) : undefined,
    roles: data.roles
  }
  return axios.post('/user', params)
}

export function modify (data) {
  let params = {
    account: data.account,
    name: data.name,
    password: data.pwd ? md5(data.pwd) : undefined,
    roles: data.roles,
    enable: data.enable
  }
  return axios.put(`/user/${data.id}`, params)
}

export function del (data) {
  let params = {}
  return axios.delete(`/user/${data.id}`, { params })
}
