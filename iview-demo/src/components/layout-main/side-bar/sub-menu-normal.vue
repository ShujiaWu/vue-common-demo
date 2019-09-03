<template>
  <!-- 没有子菜单 -->
  <Menu-item :name="menus.path || menus.url"
             v-if="!menus.children">
    <!-- icon -->
    <Icon :type="menus.icon"
          :size="16"></Icon>
    <!-- 名称 -->
    <span class="layout-text">{{menus.title}}</span>
  </Menu-item>
  <!-- 有子菜单 -->
  <Submenu :name="menus.name"
           v-else>
    <!-- 分组名称 -->
    <template slot="title">
      <!-- icon -->
      <Icon :type="menus.icon"
            :size="16"></Icon>
      <!-- 名称 -->
      <span class="layout-text">{{menus.title}}</span>
    </template>
    <!-- 菜单内容 -->
    <template v-for="(menu, index) in menus.children">
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
