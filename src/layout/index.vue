<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>

    <!--当 menuInLeft===true，左菜单栏显示,顶部隐藏-->
    <sidebar v-if="menuInLeft" class="sidebar-container" />

    <!--当左菜单栏显示时，需配置main-container 样式，改样式位置在src/styles/sidebar.scss文件中-->
    <div :class="{ hasTagsView: needTagsView, 'main-container': menuInLeft }">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />

        <!--当 menuInLeft===false，左菜单栏隐藏，顶部显示-->
        <!-- <headbar v-if="!menuInLeft" /> -->
      </div>

      <app-main />
    </div>
  </div>
</template>

<script>
// 引入Sidebar
// import { AppMain, Navbar, Headbar, Sidebar } from './components'
import { AppMain, Navbar, Sidebar } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Sidebar
    // Headbar
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
      device: (state) => state.app.device,
      needTagsView: (state) => state.settings.tagsView,
      fixedHeader: (state) => state.settings.fixedHeader,
      // 获取menuInLeft值
      menuInLeft: (state) => state.settings.menuInLeft
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>
