import axios from 'axios'
export function getList (data) {
  let params = {
    // 分页信息
    pageNow: data.page.page,
    pageSize: data.page.size,
    // 过滤条件
    id: data.filter.id,
    name: data.filter.name
  }
  return axios.get('/permission/roles/pagination', {
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
          enable: item.enable,
          createTime: item.createdAt
        })
      }
      result.data = {
        list: list,
        // 分页数据
        pagination: {
          total: result.data.pagination.total,
          current: result.data.pagination.current,
          size: result.data.pagination.size,
          pages: result.data.pagination.pages
        }
      }
    }
    return result
  })
}
export function getRolePermission (roleId) {
  let params = {}
  return axios.get(`/permission/role/${roleId}/pages`, {
    params
  }).then(result => {
    if (result.isSuccess) {
      // 列表数据
      let list = []
      for (let i = 0; i < result.data.length; i++) {
        let item = result.data[i]
        list.push({
          pageName: item.pageName,
          permission: item.permission
        })
      }
      result.data = list
    }
    return result
  })
}

export function add (data) {
  let params = {
    name: data.name,
    list: data.page
  }
  return axios.post('/permission/role', params)
}

export function modify (data) {
  let params = {
    name: data.name,
    list: data.page,
    enable: data.enable
  }
  return axios.put(`/permission/role/${data.id}`, params)
}

export function del (data) {
  let params = {}
  return axios.delete(`/permission/role/${data.id}`, {
    params
  })
}
