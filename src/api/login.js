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
export function toLogin(data) {
  return fetch({
    url: 'apis/authentication/form',
    method: 'post',
    data: qs.stringify(data)
  })
}
