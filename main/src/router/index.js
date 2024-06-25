import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
    // meta: {
    //   title: 'vue3子应用'
    // }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/vue2',
    meta: {
      title: 'vue2子应用'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  }
})
export default router
