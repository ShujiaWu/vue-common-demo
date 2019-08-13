<template>
  <div id="app">
    <router-view/>
    <el-tooltip placement="top" content="返回顶部">
      <BackToTop/>
    </el-tooltip>
  </div>
</template>

<script>
import BackToTop from '@vue-common/components/common/back-to-top'
export default {
  components: {
    BackToTop
  },
  name: 'app',
  mounted () {
  },
  data () {
    return {
    }
  },
  methods: {

  }
}
</script>
