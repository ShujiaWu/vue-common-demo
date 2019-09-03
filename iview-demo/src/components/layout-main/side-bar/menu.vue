<template>
  <div :class="{shrink: shrink}">
    <!-- 正常模式 -->
    <MenuNormal :menus="menus"
                :activeName="activeName"
                v-if="!shrink" />
    <!-- 缩小模式 -->
    <MenuShrink :menus="menus"
                :activeName="activeName"
                @click="itemClick"
                v-else />
  </div>
</template>

<script>
import MenuNormal from './menu-normal'
import MenuShrink from './menu-shrink'
export default {
  name: 'Menu',
  components: {
    MenuShrink,
    MenuNormal
  },
  props: {
    shrink: {
      type: Boolean,
      default: false
    },
    menus: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      activeName: 'URL-2-2-1'
    }
  },
  methods: {
    itemClick (item) {
      this.activeName = item.path || item.url
    }
  }
}
</script>

<style lang="less" scoped>
</style>
