<template>
  <div class="menubox">
    <el-menu
      :default-active="defaultIndex"
      class="el-menu-container"
      :collapse="menuToggle"
      @select="changeRoute"
      :unique-opened="true"
      v-if="showMenuChange"
    >
      <!-- 其他系统菜单处理 -->
      <div v-for="(menu, index) in menuList" :key="index">
        <el-menu-item :index="menu.path" :key="index + 'e22f'">
          <el-icon><component v-bind:is="menu.icon"></component></el-icon>
          <template #title>{{ menu.text }}</template>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
import menuTestDataList from './menulistData.js'

export default {
  name: 'leftMenu',
  data() {
    return {
      defaultIndex: '',
      menuToggle: false,
      showMenuChange: true, // 一级路由跳转时左侧菜单刷新
      menuList: menuTestDataList.vue3
    }
  },
  computed: {},
  mounted() {
    // 接收子应用发送的指令
    // bus.on('changeMenuToggle', (res) => {
    //   this.menuToggle = res
    //   this.changeMenuToggle(res)
    // })
    // bus.on('dealMoreTabs', (res) => {
    //   if (this.$route.fullPath.includes('/externalservice#/home')) {
    //     this.dealMoreTabs(res)
    //   }
    // })

    // 获取 chatbot 当前租户菜单权限
    const storageTenantItem = JSON.parse(localStorage.getItem('storageTenantItem'))
    this.permsList = (storageTenantItem && storageTenantItem.permsList) || {}
  },
  unmounted() {
    // bus.off('changeMenuToggle');
    // bus.off('dealMoreTabs');
  },
  methods: {
    // 菜单无权限进行跳转
    changeRouteByPermission(menuConfig) {
      let curRoute = ''
      for (let i = 0; i < menuConfig.length; i++) {
        if (menuConfig[i].isShow) {
          curRoute = menuConfig[i].path
          break
        }
      }
      for (let j = 0; j < menuConfig.length; j++) {
        if (!menuConfig[j].isShow && this.$route.fullPath.includes(menuConfig[j].path)) {
          window.history.pushState({}, '', curRoute)
          break
        }
      }
    },
    // 点击菜单事件
    changeRoute(e) {
      this.dealCacheMenu(e)
      window.history.pushState({}, '', e)
    },
    // 控制菜单收缩伸展
    changeMenuToggle(toggle) {
      if (toggle) {
        document.getElementById('main-elaside').classList.add('menuToggle-aside')
        document.getElementById('main-menuright').classList.add('menuToggle-right')
      } else {
        document.getElementById('main-elaside').classList.remove('menuToggle-aside')
        document.getElementById('main-menuright').classList.remove('menuToggle-right')
      }
    },
    // 添加需缓存的菜单
    dealCacheMenu(fullPath) {
      const f = this
      // const cacheMenu = f.CACHE_MENU;
      const obj = {}
      const { menuList } = f
      // console.log(cacheMenu, menuList);
      // this.menuList.forEach((e) => {
      //   if (e.isKeepAlive && fullPath.includes(e.path) && !e.subMenu) {
      //     obj.path = e.path;
      //     obj.text = e.text;
      //   } else if (e.subMenu && e.subMenu.length > 0) {
      //     e.subMenu.forEach((e1) => {
      //       if (e1.isKeepAlive && fullPath.includes(e1.path)) {
      //         obj.path = e1.path;
      //         obj.text = e1.text;
      //       }
      //     });
      //   }
      // });
      // if (obj.path && !cacheMenu.some((item) => item.path === obj.path)) {
      //   cacheMenu.push(obj);
      //   bus.emit('changeMenuCache', obj.name);
      // }
      // f.$store.commit('SET_CACHE_MENU', cacheMenu);
    },
    // 单独处理新客服-用户信息  客服一对多tab 由子应用发送过来处理
    dealMoreTabs(res) {
      // const f = this
      // const cacheMenu = f.CACHE_MENU
      // const temp = []
      // let obj = {}
      // const documentTitle = res.title && res.title !== '用户信息' ? `(${res.title})` : ''
    }
  },
  watch: {
    '$route.path': function (newVal) {
      if (newVal) {
        const f = this
        f.showMenuChange = false
        f.menuList.forEach((e) => {
          if (f.$route.fullPath.includes(e.path) && !e.subMenu) {
            f.defaultIndex = e.path
          } else if (e.subMenu && e.subMenu.length > 0) {
            e.subMenu.forEach((e1) => {
              if (f.$route.fullPath.includes(e1.path)) {
                f.defaultIndex = e1.path
              }
            })
          }
        })
        f.$nextTick(() => {
          f.showMenuChange = true
        })
        f.changeRouteByPermission(f.menuList)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.menubox {
  width: 100%;
  height: 100%;
  background: #fff;
  overflow: hidden;
  .main-menutitle {
    // background: url('../../assets/imgs/menu-title-bg.png') no-repeat;
    background-size: 100% 100%;
    padding-left: 60px;
    font-size: 17px !important;
    height: 49px;
    width: 100%;
    line-height: 48px;
    border-bottom: solid 1px #e4e4e4;
  }
}

.el-menu-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.el-menu-container::-webkit-scrollbar {
  width: 6px;
  height: 16px;
  background-color: #f5f5f5;
}
// .el-menu-container::-webkit-scrollbar-thumb {
//   border-radius: 10px;
//   -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
//   background-color: #c9c9c9;
// }
.el-sub-menu .el-sub-menu__icon-arrow {
  display: none;
}

.el-menu {
  background-color: #f0f7ff !important;
  color: #84888f;
  font-weight: 500;

  .el-menu-item.is-active,
  .el-menu-item:hover {
    background: #fff !important;
    color: #407aff !important;
  }
}
::v-deep .el-submenu .el-menu {
  background: #e3efff !important;
  color: #84888f;
  font-weight: 400;
  height: 50px;
  line-height: 50px;
}
::v-deep .el-menu-item-group__title {
  display: none;
}

.el-menu-item * {
  vertical-align: bottom;
}
</style>
