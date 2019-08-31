<template>
  <page-layout>
    <h1>页面缓存测试</h1>
    <p>如果页面不需要缓存，请配置meta.noCached</p>
    <p>需要缓存的页面一定要配置页面的name,路由也要配置,而且两者要保持一致</p>
  </page-layout>
</template>

<script>
export default {
  name: 'CachedPage',
  beforeRouteEnter (to, from, next) {
    console.log('--------PageBeforeRouteEnter---------')
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('--------PageBeforeRouteLeave---------')
    next()
  },
  beforeEnter: (to, from, next) => {
    console.log('--------PageBeforeEnter---------')
    next()
  },
  beforeUpdate () {
    console.log('--------PageBeforeUpdate---------')
  },
  beforeCreate () {
    console.log('--------PageBeforeCreate---------')
  },
  created () {
    console.log('--------PageCreated---------')
  },
  beforeMount () {
    console.log('--------PagebeBoreMount---------')
  },
  mounted () {
    console.log('--------PageMounted---------')
  },
  beforeDestroy () {
    console.log('--------PageBeforeDestroy---------')
  },
  destroyed () {
    console.log('--------PageDestroyed---------')
  },
  deactivated () {
    console.log('--------PageDeactivated---------')
  },
  activated () {
    console.log('--------PageActivated---------')
  }
}
</script>
