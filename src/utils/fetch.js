import axios from "axios"
import router from "@/router"
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
    if (res.data.status == 401) {
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
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
