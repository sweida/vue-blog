import axios from "axios"
import router from "@/router"
import store from "../store"
import { Message } from "element-ui"

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 10000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (config.url == "apis/authentication/form") {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  } else {
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
    let Authorization = store.getters.token.token_type + ' ' + store.getters.token.access_token
    config.headers['Authorization'] = Authorization
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  res => {
    if (res.status == 401) {
      Message({
        message: res.data.msg,
        type: 'error',
        duration: 2000,
        onClose() {
          // removeToken()
          router.push('/')
        }
      })
      return res
    } else if(res.status==500){
      Message({
        message: "服务器错误",
        type: 'error',
        duration: 2000,
        onClose() {
          // removeToken()
          router.push('/')
        }
      })
    }else{
      return res
    }
  },
  error => {
    console.log('err:' + error.response.status)// for debug
    Message({
      message: error.response.data.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
