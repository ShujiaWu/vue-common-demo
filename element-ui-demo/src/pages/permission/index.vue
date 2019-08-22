<template>
  <page-layout>
    <div>当前权限： {{$store.state.user.permission}}</div>
    <div style="margin-top: 10px;">
      <el-button type="primary" @click="changePermission(1)">权限1</el-button>
      <el-button type="primary" @click="changePermission(2)">权限2</el-button>
    </div>
    <div style="margin-top: 10px;">
      <el-button type="primary" @click="changePermissionPage('/about')">进入权限1页面</el-button>
      <el-button type="primary" @click="changePermissionPage('/home')">进入权限2页面</el-button>
    </div>
  </page-layout>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    changePermission (value) {
      this.$store.dispatch('user/ChangeUserPermission', value)
    },
    changePermissionPage (name) {
      this.$router.push(name)
    }
  }
}
</script>
