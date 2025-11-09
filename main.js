import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({ ...App })
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'

// ★ 仅引入我们自己的全局样式（兼容 nvue/H5）
import './uni.scss'

// --- [修正] 1. 从它们的真实路径导入 ---
import FlowChartNode from './U2_components/P_1/P_1_C_124/P_1_C_124.vue' 
import NodeCard from './U2_components/P_1/P_1_C_125/P_1_C_125.vue'      
import Plane from './U2_components/P_1/P_1_C_126/P_1_C_126.vue'             
// --- [修正] 结束 ---

export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()
  app.use(pinia)

  // --- [修正] 2. 按照您的要求，使用新名称注册它们为全局组件 ---
  app.component('P_1_C_124', FlowChartNode)
  app.component('P_1_C_125', NodeCard)
  app.component('P_1_C_126', Plane)
  // --- [修正] 结束 ---

  return { app }
}
// #endif