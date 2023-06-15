<template>
  <el-collapse v-model="activeNames" @change="handleChange">
    <div :key="index" class="nav-sites-nav-container">
      <template v-for="(collapse, index) in collapseList">
        <template v-if="collapse.type == 'site'">
          <div :key="index" class="nav-sites-item-col">
            <a :href="collapse.href" target="_blank" rel="noopener noreferrer">
              <div class="nav-sites-img">
                <img :src="collapse.icon" />
              </div>
              <div class="nav-sites-name">
                <el-tooltip class="item" effect="dark" :content="collapse.name" placement="top">
                  <div class="site-name">
                    {{ collapse.name }}
                  </div>
                </el-tooltip>
              </div>
            </a>
            <div class="nav-sites-more-action-hidden"></div>
          </div>
        </template>
        <el-collapse-item v-else :key="index" :title="collapse.name" :name="index" class="collapse-item">
          <CollapseItem :collapse-list="collapse.children" />
        </el-collapse-item>
      </template>
    </div>
  </el-collapse>
</template>

<script>
export default {
  name: 'CollapseItem',
  props: {
    collapseList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    activeNames() {
      return this.collapseList.filter((item) => item.active).map((item) => item.name)
    }
  },
  methods: {
    handleChange() {}
  }
}
</script>

<style lang="scss" scoped>
.nav-sites-nav-container {
  display: flex;
  flex-wrap: wrap;
  // display: grid;
  // grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  // gap: 16px 16px;

  ::v-deep .el-collapse-item.collapse-item {
    width: 100%;
    margin-left: 20px;
  }

  .nav-sites-item-col {
    &:hover {
      transition: all 0.4s;
      border-color: #4e6ef2;

      & > a {
        transition: all 0.4s;
        color: #7487f2;
      }
    }

    user-select: none;
    max-width: 100px;
    margin: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px;
    border-radius: 16px;
    color: #161e2e;
    background-color: #f5f5f5;
    box-shadow: 4px 4px 8px 0px rgba(1, 1, 2, 0.13);
    border: 1px solid transparent;
    cursor: pointer;

    a {
      &:hover {
        text-decoration: none;
        outline: 0;
      }

      display: flex;
      align-items: center;
      color: inherit;
      text-decoration: none !important;

      .nav-sites-img {
        width: 32px;
        height: 32px;
        border-radius: 32px;
        border: 1px solid #eee;
        background-color: #fff;

        img {
          width: 100%;
          height: 100%;
          border-radius: 100%;
          -o-object-fit: cover;
          object-fit: cover;
        }
      }

      .nav-sites-name {
        margin-left: 8px;
        width: 55px;

        .site-name {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          width: 100%;
        }
      }
    }
  }
}
</style>
