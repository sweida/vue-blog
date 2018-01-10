
import Vue from 'vue'
Vue.config.productionTip = false
import App from './App'
import store from './store'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
Vue.use(ElementUI)
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'

new Vue({
  el: '#app',
  router,
  store,//使用store
  template: '<App/>',
  render: h => h(App),
  methods:{
  }
})
