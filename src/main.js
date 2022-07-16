import Vue from 'vue'
import App from './App.vue'
// import VueRouter from 'vue-router'
// 三级联动组件  全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import { Button, MessageBox } from 'element-ui'
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
// 引入mockServe.js
import '@/mock/mockServe'
// 引入swiper样式 全局 因为用轮播图的不止一个vue文件
import 'swiper/css/swiper.css'

import router from './router'
import store from '@/store'
Vue.config.productionTip = false
// Vue.use(VueRouter)

import VueLazyload from 'vue-lazyload'
import qiaoba from '@/assets/qiaoba.gif'
Vue.use(VueLazyload, {
  loading: qiaoba
})
import '@/plugins/validate'

import { reqCategoryList } from '@/api/index'
import * as API from '@/api'
reqCategoryList()
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  store
}).$mount('#app')
