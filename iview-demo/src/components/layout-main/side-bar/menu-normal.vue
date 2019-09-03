<template>
  <i-menu :open-names="openNames"
          :active-name="activeName"
          v-if="menus.length"
          width="256px"
          :accordion="true"
          theme="dark">
    <SubMenuNormal v-for="(menu, index) in menus"
                   :key="index"
                   :menus="menu" />
  </i-menu>
</template>

<script>
import SubMenuNormal from './sub-menu-normal'
export default {
  name: 'MenuNormal',
  components: {
    SubMenuNormal
  },
  props: {
    menus: {
      type: [Array, Object],
      default: () => []
    },
    activeName: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      openNames: []
    }
  }
}
</script>

<style lang="less" scoped>
// 覆盖菜单样式
.ivu-menu-item {
  height: 52px;
  padding: 16px 24px;
  font-size: 14px;
  line-height: 20px;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu),
.ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-submenu-title-active:not(.ivu-menu-submenu) {
  color: rgba(255, 255, 255, 0.7);
  background: #2d8cf0 !important;
}
.layout-text {
  vertical-align: middle;
  display: inline-block;
}
</style>
