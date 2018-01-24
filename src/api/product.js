import fetch from '@/utils/fetch'
import qs from 'qs'

// 添加项目
export function addproject(data) {
  return fetch({
    url: 'apis/projectInfo',
    method: 'post',
    data
  })
}
// 修改项目
export function editproject(data) {
  return fetch({
    url: 'apis/projectInfo',
    method: 'put',
    data
  })
}
// 获取项目详细
export function projectDetail(projectId) {
  return fetch({
    url: `apis/projectInfo/${projectId}`,
    method: 'GET'
  })
}
// 项目列表
export function getproject(pageModel, data) {
  return fetch({
    url: `apis/projectInfo/page/${pageModel.page}/${pageModel.rows}`,
    method: 'post',
    data
  })
}
// 删除项目
export function delProject(projectId) {
  return fetch({
    url: `apis/projectInfo/${projectId}`,
    method: 'DELETE'
  })
}
// 添加标签
export function addTag(data) {
  return fetch({
    url: 'apis/tag',
    method: 'post',
    data
  })
}
// 删除标签
export function delTag(data) {
  return fetch({
    url: 'apis/tag',
    method: 'DELETE',
    data
  })
}
// 获取标签列表
export function getTagli(type) {
  return fetch({
    url: `apis/tag/${type}`,
    method: 'get'
  })
}
// 获取配料类别
export function getBurden(pageModel, data) {
  return fetch({
    url: `apis/ccMaterial/${pageModel.page}/${pageModel.rows}`,
    method: 'post',
    data
  })
}
// 获取赠送方案菜单
export function giveNav(data) {
  return fetch({
    url: 'apis/menu/ccMaterial',
    method: 'GET',
    data
  })
}
// 添加赠送方案菜单
export function addgiveNav(data) {
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
// 添加赠送方案
export function addgivePlan(data) {
  return fetch({
    url: 'apis/givePlan',
    method: 'post',
    data
  })
}
// 修改赠送方案
export function editgivePlan(data) {
  return fetch({
    url: 'apis/givePlan',
    method: 'put',
    data
  })
}
// 获取赠送方案列表
export function getgivePlan(pageModel, data) {
  return fetch({
    url: `apis/givePlan/page/${pageModel.page}/${pageModel.rows}`,
    method: 'post',
    data
  })
}
// 获取赠送方案详细
export function givePlanDetail(givePlanId) {
  return fetch({
    url: `apis/givePlan/${givePlanId}`,
    method: 'GET'
  })
}
// 删除赠送方案
export function delgivePlan(givePlanId) {
  return fetch({
    url: `apis/givePlan/${givePlanId}`,
    method: 'DELETE'
  })
}
