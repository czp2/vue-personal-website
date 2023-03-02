<template>
  <div class="theme-container">
    <div class="site-nav">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>站点导航</span>
          <el-button style="float: right; padding: 3px 0" type="text">导入书签</el-button>
        </div>
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item v-for="collapse in collapseList" :key="collapse.name" :title="collapse.title" :name="collapse.name">
            <div>
              <ul class="nav-sites-nav-container">
                <li v-for="site in collapse.siteList" :key="site.id" class="nav-sites-item-col">
                  <a :href="site.url" target="_blank" rel="noopener noreferrer">
                    <div class="nav-sites-img">
                      <img :src="site.image" />
                    </div>
                    <div class="nav-sites-name">
                      <el-tooltip v-tooltip class="item" effect="dark" :content="site.name" placement="top">
                        <div class="site-name">
                          {{ site.name }}
                        </div>
                      </el-tooltip>
                    </div>
                  </a>
                  <div class="nav-sites-more-action-hidden"></div>
                </li>
              </ul>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapseList: [
        {
          title: '常用站点',
          name: '1',
          active: true,
          siteList: [
            {
              id: 2836,
              name: 'GitHub',
              url: 'https://github.com/',
              image: 'https://kaifa.baidu.com/images/github.png',
              type: 1
            },
            {
              id: 2837,
              name: 'StackOverflow',
              url: 'https://stackoverflow.com/',
              image: 'https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico',
              type: 1
            },
            {
              id: 2841,
              name: 'bilibili',
              url: 'https://www.bilibili.com',
              image: 'https://www.bilibili.com/favicon.ico?v=1',
              type: 1
            }
          ]
        },
        {
          title: '开发',
          name: '2',
          active: false,
          siteList: [
            {
              id: 2843,
              name: 'MDN',
              url: 'https://developer.mozilla.org/zh-CN/',
              image: 'https://developer.mozilla.org/favicon-48x48.cbbd161b.png',
              type: 2
            },
            {
              id: 2850,
              name: '博客园',
              url: 'https://www.cnblogs.com/BeatOnDreamOn/',
              image: 'https://common.cnblogs.com/favicon.svg',
              type: 2
            },
            {
              id: 2897,
              name: '掘金',
              url: 'https://juejin.cn',
              image: 'https://juejin.cn/favicon.ico',
              type: 2
            },
            {
              id: 2898,
              name: 'ES6',
              url: 'https://es6.ruanyifeng.com/#README',
              image: 'https://es6.ruanyifeng.com/favicon.ico',
              type: 2
            }
          ]
        }
      ]
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
.site-nav {
  .nav-sites-nav-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    gap: 16px 16px;

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
}
</style>
