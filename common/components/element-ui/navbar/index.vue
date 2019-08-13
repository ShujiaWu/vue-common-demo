<template>
  <div class="navbar">
    <Hamburger :collapse="sidebar.collapse" class="hamburger-container" @toggleClick="toggleSideBar" />
    <Breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="right-menu-item hover-effect" trigger="click">
        <div class="text-primary">
          <span>{{$store.state.user.nickName}}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              用户管理
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Hamburger from '@vue-common/components/common/hamburger'
import Breadcrumb from '@vue-common/components/element-ui/breadcrumb'
import { logout as LogoutService } from '../../../services/user'
export default {
  name: 'NavBar',
  components: {
    Hamburger,
    Breadcrumb
  },
  data () {
    return {
      sidebar: {
        collapse: false
      }
    }
  },
  methods: {
    toggleSideBar () {
      this.sidebar.collapse = !this.sidebar.collapse
      this.$store.dispatch('AppSideBarCollapseStatusChange', this.sidebar.collapse)
    },
    logout () {
      LogoutService().then(result => {
        if (result.isSuccess) {
          this.$message({
            message: '退出成功',
            type: 'success'
          })
          this.$router.push('/login')
          this.$store.dispatch('UserLogout')
        } else {
          this.$message({
            message: `退出失败，${result.message}`,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
}
.hamburger-container {
  line-height: 46px;
  height: 100%;
  float: left;
  cursor: pointer;
  transition: background .3s;
  -webkit-tap-highlight-color:transparent;

  &:hover {
    background: rgba(0, 0, 0, .025)
  }
}
.right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 12px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }
  }
</style>
