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
  methods: {}
}
</script>
<style lang="less" scoped>
.layout-app {
  height: 100%;
}
</style>
