import { createRouter, createWebHashHistory } from 'vue-router'

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
export default router
