// import store from '@/store';

const microApps = [
  {
    name: 'vue2',
    entry: process.env.VUE_APP_ENTRY2,
    container: '#microapp',
    activeRule: '/vue2',
    props: { FOR_MAIN: true }
  }
]
const micrConfig = {
  beforeLoad: [
    (app) => {
      console.log(
        '%c before load',
        'background:#0f0 ; padding: 1px; border-radius: 3px;  color: #fff',
        app
      )
    }
  ], // 挂载前回调
  beforeMount: [
    (app) => {
      console.log(
        '%c before mount',
        'background:#f1f ; padding: 1px; border-radius: 3px;  color: #fff',
        app
      )
    }
  ], // 挂载后回调
  afterUnmount: [
    (app) => {
      console.log(
        '%c after unload',
        'background:#a7a ; padding: 1px; border-radius: 3px;  color: #fff',
        app
      )
    }
  ] // 卸载后回调
}

const fetchOptions = {
  prefetch: true, // 预加载方式
  singular: false,
  sandbox: { experimentalStyleIsolation: true }, // 可选，是否开启沙箱，默认为 true。// 从而确保微应用的样式不会对全局造成影响。
  // qiankun 通过fetch 请求'oa.fenqile.com/res/static/common 有跨域问题, 所以使用 script 标签加载
  excludeAssetFilter: (url) => url.includes('XXXX/res/static/common'),
  fetch(url, ...args) {
    return window.fetch(url, ...args)
  }
}

export { microApps, micrConfig, fetchOptions }
