import fetch from '@/utils/fetch'
import qs from 'qs'

// 登录
export function Login(data) {
  return fetch({
    url: 'apis/login',
    method: 'post',
    data
  })
}

export function articleList () {
  return fetch({
    url: 'apis/article/read',
    method: 'get'
  })
}

export function logout() {
  return fetch({
    url: 'apis/authentication/out',
    method: 'post'
  })
}
// 用户权限菜单
export function getRouterMenu() {
  return fetch({
    url: '/apis/auth/user/router',
    method: 'GET'
  })
}
// 产品菜单
export function getMenuProduct() {
  return fetch({
    url: '/apis/menu/product',
    method: 'GET'
  })
}
// 项目菜单
export function getMenuProject() {
  return fetch({
    url: '/apis/menu/project',
    method: 'GET'
  })
}
