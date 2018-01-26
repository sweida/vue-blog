import fetch from '@/utils/fetch'
import qs from 'qs'

// 获取赠送方案菜单
export function giveNav(data) {
  return fetch({
    url: 'apis/menu/ccMaterial',
    method: 'GET',
    data
  })
}
// 添加赠送方案菜单
export function addMenu(data) {
  return fetch({
    url: 'apis/menu',
    method: 'post',
    data
  })
}
// 删除赠送方案菜单
export function delMenu(menuId) {
  return fetch({
    url: `apis/menu/${menuId}`,
    method: 'DELETE'
  })
}
// 修改赠送方案菜单
export function editMenu(menuId, menuName) {
  return fetch({
    url: `apis/menu/${menuId}/${menuName}`,
    method: 'put'
  })
}
// 获取产品菜单
export function productMenu(data) {
  return fetch({
    url: 'apis/menu/product',
    method: 'GET',
    data
  })
}
// 获取项目菜单
export function projectMenu(data) {
  return fetch({
    url: 'apis/menu/project',
    method: 'GET',
    data
  })
}
// 获取项目和产品菜单
export function mixppMenu(data) {
  return fetch({
    url: 'apis/menu/projectAndProduct',
    method: 'GET',
    data
  })
}
// 获取项目、产品、套餐、代金券方案的菜单
export function ccGetMenu(data) {
  return fetch({
    url: 'apis/menu/ccGetMenu',
    method: 'GET',
    data
  })
}
