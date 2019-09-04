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
      <div class="content-box">
        <!-- <div class="opened-page-tag">打开的页面</div> -->
        <div class="page-main">
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
  &.has-main-menu {
    .content-main {
      padding-left: 256px;
      flex: 1;
      transition: all @animation-time linear;
      z-index: 11;
    }
  }
  &.shrink {
    &.has-main-menu {
      .content-main {
        padding-left: 80px;
      }
    }
  }

  .content-main {
    .content-box {
      padding-top: 64px;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .page-main {
      flex: 1;
    }
  }
}
</style>
