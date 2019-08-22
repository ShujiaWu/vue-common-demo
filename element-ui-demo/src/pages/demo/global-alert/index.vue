<template>
  <page-layout>
    <div>
      <el-button type="success" @click="showAlert('success')">全局通知-成功</el-button>
      <el-button type="success" @click="showAlert('success-more')">全局通知-成功-附加信息</el-button>
      <el-button type="info" @click="showAlert('info')">全局通知-信息</el-button>
      <el-button type="warning" @click="showAlert('warning')">全局通知-信息</el-button>
      <el-button type="danger" @click="showAlert('danger')">全局通知-信息</el-button>
      <el-button type="primary" @click="closeAlert">全局通知-关闭</el-button>
    </div>
  </page-layout>
</template>

<script>
export default {
  name: 'GlobalAlertPage',
  methods: {
    showAlert (type) {
      let obj = {
        type: 'info',
        closable: true,
        closeText: '关闭',
        showIcon: true,
        title: '',
        content: ''
      }
      switch (type) {
        case 'success':
          obj.type = 'success'
          obj.title = '这是成功的全局提示'
          break
        case 'success-more':
          obj.type = 'success'
          obj.title = '这是成功的全局提示'
          obj.content = '这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰挥发化为灰……'
          break
        case 'info':
          obj.type = 'info'
          obj.title = '这是消息的全局提示'
          break
        case 'warning':
          obj.type = 'warning'
          obj.title = '这是警告的全局提示'
          break
        case 'danger':
          obj.type = 'error'
          obj.title = '这是错误的全局提示'
          break
      }
      this.$store.dispatch('app/AppGlobalAlertShow', obj)
    },
    closeAlert () {
      this.$store.dispatch('app/AppGlobalAlertClose')
    }
  }
}
</script>
