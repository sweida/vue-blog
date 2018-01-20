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
// 编辑项目
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
// 编辑项目
export function editproject(data) {
  return fetch({
    url: 'apis/projectInfo',
    method: 'PUT',
    data
  })
}
