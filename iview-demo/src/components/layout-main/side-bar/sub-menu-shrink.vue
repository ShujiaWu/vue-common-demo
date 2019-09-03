<template>
  <Dropdown placement="right-start"
            transfer-class-name="sub-menu-shrink-dropdown"
            :stop-propagation="true">
    <div class="menu-item">
      <Icon :size="16"
            :type="menus.icon"></Icon>
      <span style="padding-left:10px;">{{ menus.name }}</span>
    </div>
    <!-- 子菜单 -->
    <DropdownMenu style="width: 200px;"
                  slot="list">
      <DropdownItem v-for="(item, menu_index) in menus.menus"
                    class="single-item"
                    :class="{active: item.target.url === activeName}"
                    :key="menu_index">
        <div class="menu-shrink-dropdown-item">
          <Icon :type="item.icon"
                :size="16"></Icon>
          <span style="padding-left:10px;">{{ item.name }}</span>
        </div>
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
export default {
  name: 'SubMenuShrink',
  props: {
    activeName: {
      type: String,
      default: undefined
    },
    menus: {
      type: [Array, Object],
      default: () => []
    }
  }
}
</script>

<style lang="less" scoped>
.menu-item {
  font-size: 12px;
  line-height: 24px;
}
</style>

<style lang="less">
.sub-menu-shrink-dropdown {
  background-color: @menu-bg-color !important;
  margin-left: 20px !important;
  .ivu-dropdown-item {
    color: @menu-shrink-item-title-color;
    &:hover {
      color: @menu-shrink-item-title-hover-color;
      background: transparent;
    }
    .active {
      background: @menu-shrink-item-active-bg-color;
    }
  }
}
</style>
