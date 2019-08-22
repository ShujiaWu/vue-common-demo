<template>
  <div class="layout"
       :class="{'sidebar-collapse': $store.state.app.sidebar.collapse}">
    <!-- 左菜单 -->
    <SideBar />
    <!-- 主页面 -->
    <div class="layout-container">
      <div id="header" :class="{'fixed-header': fixedHeader}">
        <NavBar />
        <PageOpenedTags/>
        <GlobalAlert v-if="showGlobalAlert" />
      </div>
      <transition name="fade-transform"
                  mode="out-in">
        <keep-alive :include="$store.state.app.cachedPage">
          <router-view class="router-view" :style="{paddingTop: contentPaddingTop}"></router-view>
        </keep-alive>
        <!-- <router-view class="router-view" :style="{paddingTop: contentPaddingTop}"></router-view> -->
      </transition>
    </div>
    <!-- <div class="footer">
      <div>{{copyright}}</div>
    </div> -->
  </div>
</template>

<script>
import SideBar from '@vue-common/components/element-ui/sidebar'
import NavBar from '@/components/navbar'
import GlobalAlert from '@vue-common/components/element-ui/global-alert'
import PageOpenedTags from '@vue-common/components/element-ui/page-opened-tags'
export default {
  components: {
    SideBar,
    NavBar,
    GlobalAlert,
    PageOpenedTags
  },
  mounted () {
    this.$store.dispatch('window/WindowResize')
  },
  computed: {
    fixedHeader () {
      return this.$store.state.app.header.fixed
    },
    contentPaddingTop () {
      return this.$store.state.window.header.height + 'px'
    },
    showGlobalAlert () {
      return this.$store.state.app.globalAlert.show
    },
    globalAlertBig () {
      return (
        this.$store.state.app.globalAlert.show &&
        !!this.$store.state.app.globalAlert.title &&
        !!this.$store.state.app.globalAlert.content
      )
    },
    globalAlertSmall () {
      return (
        this.$store.state.app.globalAlert.show &&
        (!!this.$store.state.app.globalAlert.title ^
          !!this.$store.state.app.globalAlert.content)
      )
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import "../../../vue-common/assets/styles/element-ui/variables/variables.scss";
.layout {
  position: relative;
  height: 100%;
  width: 100%;
  padding-left: $sideBarWidth;
  transition: padding-left 0.28s;
  &.sidebar-collapse {
    padding-left: 64px;
  }
  .layout-container {
    height: 100%;
  }
  .router-view {
    height: 100%;
  }
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
  transform: translateZ(0); // 修复抖动
}
.sidebar-collapse {
  .fixed-header {
    width: calc(100% - 64px);
  }
}
// 只有Header
.fixed-header + .router-view {
  padding-top: 60px;
  transition: all 0.28s;
}
.fixed-header + .router-view:not(.page) {
  padding-top: 50px;
}
// Header + GlobalAlert
.fixed-header.global-alert-small + .router-view {
  // 50 + 42
  padding-top: 92px;
}
.fixed-header.global-alert-small + .router-view:not(.page) {
  padding-top: 50px;
}
.fixed-header.global-alert-big + .router-view {
  // 50 + 62
  padding-top: 112px;
}
.fixed-header.global-alert-big + .router-view:not(.page) {
  padding-top: 112px;
}

</style>
