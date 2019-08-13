export default [
  {
    url: '/user/list',
    type: 'get',
    response: config => {
      return {
        code: '10000',
        message: 'success',
        result: {
          pageMsg: {
            pageNum: 1,
            pageSize: 20,
            pages: 1,
            total: 1
          },
          list: [
            {
              id: 1,
              name: '管理员',
              account: '123123',
              createTime: '2012-12-12 12:12:12',
              lastLoginTime: '2012-12-12 12:12:12',
              enable: 1
            }
          ]
        }
      }
    }
  },
  {
    url: '/user/page-auth',
    type: 'get',
    response: config => {
      return {
        code: '10000',
        message: 'success',
        result: [
          {
            id: 1,
            name: 'CustomerList', // 页面的名字
            permission: 1
          },
          {
            id: 1,
            name: 'SystemRoleList', // 页面的名字
            permission: 1
          },
          {
            id: 1,
            name: 'SystemUserList', // 页面的名字
            permission: 1
          }
        ]
      }
    }
  },
  {
    url: '/user/page/permisssion',
    type: 'get',
    response: config => {
      return {
        code: '10000',
        message: 'success',
        result: {
          name: config.query.pageName,
          permission: 1
        }
      }
    }
  },
  {
    url: '/user/role/list',
    type: 'get',
    response: config => {
      return {
        code: '10000',
        message: 'success',
        result: {
          pageMsg: {
            pageNum: 1,
            pageSize: 20,
            pages: 1,
            total: 1
          },
          list: [
            {
              id: 1,
              name: '管理员',
              createTime: '2012-12-12',
              enable: 1
            }
          ]
        }
      }
    }
  },
  {
    url: '/user/role/all',
    type: 'get',
    response: config => {
      return {
        code: '10000',
        message: 'success',
        result: [
          {
            id: 1,
            name: '管理员',
            enable: 1
          },
          {
            id: 2,
            name: '角色1',
            enable: 1
          },
          {
            id: 3,
            name: '角色2',
            enable: 1
          }
        ]
      }
    }
  },
  {
    url: '/user/role/permission',
    type: 'get',
    response: config => {
      return {
        code: '10000',
        message: 'success',
        result: [
          {
            pageName: 'CustomerList',
            value: 1
          }
        ]
      }
    }
  },
  {
    url: '/user/roles',
    type: 'get',
    response: config => {
      return {
        code: '10000',
        message: 'success',
        result: [
          1, 2, 3
        ]
      }
    }
  },
  {
    url: '/user/role',
    type: 'post',
    response: config => {
      console.log(config.body)
      return {
        code: '10000',
        message: 'success'
      }
    }
  },
  {
    url: '/user/role',
    type: 'put',
    response: config => {
      console.log(config.body)
      return {
        code: '10000',
        message: 'success'
      }
    }
  },
  {
    url: '/user/role',
    type: 'delete',
    response: config => {
      console.log(config.query)
      return {
        code: '10000',
        message: 'success'
      }
    }
  }
]
