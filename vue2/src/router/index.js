import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}
const routes = [
  {
    path: '/',
    redirect: '/menuvue21'
  },
  {
    path: '/menuvue21',
    name: 'menuvue21',
    component: () => import(/* webpackChunkName: "home" */ '@/views/menuvue21.vue'),
    meta: {
      title: 'menuvue21'
    }
  },
  {
    path: '/menuvue22',
    name: 'menuvue22',
    component: () => import(/* webpackChunkName: "home" */ '@/views/menuvue22.vue'),
    meta: {
      title: 'menuvue22'
    }
  },
  {
    path: '/menuvue23',
    name: 'menuvue23',
    component: () => import(/* webpackChunkName: "home" */ '@/views/menuvue23.vue'),
    meta: {
      title: 'menuvue23'
    }
  },
  {
    path: '/menuvue24',
    name: 'menuvue24',
    component: () => import(/* webpackChunkName: "home" */ '@/views/menuvue24.vue'),
    meta: {
      title: 'menuvue24'
    }
  }
]

const router = new VueRouter({
  base: '/',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return {
      x: 0,
      y: 0
    }
  }
})

export { router, routes }
