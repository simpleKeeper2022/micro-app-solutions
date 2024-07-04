# micro-app-solutions

一个基于 qinakun2 微前端解决方案演示项目

## 最佳实践详细文档

- [微前端治理前端应用（一）- 聚合新旧应用 ](https://juejin.cn/post/7379896952040194074)
- [微前端治理前端应用（一）- 子应用多标签页缓存 ](https://juejin.cn/post/7386951831892607013)

## 功能

- 支持接入不同技术栈的子应用，基于 qiankun 的沙箱功能，子应用 window 作用域隔离、元素隔离
- 父子应用之间的订阅/发布模型， 支持各应用之间的数据通信
- 菜单切换，基座应用调用不同的子应用路由，菜单切换后回来原界面状态保留
- 子应用可独立运行独立维护，聚合平台运行时加载子应用

### 运行 demo

下载项目

```sh
$ git https://github.com/simpleKeeper2022/micro-app-solutions
```

安装依赖、运行

基座应用

```sh
$ cd main
$ pnpm i
$ npm run s
```

打开 https：//localhost:9000

Vue3 子应用

```sh
$ cd vue3
$ pnpm i
$ npm run s

```

打开 https：//localhost:9010

Vue2 子应用

```sh
$ cd vue2
$ pnpm i
$ npm run s

```

打开 https：//localhost:9020

### 配置代理

microappvue3.oa.fenqfenle.com 127.0.0.1:9010
microappvue2.oa.fenqfenle.com 127.0.0.1:9020

### 子应用入口

VUE_APP_ENTRY1=https://microappvue3.oa.fenqfenle.com/#/index.html
VUE_APP_ENTRY2=https://microappvue2.oa.fenqfenle.com/#/index.html

### 路由配置

主应用使用: createWebHistory();
子应用使用：createWebHashHistory()

## 多标签页缓存

借助 Vue 的 keep-alive 组件以及渲染函数的原理(https://cn.vuejs.org/v2/guide/render-function.html)
