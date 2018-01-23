import fetch from '@/utils/fetch'
import qs from 'qs'
// 查询企业信息
export function getInfoCompany() {
  return fetch({
    url: 'apis/enterprise',
    method: 'GET'
  })
}
// 修改企业信息
export function changeCompanyInfo(data) {
  return fetch({
    url: 'apis/enterprise',
    method: 'PUT',
    data
  })
}
// 查询企业文化信息
export function getCurtureCompany(data) {
  return fetch({
    url: `apis/enterprise/${data}`,
    method: 'GET'
  })
}
// 店面
export function getShop() {
  return fetch({
    url: 'apis/organ',
    method: 'post'
  })
}
export function changeShop(data) {
  return fetch({
    url: 'apis/organ',
    method: 'PUT',
    data
  })
}
// 房间
export function addRoom(data) {
  return fetch({
    url: 'apis/rooms',
    method: 'post',
    data
  })
}
export function delRoom(data) {
  return fetch({
    url: `apis/rooms/${data}`,
    method: 'DELETE',
    data
  })
}
export function getRoom(pageModel, data) {
  return fetch({
    url: `apis/rooms/page/${pageModel.page}/${pageModel.rows}`,
    method: 'post',
    data
  })
}

// 员工
export function getJob() {
  return fetch({
    url: 'apis/role/all',
    method: 'GET'
  })
}
export function getSttaf(pageModel, data) {
  return fetch({
    url: `apis/user/page/${pageModel.page}/${pageModel.rows}`,
    method: 'post',
    data
  })
}
export function addSttaf(data) {
  return fetch({
    url: 'apis/user',
    method: 'post',
    data
  })
}
export function delSttaf(userId) {
  return fetch({
    url: `apis/user/${userId}`,
    method: 'DELETE'
  })
}
export function editSttaf(data) {
  return fetch({
    url: 'apis/user',
    method: 'PUT',
    data
  })
}
// 代金券
export function getVoucher(pageModel, data) {
  return fetch({
    url: `apis/coupon/page/${pageModel.page}/${pageModel.rows}`,
    method: 'post',
    data
  })
}
// 代金券菜单
export function getMenu() {
  return fetch({
    url: 'apis/menu/coupon',
    method: 'GET'
  })
}
// 代金券增加时获取菜单
export function getMenuAdd() {
  return fetch({
    url: 'apis/menu/coupon/item',
    method: 'GET'
  })
}
// 代金券增加时获取菜单Byid
export function getMenuById(data) {
  return fetch({
    url: `apis/menu/couponNav/${data[0]}/${data[1]}`,
    method: 'GET'
  })
}
// 套餐菜单
export function getMenuMeal() {
  return fetch({
    url: 'apis/menu/setMeal',
    method: 'GET'
  })
}
export function getMealList(pageModel, data) {
  return fetch({
    url: `apis/package/${pageModel.page}/${pageModel.rows}`,
    method: 'POST',
    data
  })
}
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
