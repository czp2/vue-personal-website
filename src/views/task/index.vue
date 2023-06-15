<template>
  <div class="theme-container">
    <el-calendar v-model="value" />
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      value: new Date()
    }
  }
}
</script>

<style lang="scss" scoped></style>
