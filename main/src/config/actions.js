// Actions 通信 - 主应用中注册一个 actions 实例并导出
import { initGlobalState } from 'qiankun'

const initialState = {
  witchChange: '',
  cache_menu: []
}
const actions = initGlobalState(initialState)

export default actions
