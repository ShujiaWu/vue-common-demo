<template>
  <div class="layout-app">
    <router-view />
    <BackTop :height="100"></BackTop>
  </div>
</template>

<script>
export default {
  name: 'LayoutApp',
  mounted () {},
  data () {
    return {}
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        // 更新sidebar菜单
        if (val.meta && val.meta.level && val.meta.level.length) {
          this.$store.dispatch('app/UpdateSideBarMenus', val.meta.level[0])
        }
      },
      deep: true
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.layout-app {
  height: 100%;
}
</style>
