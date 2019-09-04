<template>
  <page-layout full-page>
    <div>DemoAbout</div>

  </page-layout>
  <!-- <div class="about">
  </div> -->
</template>

<script>
export default {
  methods: {
    goto () {
      this.$router.push({
        name: 'DemoAbout'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.about {
  background: #fff;
  height: 100%;
}
</style>
