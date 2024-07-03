<template>
  <div class="menubox">
    <el-menu
      :default-active="defaultIndex"
      class="el-menu-container"
      :collapse="menuToggle"
      @select="changeRoute"
      :unique-opened="true"
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

<script setup>
import { ref, watch, getCurrentInstance } from 'vue'
import menuTestDataList from './menulistData.js'
import useRootStore from '@/store/rootStore'
import bus from '@/common/bus.js'

const store = useRootStore()

const defaultIndex = ref('')
const menuToggle = ref(false)
const menuList = ref(menuTestDataList.vue3)
// 获取全局属性
const f = getCurrentInstance().root.appContext.config.globalProperties

function changeRoute(e) {
  console.log('点击菜单事件', e)
  dealCacheMenu(e)
  window.history.pushState({}, '', e)
}
// 添加需缓存的菜单
function dealCacheMenu(fullPath) {
  const cacheMenu = store.CACHE_MENU
  const obj = {}
  menuList.value.forEach((e) => {
    if (fullPath.includes(e.path) && !e.subMenu) {
      obj.path = e.path
      obj.text = e.text
      obj.name = e.name
    } else if (e.subMenu && e.subMenu.length > 0) {
      e.subMenu.forEach((e1) => {
        if (fullPath.includes(e1.path)) {
          obj.path = e1.path
          obj.text = e1.text
          obj.name = e.name
        }
      })
    }
  })
  if (obj.path && !cacheMenu.some((item) => item.path === obj.path)) {
    cacheMenu.push(obj)
    bus.emit('changeMenuCache', obj.name)
  }
  store.SET_CACHE_MENU(cacheMenu)
}
watch(
  () => f.$route.path,
  (newVal) => {
    if (newVal) {
      // showMenuChange = false
      if (newVal.includes('vue3')) {
        menuList.value = menuTestDataList.vue3
      } else if (newVal.includes('vue2')) {
        menuList.value = menuTestDataList.vue2
      }
      // $nextTick(() => {
      //   showMenuChange = true
      // })
    }
  }
)
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
