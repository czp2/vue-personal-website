<template>
  <div class="navbar">
    <!-- <hamburger
      v-if="menuInLeft"
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    /> -->
    <div class="nav-left">
      <!-- <breadcrumb class="breadcrumb-container" /> -->
      <div class="weather">
        <div id="he-plugin-simple"></div>
      </div>
    </div>
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> Home </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div class="menu-box">
      <headbar v-if="!menuInLeft" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Headbar from '@/layout/components/Headbar'
// import Breadcrumb from '@/components/Breadcrumb'
// import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Headbar
    // Breadcrumb,
    // Hamburger
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar']),
    ...mapState({
      menuInLeft: (state) => state.settings.menuInLeft
    })
  },
  created() {
    this.loadJs('https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0')
    window.WIDGET = {
      CONFIG: {
        modules: '01234',
        background: '1',
        tmpColor: 'FFFFFF',
        tmpSize: '16',
        cityColor: 'FFFFFF',
        citySize: '16',
        aqiColor: 'FFFFFF',
        aqiSize: '16',
        weatherIconSize: '24',
        alertIconSize: '18',
        padding: '10px 10px 10px 10px',
        shadow: '0',
        language: 'auto',
        borderRadius: '10',
        fixed: 'false',
        vertical: 'top',
        horizontal: 'left',
        key: 'f4318ad5295a401ba00b73b8e1efcc5d'
      }
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 56px;
  // overflow: hidden;
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  justify-content: center;
  .nav-left {
    position: absolute;
    width: 270px;
    top: 6px;
    left: 10px;
    z-index: 99999;
    .weather {
      z-index: 99999;
    }
  }
  .menu-box {
    // width: 50%;
    margin: 0 auto;
  }
  // .hamburger-container {
  //   line-height: 46px;
  //   height: 100%;
  //   float: left;
  //   cursor: pointer;
  //   transition: background 0.3s;
  //   -webkit-tap-highlight-color: transparent;

  //   &:hover {
  //     background: rgba(0, 0, 0, 0.025);
  //   }
  // }

  // .breadcrumb-container {
  //   float: left;
  // }

  .right-menu {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 8px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
