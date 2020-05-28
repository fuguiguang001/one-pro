import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入全局公共css文件
import '@/assets/css/common.css'

// 导入ele-ui组件库
import ElementUI from 'element-ui';

// 导入axios
import axios from 'axios'
// 配置请求根地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 对axios进行原型继承（此操作解决了每个交互页面重复导入axios）
Vue.prototype.$http = axios

Vue.use(ElementUI); 

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
