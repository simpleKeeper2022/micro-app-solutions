import { ref } from 'vue'
import { defineStore } from 'pinia'

const useRootStore = defineStore('rootStore', () => {
  let CACHE_MENU = ref([])
  let CACHE_MENU_VUE3 = ref([['menuTest1', 'menuTest2', 'menuTest3', 'menuTest4', 'menuTest5']])
  let CACHE_MENU_VUE2 = ref(['menuVue21', 'menuVue22', 'menuVue23', 'menuVue24'])

  function SET_CACHE_MENU(value) {
    CACHE_MENU.value = value
  }

  function SET_SUBCACHE_MENU({ attr, data }) {
    // eslint-disable-next-line
    if (attr === 'CACHE_MENU_VUE3') {
      CACHE_MENU_VUE3 = data
    } else if (attr === 'CACHE_MENU_VUE2') {
      CACHE_MENU_VUE2 = data
    }
  }

  return { CACHE_MENU, CACHE_MENU_VUE3, CACHE_MENU_VUE2, SET_CACHE_MENU, SET_SUBCACHE_MENU }
})

export default useRootStore
