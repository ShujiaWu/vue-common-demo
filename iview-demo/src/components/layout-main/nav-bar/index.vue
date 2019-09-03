<template>
  <div class="nav-bar">
    <div class="menu-mode-btn">
      <div class="btn"
           :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}"
           @click="changeMenuMode">
        <Icon type="ios-menu-outline"
              size="32"></Icon>
      </div>
    </div>
    <div class="menu">
      <Menu mode="horizontal"
            active-name="1">
        <MenuItem name="1">
        <Icon type="ios-paper" />
        内容管理
        </MenuItem>
        <MenuItem name="2">
        <Icon type="ios-people" />
        用户管理
        </MenuItem>
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-stats" />
            统计分析
          </template>
          <MenuGroup title="使用">
            <MenuItem name="3-1">新增和启动</MenuItem>
            <MenuItem name="3-2">活跃分析</MenuItem>
            <MenuItem name="3-3">时段分析</MenuItem>
          </MenuGroup>
          <MenuGroup title="留存">
            <MenuItem name="3-4">用户留存</MenuItem>
            <MenuItem name="3-5">流失用户</MenuItem>
          </MenuGroup>
        </Submenu>
        <MenuItem name="4">
        <Icon type="ios-construct" />
        综合设置
        </MenuItem>
      </Menu>
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
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  transition: all 0.2s ease-in-out;
  display: flex;
  .menu-mode-btn {
    .btn {
      cursor: pointer;
      padding: 0 20px;
      &:hover {
        color: @primary-color;
      }
    }
  }
  .menu {
    flex: 1;
    padding-top: 4px;
    .ivu-menu-horizontal.ivu-menu-light:after {
      display: none;
    }
  }
}
</style>
