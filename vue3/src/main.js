import { createApp } from 'vue'
import { createPinia } from 'pinia'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import App from './App.vue'
import router from './router'

import useRootStore from '@/store/rootStore'
let store = null

let app = null
const init = (props = {}) => {
  const { container } = props
  app = createApp(App)
  app.use(createPinia())
  app.use(router)
  app.use(ElementPlus, { size: 'small' }, { locale: zhCn })
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  store = useRootStore()
  app.mount(container ? container.querySelector('#app') : '#app')
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
export async function bootstrap(props) {
  console.log('vue3工程vuebootstrap时的props', props)
}
/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  init(props)
  app.config.globalProperties.$globalState = props
  store.SET_FOR_MAIN(props.FOR_MAIN)
  props.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log('vue3子应用接收到的state: 变更后的状态和变更前的状态', state, prev)
    if (state.witchChange === 'clearCache') {
      store.SET_CLEARCACHE(true)
    } else if (state.witchChange === 'changeCacheMenu') {
      store.SET_KEEPALIVE_FOR_MAIN(state.vue3_cacheMenu)
    }
  })
}
/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props) {
  console.log(props, '切出/卸载 ', app)
  app.unmount()
}
/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log('update props', props)
}
