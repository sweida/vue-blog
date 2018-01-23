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

// // 添加赠送方案
// export function addproject(data) {
//   return fetch({
//     url: 'apis/givePlan',
//     method: 'post',
//     data
//   })
// }
// // 编辑项目
// export function projectDetail(projectId) {
//   return fetch({
//     url: `apis/projectInfo/${projectId}`,
//     method: 'GET'
//   })
// }
