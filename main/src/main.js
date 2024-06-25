import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { registerMicroApps, start, addGlobalUncaughtErrorHandler } from 'qiankun'
import { microApps, micrConfig, fetchOptions } from '@/config/microApps'
import actions from '@/config/actions.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus, { size: 'small' }, { locale: zhCn })
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

registerMicroApps(microApps, micrConfig)
start(fetchOptions)
// 监听异常
addGlobalUncaughtErrorHandler((event) => {
  console.log(event)
  const { msg } = event
  if (msg && msg.includes('died in status LOADING_SOURCE_CODE')) {
    console.log('微应用加载失败，请检查应用是否可运行')
  }
})

app.mount('#app')
