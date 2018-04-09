import router from './router'
import { getToken, setToken } from '@/utils/token' // 验权
import { clone } from '@/utils/common' // 验权
import { Message } from 'element-ui'
import store from './store'
// permissiom judge
// function hasPermission(roles, permissionRoles) {
//   if (roles.indexOf('admin') >= 0) return true // admin权限 直接通过
//   if (!permissionRoles) return true
//   return roles.some(role => permissionRoles.indexOf(role) >= 0)
// }

// register global progress.
const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  if (getToken()) { // 判断是否有token
    if (to.path === '/login') {
      next({
        path: '/home'
      })
    } else {
      if (store.getters.addRouters.length === 0) { // 判断当前用户是否已拉取完user_info信息
        // store.dispatch('GetUserInfo').then(res => { // 拉取user_info
        // const roles = res.data.roles // note: roles must be a array! such as: ['editor','develop']
        store.dispatch('GenerateRoutes')
          .then(() => { // 根据roles权限生成可访问的路由表
            let route = store.getters.addRouters
            router.addRoutes(route) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        // }).catch(() => {
        //   store.dispatch('FedLogOut').then(() => {
        //     Message.error('Verification failed, please login again')
        //     next({ path: '/login' })
        //   })
        // })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        // if (hasPermission(store.getters.roles, to.meta.roles)) {
        next()
        // } else {
        //   next({ path: '/401', replace: true, query: { noGoBack: true } })
        // }
        // 可删 ↑
        // next({ ...to, replace: true })
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
    }
  }
})