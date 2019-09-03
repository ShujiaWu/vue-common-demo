<template>
  <div class="nav-bar">
    <div class="menu-mode-btn">
      <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}"
              type="text"
              @click="changeMenuMode"
              style="background:transparent;box-shadow:none;">
        <Icon type="ios-menu-outline"
              size="32"></Icon>
      </Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    shrink: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    changeMenuMode () {
      this.$emit('modeChange', !this.shrink)
    }
  }
}
</script>

<style lang="less" scoped>
.nav-bar {
  height: 64px;
  line-height: 64px;
}
</style>
