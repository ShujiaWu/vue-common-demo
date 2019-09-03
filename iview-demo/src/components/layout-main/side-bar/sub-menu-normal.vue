<template>
  <!-- 没有子菜单 -->
  <Menu-item :name="menus.target.url"
             v-if="(!menus.menus || (menus.menus.length === 0 && menus.target && menus.target.url))">
    <!-- icon -->
    <Icon :type="menus.icon"
          :size="16"></Icon>
    <!-- 名称 -->
    <span class="layout-text">{{menus.name}}</span>
  </Menu-item>
  <!-- 有子菜单 -->
  <Submenu :name="menus.name"
           v-else-if="!(!menus.menus || (menus.menus.length === 0 && menus.target && menus.target.url))">
    <!-- 分组名称 -->
    <template slot="title">
      <!-- icon -->
      <Icon :type="menus.icon"
            :size="16"></Icon>
      <!-- 名称 -->
      <span class="layout-text">{{menus.name}}</span>
    </template>
    <!-- 菜单内容 -->
    <template v-for="(menu, index) in menus.menus">
      <SubMenuNormal :menus="menu"
                     :key="index" />
    </template>
  </Submenu>
</template>

<script>
export default {
  name: 'SubMenuNormal',
  props: {
    menus: {
      type: [Object, Array],
      default: () => []
    }
  }
}
</script>

<style lang="less" scoped>
</style>

<style lang="less">
</style>
