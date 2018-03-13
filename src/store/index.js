import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import account from './modules/account'
import permission from './modules/permission'
import index from './modules/index'
import getters from './getters'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    app,
    account,
    index,
    permission
  },
  getters,
  strict: process.env.NODE_ENV !== 'production'
})
