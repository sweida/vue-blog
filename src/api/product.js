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
// 会员卡
export function addvipCard(data) {
  return fetch({
    url: 'apis/vipStructure',
    method: 'post',
    data
  })
}
export function getvipCard(pageModel, data) {
  return fetch({
    url: `apis/vipStructure/page/${pageModel.page}/${pageModel.rows}`,
    method: 'post',
    data
  })
}