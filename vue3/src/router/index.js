import { createRouter, createWebHashHistory } from 'vue-router'
import useRootStore from '@/store/rootStore'

const routes = [
  {
    path: '/',
    redirect: '/menuTest1'
  },
  {
    path: '/menuTest1',
    name: 'menuTest1',
    component: () => import(/* webpackChunkName: "home" */ '@/views/menuTest1.vue'),
    meta: {
      title: 'menuTest1'
    }
  },
  {
    path: '/menuTest2',
    name: 'menuTest2',
    component: () => import(/* webpackChunkName: "home" */ '@/views/menuTest2.vue'),
    meta: {
      title: 'menuTest2'
    }
  },
  {
    path: '/menuTest3',
    name: 'menuTest3',
    component: () => import(/* webpackChunkName: "home" */ '@/views/menuTest3.vue'),
    meta: {
      title: 'menuTest3'
    }
  },
  {
    path: '/menuTest4',
    name: 'menuTest4',
    component: () => import(/* webpackChunkName: "home" */ '@/views/menuTest4.vue'),
    meta: {
      title: 'menuTest4'
    }
  },
  {
    path: '/menuTest5',
    name: 'menuTest5',
    component: () => import(/* webpackChunkName: "home" */ '@/views/menuTest5.vue'),
    meta: {
      title: 'menuTest5'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  }
})
/* eslint-disable */
router.beforeEach((to, from, next) => {
  console.log(to, from, history.state, '从vue2跳转到vue3')
  const store = useRootStore()
  if (store.FOR_MAIN) {
    if (from.fullPath === to.fullPath) {
      next(false) // 调用 next 并传递 false 来阻止导航
      return // 提前返回，避免继续执行
    }
    // window.history.pushState(null, '', '')
  }
  next()
})

export default router
