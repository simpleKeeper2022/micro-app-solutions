/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    FOR_MAIN: false,
    IS_CLEAR_CACHE: false,
    KEEPALIVE_FOR_MAIN: []
  },
  mutations: {
    SET_FOR_MAIN(state, value) {
      state.FOR_MAIN = value
    },
    // 门户 清除所有组件缓存
    SET_CLEARCACHE(state, v) {
      state.IS_CLEAR_CACHE = v
    },
    // 更新keepAlive的组件列表
    SET_KEEPALIVE_FOR_MAIN(state, data) {
      state.KEEPALIVE_FOR_MAIN = data
    }
  },
  actions: {},
  modules: {}
})
