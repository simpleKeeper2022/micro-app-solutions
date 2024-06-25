// Actions 通信 - 主应用中注册一个 actions 实例并导出
import { initGlobalState } from 'qiankun'

const initialState = {
  userInfo: null,
  menuToggle: false,
  cacheTabInfo: null,
  reNewRobot: false,
  witchChange: '',
  cache_menu: []
}
const actions = initGlobalState(initialState)

export default actions
