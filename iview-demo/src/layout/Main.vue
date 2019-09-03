<template>
  <div class="layout-main has-main-menu"
       :class="{shrink: shrink}">
    <!-- 左侧菜单 -->
    <SideBar :shrink="shrink" />
    <!-- 右侧内容 -->
    <div class="content-main">
      <!-- 顶部菜单 -->
      <NavBar :shrink="shrink"
              @modeChange="modeChange" />
      <!-- 核心内容 -->
      <div>
        <div>打开的页面</div>
        <div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/layout-main/side-bar'
import NavBar from '@/components/layout-main/nav-bar'
export default {
  name: 'MainLayout',
  components: {
    SideBar,
    NavBar
  },
  data () {
    return {
      shrink: false
    }
  },
  methods: {
    modeChange (mode) {
      console.log(mode)
      this.shrink = mode
    }
  }
}
</script>

<style lang="less" scoped>
.layout-main {
  display: flex;
  height: 100%;
  transition: all 0.3s linear;
  &.has-main-menu {
    .content-main {
      padding-left: 256px;
    }
  }
  &.shrink {
    &.has-main-menu {
      .content-main {
        padding-left: 80px;
      }
    }
  }
}
</style>
