// import Lockr from 'lockr';
// import { setTags } from "../../utils/accout";
// import $ from "jquery";

const accout = {
  state: {
    token: localStorage.token == null ? [] : JSON.parse(localStorage.token)
  },
  mutations: {
    // token
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage['token'] = JSON.stringify(token) // 由于 localStorage 只能保存字符串内容，所以这里要先把对象转换成 JSON 字符串
    }
  },
  actions: {
    // token
    changeToken: ({ commit }, token) => {
      commit('SET_TOKEN', token)
    }
  }
}

export default accout
