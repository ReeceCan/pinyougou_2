import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 导入项目的公共样式
import '@/assets/common.css'

// 将axios绑定到vue的原型上
import axios from 'axios'
Vue.prototype.axios = axios
// 配置默认的url
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 配置axios的拦截器
// 拦截器: 当发送的axios请求的时候,首先会经过这个拦截器
// 请求拦截器 响应拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // console.log(config)
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
// 响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    // console.log(response)
    // 直接返回res.data, 对应的就是服务器返回的数据
    return response.data
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

// 使用element-ui的插件
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
