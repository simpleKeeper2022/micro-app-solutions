<template>
  <div class="cachemenu" :class="isExpand ? 'open' : 'close'">
    <el-row class="cacheleft" v-if="isExpand">
      <el-col :span="22">
        <el-tag
          v-for="(tag, idx) in cacheMenus"
          :key="tag.path"
          :type="tag.type"
          @click="changeRoute(tag.path)"
          @close="handleClose(idx)"
          class="mx-1"
          closable
          v-show="isExpand"
        >
          {{ tag.text }}
        </el-tag>
      </el-col>
      <el-col :span="2" class="btnright">
        <el-button round type="default" @click="reSetCache"> 清空缓存</el-button>
        <el-button round type="primary" v-if="isExpand" @click="isExpand = !isExpand"
          >收起</el-button
        >
      </el-col>
    </el-row>
    <div class="btnright" v-else>
      <el-button round type="default" @click="reSetCache">清空缓存</el-button>
      <el-button round type="primary" @click="isExpand = !isExpand">展开</el-button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'
import useRootStore from '@/store/rootStore'

const store = useRootStore()
const $emit = defineEmits(['clearCache'])

import { ref, watch, getCurrentInstance, onMounted, onBeforeUnmount } from 'vue'
import bus from '@/common/bus.js'
// 获取全局属性
const f = getCurrentInstance().root.appContext.config.globalProperties
const cacheMenus = store.CACHE_MENU
// 对应子应用缓存组件的名称
const CACHE_MENU_VUE3 = store.CACHE_MENU_VUE3
const CACHE_MENU_VUE2 = store.CACHE_MENU_VUE2
console.log(cacheMenus, CACHE_MENU_VUE3, CACHE_MENU_VUE2)
const isExpand = ref(true)
const isCurrentPath = ref(false) // 用于判断当前路由是否和删除的标签一致

// 清空
function reSetCache() {
  const arr = [...store.CACHE_MENU]
  store.SET_CACHE_MENU([])
  $emit('clearCache', arr)
}

// 点击标签路由跳转
function changeRoute(path) {
  window.history.pushState({}, '', path)
}

function fliterCacheTab(cacheMenuName, name) {
  return cacheMenuName.filter((item) => item !== name)
}
// 增加新的缓存标签
function addCacheTab(keepMenus, name) {
  const keeps = keepMenus
  if (!keepMenus.some((item) => item === name)) {
    keeps.push(name)
  }
  return keeps
}
// 通知子应用清除/添加响应组件的缓存  type: 1-清除单个  2-添加
function nofifyChangeCache(name, type) {
  const { fullPath } = f.$route
  let cacheMenuName = []
  let attr = ''
  if (fullPath.includes('vue3')) {
    cacheMenuName =
      type === 1 ? fliterCacheTab(CACHE_MENU_VUE3, name) : addCacheTab(CACHE_MENU_VUE3, name)
    attr = 'CACHE_MENU_VUE3'
    f.$globalState.setGlobalState({
      witchChange: 'changeCacheMenu',
      vue3_cacheMenu: cacheMenuName
    })
  } else if (fullPath.includes('vue2')) {
    cacheMenuName =
      type === 1 ? fliterCacheTab(CACHE_MENU_VUE2, name) : addCacheTab(CACHE_MENU_VUE2, name)
    attr = 'CACHE_MENU_VUE2'
    f.$globalState.setGlobalState({
      witchChange: 'changeCacheMenu',
      vue2_cacheMenu: cacheMenuName
    })
  }
  store.SET_SUBCACHE_MENU({ attr, data: cacheMenuName })
  // 如果当前路由是当前删除的标签，重新跳转
  if (isCurrentPath.value) {
    setTimeout(() => {
      f.$router.replace(f.$route.fullPath)
    }, 500)
  }
}

// 标签关闭
function handleClose(index) {
  const keepMenus = cacheMenus
  const delMenuName = keepMenus[index].name
  if (keepMenus[index].path === f.$route.fullPath) {
    isCurrentPath.value = true
  }
  nofifyChangeCache(delMenuName, 1)
  keepMenus.splice(index, 1)
  store.SET_CACHE_MENU(keepMenus)
}
// 初始化  监听路由变化 是否需要添加子应用缓存菜单
onMounted(() => {
  bus.on('changeMenuCache', (res) => {
    nofifyChangeCache(res, 2)
  })
})
onBeforeUnmount(() => {
  bus.off('changeMenuCache')
})
watch(
  () => f.$route.fullPath,
  (newVal) => {
    if (newVal) {
      setTimeout(() => {
        const temp = store.CACHE_MENU
        temp.forEach((e) => {
          e.type = newVal === e.path ? '' : 'info'
        })
        store.SET_CACHE_MENU(temp)
      }, 200)
    }
  }
)
</script>
<style scoped>
.el-tag {
  background-color: #ecf5ff;
  border-color: #d9ecff;
  color: #409eff;
}
.el-tag.el-tag--info {
  background-color: #f4f4f5;
  border-color: #e9e9eb;
  color: #909399;
}
.mx-1 {
  margin-right: 5px;
  cursor: pointer;
}
.cachemenu {
  transition: width 0.5s;
  border-bottom: solid 1px #ddd;
  background: #fff;
  box-shadow: 0px 15px 10px -15px #000;
  padding: 0 10px;
}
.open {
  width: 100%;
  background: #fff;
  line-height: 45px;
}
.close {
  width: 140px;
  line-height: 45px;
  display: flex;
  align-items: center;
}
.cacheleft {
  width: 100%;
  overflow: hidden;
}
.btnright {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
