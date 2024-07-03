/**
 * 用户相关
 */
import { defineStore } from 'pinia'

const useRootStore = defineStore('rootStore', {
  // 每次调用这个箭头函数，都会创建一个全新的对象并返回
  state: () => {
    return {
      FOR_MAIN: false,
      IS_CLEAR_CACHE: false,
      KEEPALIVE_FOR_MAIN: []
    }
  },
  getters: {},
  actions: {
    SET_FOR_MAIN(value) {
      this.FOR_MAIN = value
    },
    // 清除所有组件缓存
    SET_CLEARCACHE(state, v) {
      state.IS_CLEAR_CACHE = v
    },
    // 更新keepAlive的组件列表
    SET_KEEPALIVE_FOR_MAIN(state, data) {
      state.KEEPALIVE_FOR_MAIN = data
    }
  }
})
export default useRootStore
