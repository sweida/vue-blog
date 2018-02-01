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
    url: 'apis/organ/all',
    method: 'get'
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
// 获取角色
export function getJob() {
  return fetch({
    url: 'apis/role/all',
    method: 'GET'
  })
}
// 员工列表
export function getSttaf(pageModel, data) {
  return fetch({
    url: `apis/user/page/${pageModel.page}/${pageModel.rows}`,
    method: 'post',
    data
  })
}
// 新增员工
export function addSttaf(data) {
  return fetch({
    url: 'apis/user',
    method: 'post',
    data
  })
}
// 删除员工
export function delSttaf(userId) {
  return fetch({
    url: `apis/user/${userId}`,
    method: 'DELETE'
  })
}
// 查询员工
export function sttafDetail(userId) {
  return fetch({
    url: `apis/user/${userId}`,
    method: 'get'
  })
}
export function editSttaf(data) {
  return fetch({
    url: 'apis/user',
    method: 'PUT',
    data
  })
}
// 添加会员卡
export function addvipCard(data) {
  return fetch({
    url: 'apis/vipStructure',
    method: 'post',
    data
  })
}
// 获取会员卡
export function getvipCard(pageModel, data) {
  return fetch({
    url: `apis/vipStructure/page/${pageModel.page}/${pageModel.rows}`,
    method: 'post',
    data
  })
}
// 删除会员卡
export function delvipCard(data) {
  return fetch({
    url: `apis/vipStructure/${data}`,
    method: 'DELETE',
    data
  })
}
// 编辑会员卡
export function editvipCard(data) {
  return fetch({
    url: 'apis/vipStructure',
    method: 'PUT',
    data
  })
}
// 会员卡详细信息
export function getCardDetail(id) {
  return fetch({
    url: `apis/vipStructure/${id}`,
    method: 'GET'
  })
}
// 添加活动说明
export function actDesc(data) {
  return fetch({
    url: 'apis/actDesc',
    method: 'post',
    data
  })
}
// 编辑活动说明
export function editactDesc(data) {
  return fetch({
    url: 'apis/actDesc',
    method: 'PUT',
    data
  })
}
// id获取活动说明
export function actDescInfo(id) {
  return fetch({
    url: `apis/actDesc/${id}`,
    method: 'get'
  })
}
// 类型获取活动说明
export function actDescList(type) {
  return fetch({
    url: `apis/actDesc/type/${type}`,
    method: 'get'
  })
}
// 修改设置
export function editSetting(data) {
  return fetch({
    url: 'apis/SysSetting',
    method: 'PUT',
    data
  })
}
export function getSetting(data) {
  return fetch({
    url: `apis/SysSetting/${data}`,
    method: 'GET',
    data
  })
}
