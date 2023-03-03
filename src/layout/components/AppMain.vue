<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*56 = navbar  */
  min-height: calc(100vh - 56px);
  width: 80%;
  margin: 0 auto;
  padding-top: 50px;
  padding-bottom: 50px;
  position: relative;
  overflow: hidden;
}
/* .fixed-header + .app-main {
  padding-top: 56px;
} */
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
