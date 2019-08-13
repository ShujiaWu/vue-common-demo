import axios from 'axios'
export default {
  getList (data) {
    let params = {
      // 分页信息
      pageNow: data.page.page,
      pageSize: data.page.size
    }
    return axios
      .get(`file/page`, {
        params
      })
      .then(result => {
        return result
      })
      .then(result => {
        if (result.isSuccess) {
          let list = []
          result.data.list.forEach(element => {
            list.push({
              id: element.fileId,
              name: element.originalName,
              datetime: new Date(element.createTime),
              url: element.url,
              size: element.size
            })
          })
          result.data = {
            list,
            page: {
              total: result.data.pageMsg.total,
              current: result.data.pageMsg.pageNum,
              size: result.data.pageMsg.pageSize,
              pages: result.data.pageMsg.pages
            }
          }
        }
        return result
      })
  }
}
