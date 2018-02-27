import fetch from '@/utils/fetch'
import qs from 'qs'

// 登录
export function toLogin(data) {
  return fetch({
    url: 'apis/authentication/form',
    method: 'post',
    data: qs.stringify(data),
    auth: {
      username: 'article',
      password: 'articleSecret'
    }
  })
}
// 产品菜单
export function getMenuProduct() {
  return fetch({
    url: '/apis/menu/product',
    method: 'GET'
  })
}
// 产品菜单
export function getMenuProject() {
  return fetch({
    url: '/apis/menu/project',
    method: 'GET'
  })
}
