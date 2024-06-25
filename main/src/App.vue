<template>
  <div class="main-app">
    <div>
      <HeaderTop />
      <div class="el-container">
        <el-aside id="main-elaside" v-if="!$route.path.includes('/home')">
          <LeftMenu ref="leftmenu" />
        </el-aside>
        <div class="mainmenuright" id="main-menuright">
          <div class="menucache">
            <CacheMenu @clearCache="clearCacheMenu" />
          </div>
          <el-scrollbar ref="mainScrollBar">
            <div id="vue3app" ref="vue3app" v-show="isVue3"></div>
            <External v-show="!isVue3" />
          </el-scrollbar>
        </div>
      </div>
    </div>
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue'
import { loadMicroApp } from 'qiankun'
import { fetchOptions } from '@/config/microApps'
import Homepage from '@/views/HomeView.vue'
import External from '@/layout/externalApp.vue'
import HeaderTop from '@/layout/head.vue'
import LeftMenu from '@/layout/menuLeft.vue'
import CacheMenu from '@/layout/cacheMenu.vue'

export default {
  name: 'main-app',
  data() {
    return {
      isVue3: window.location.href.includes('vue3'),
      microApp: null,
      isVue3Load: false
    }
  },
  components: {
    External,
    HeaderTop,
    LeftMenu,
    Homepage,
    CacheMenu
  },
  computed: {},
  created() {},
  mounted() {
    // this.$globalState.onGlobalStateChange((state) => {
    //   // state: 变更后的状态; prev 变更前的状态
    //   if (state.witchChange === 'menuToggle') {
    //     // bus.emit('changeMenuToggle', state.menuToggle)
    //   } else if (state.witchChange === 'moreTabs') {
    //     // 新客服 多用户多tab缓存标签
    //     // bus.emit('dealMoreTabs', state.cacheTabInfo)
    //   }
    // })
  },
  methods: {
    loadvue3app() {
      if (!this.isVue3Load) {
        this.microApp = loadMicroApp(
          {
            name: 'vue3',
            container: this.$refs.vue3app,
            entry: process.env.VUE_APP_ENTRY1,
            props: {},
            activeRule: '/vue3'
          },
          fetchOptions
        )
        this.isVue3Load = true
      }
    }
  },
  watch: {
    '$route.path': function (newVal) {
      this.isVue3 = false
      if (newVal) {
        // this.$nextTick(() => {
        //   if (this.$refs.leftmenu) {
        //     this.$refs.leftmenu.menuToggle = false
        //     this.$refs.leftmenu.changeMenuToggle(false)
        //   }
        // })
        if (newVal.includes('vue3')) {
          this.isVue3 = true
          this.loadvue3app()
        }
      }
    }
  },
  setup() {
    // 获取全局属性
    const f = getCurrentInstance().root.appContext.config.globalProperties
    // 清楚缓存
    // eslint-disable-next-line no-unused-vars
    function clearCacheMenu(arr) {
      f.$globalState.setGlobalState({
        witchChange: 'clearCache',
        cache_menu: arr
      })
    }
    return { clearCacheMenu }
  }
}
</script>
<style lang="scss" scoped>
.main-app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .el-head {
    width: 100%;
    height: 80px;
  }
  #vue3app {
    width: 100%;
    height: 100%;
  }
  .el-container {
    width: 100%;
    height: calc(100% - 82px);
    padding: 10px;
    box-sizing: border-box;
    background: #f9fafc;
    .el-aside {
      width: 208px !important;
      margin-right: 10px;
      margin-bottom: 10px;
      height: 100%;
      transition: width 0.3s;
    }
    .menuToggle-aside {
      width: 60px !important;
    }
    .menuToggle-right {
      width: calc(100% - 70px) !important;
    }
    .mainmenuright {
      width: calc(100% - 218px);
      height: 100%;
      background: #fff;
      transition: width 0.3s;
      position: relative;
      .menucache {
        position: absolute;
        z-index: 100;
        left: 0;
        min-height: 50px;
        line-height: 45px;
        padding: 0;
        background: transparent;
        width: 100%;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
.el-menu--horizontal > .el-menu-item {
  float: left;
  height: 60px !important;
  line-height: 60px !important;
  margin: 0;
  border-bottom: 2px solid transparent;
  color: #909399;
}

::v-deep .el-menu--horizontal {
  display: flex;
  white-space: nowrap;
}
.submenuright {
  width: 100%;
}
.submenuright,
.mainmenuright {
  .el-scrollbar {
    width: 100%;
    height: 100%;
    ::v-deep .el-scrollbar__bar {
      z-index: 10000;
    }
    ::v-deep .el-scrollbar__wrap {
      min-height: 100%;
      white-space: nowrap;
      .el-scrollbar__view {
        height: 100%;
        width: 100%;
        filter: progid:DXImageTransform.Microsoft.gradient(
          startColorstr='#303af0',endColorstr='#4260f7');
        background-repeat: no-repeat;
        background-size: 100% 275px;
        background-attachment: scroll;
        background-color: #fff;
      }
    }
  }
}
</style>
