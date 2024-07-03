import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { routes } from './router'
import store from './store'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(elementUi)

let instance = null
let router = null
// eslint-disable-next-line
let init = (props) => {
  const { container } = props
  // 这里必须要new一个新的路由实例，否则无法响应URL的变化。
  router = new VueRouter({
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
  if (window.__POWERED_BY_QIANKUN__ && window.__CACHE_INSTANCE_BY_QIAN_KUN_FOR_VUE__) {
    const cachedInstance = window.__CACHE_INSTANCE_BY_QIAN_KUN_FOR_VUE__
    const cachedNode = cachedInstance._vnode
    console.log(cachedInstance, cachedNode)
    router.apps.push(...cachedInstance.$router.apps)
    instance = new Vue({
      router,
      store,
      render: () => cachedNode
    })
    console.log('注入新的router后', instance)
    // 缓存最初的Vue实例
    instance.cachedInstance = cachedInstance
    instance.$mount(container ? container.querySelector('#app') : '#app')
  } else {
    instance = new Vue({
      router,
      store,
      // eslint-disable-next-line
      render: (h) => h(App)
    }).$mount(container ? container.querySelector('#app') : '#app')
  }
  router.beforeEach((to, from, next) => {
    console.log(to, from, '从vue3跳转到vue2', history.state)
    if (store.state.FOR_MAIN) {
      if (history.state?.current && !history.state.current.includes('vue2')) {
        return false
      }
      if (from.fullPath === to.fullPath) {
        return false
      }
      // window.history.pushState(null, '', '')
    }
    next()
  })
}
// eslint-disable-next-line
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
} else {
  init('')
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
// eslint-disable-next-line
export async function bootstrap(props) {}
/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  Vue.prototype.$globalState = props
  store.commit('SET_FOR_MAIN', props.FOR_MAIN)
  props.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log('vue2应用接收到的state: 变更后的状态和变更前的状态', state, prev)
    if (state.witchChange === 'clearCache') {
      store.commit('SET_CLEARCACHE', true)
    } else if (state.witchChange === 'changeCacheMenu') {
      store.commit('SET_KEEPALIVE_FOR_MAIN', state.vue2_cacheMenu)
    }
  })
  init(props)
}
/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props) {
  const cachedInstance = instance.cachedInstance || instance
  window.__CACHE_INSTANCE_BY_QIAN_KUN_FOR_VUE__ = cachedInstance
  const cachedNode = cachedInstance._vnode
  // 让keep-alive可用
  cachedNode.data.keepAlive = true
  cachedInstance.$el = null
  // 卸载当前实例，缓存的实例由于keep-alive生效，将不会真正被销毁，从而触发activated与deactivated
  // instance.$destroy()
  console.log('卸载vue2的示例', instance)
  router = null
  instance = null
}
/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log('update props', props)
}
