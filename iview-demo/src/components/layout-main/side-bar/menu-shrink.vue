<template>
  <div class="menu-shrink">
    <template v-for="(category, category_index) in menus">
      <!-- 没有子菜单 -->
      <div class="menu-shrink-item"
           :class="{active: category.target.url === activeName}"
           :key="category_index"
           v-if="(!category.menus || (category.menus.length === 0 && category.target && category.target.url))">
        <Icon :type="category.icon"
              :size="16"></Icon>
      </div>
      <!-- 有子菜单 -->
      <!--

                    trigger="custom"
                    visible
           -->
      <Dropdown placement="right-start"
                :key="category_index"
                transfer-class-name="menu-shrink-dropdown"
                :stop-propagation="true"
                v-if="!(!category.menus || (category.menus.length === 0 && category.target && category.target.url))">
        <div class="menu-shrink-item">
          <Icon :size="16"
                :type="category.icon"></Icon>
        </div>
        <!-- 子菜单 -->
        <DropdownMenu style="width: 200px;"
                      slot="list">
          <DropdownItem :key="menu_index"
                        v-for="(item, menu_index) in category.menus"
                        :class="{active: item.target && item.target.url === activeName}">
            <!-- 只有一个子菜单 -->
            <div class="menu-shrink-dropdown-item-content"
                 v-if="(!item.menus || (item.menus.length === 0 && item.target && item.target.url))">
              <Icon :type="item.icon"
                    :size="16"></Icon>
              <span style="padding-left:10px;">{{ item.name }}</span>
            </div>
            <!-- 有子菜单 -->
            <SubMenuShrink :menus="item"
                           :activeName="activeName"
                           v-if="!(!item.menus || (item.menus.length === 0 && item.target && item.target.url))" />
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </template>
  </div>
</template>

<script>
import SubMenuShrink from './sub-menu-shrink'
export default {
  name: 'MenuShrink',
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
  components: {
    SubMenuShrink
  }
}
</script>

<style lang="less" scoped>
.layout-text {
  vertical-align: middle;
  display: inline-block;
}

.menu-shrink {
  // 覆盖
  .ivu-dropdown {
    display: block;
  }
  width: 100%;
  &-item {
    margin: 0 auto;
    height: 52px;
    width: 80px;
    padding: 16px 24px;
    line-height: 20px !important;
    text-align: center;
    cursor: pointer;
    z-index: 1;
    color: @menu-shrink-item-title-color;
    line-height: 24px;
    &.active {
      background: @menu-shrink-item-active-bg-color;
    }
  }
  &-dropdown-item-content {
    height: 24px;
    line-height: 24px;
  }
}
</style>

<style lang="less">
.menu-shrink-dropdown {
  background-color: @menu-bg-color !important;
  margin-left: 5px !important;
  .ivu-dropdown-item {
    color: @menu-shrink-item-title-color;
    &:hover {
      color: @menu-shrink-item-title-hover-color;
      background: transparent;
    }
    &.active {
      color: #fff;
      background: #2d8cf0 !important;
    }
  }
}
</style>
