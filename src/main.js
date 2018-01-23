import Vue from 'vue'
import App from './App'
import store from './store'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
Vue.use(ElementUI)
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,//使用store
  template: '<App/>',
  render: h => h(App),
  methods:{
  }
})
