import Vue from 'vue'
import Vuex from 'vuex'
import accout from './modules/accout'
import index from './modules/index'
import getters from './getters'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    accout,
    index
  },
  getters,
  strict: process.env.NODE_ENV !== 'production'
})
