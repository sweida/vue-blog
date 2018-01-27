import fetch from '@/utils/fetch'
import qs from 'qs'
// 获取代金券具体产品
export function getVouterDetail(data) {
  return fetch({
    url: `apis/menu/couponNav/${data.parentId}/${data.itemId}`,
    method: 'GET'
  })
}
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

// 添加套餐
export function addPackage(data) {
  return fetch({
    url: 'apis/package',
    method: 'post',
    data
  })
}
// 修改套餐
export function editPackage(data) {
  return fetch({
    url: 'apis/package',
    method: 'put',
    data
  })
}
// 获取套餐详细
export function PackageDetail(packageId) {
  return fetch({
    url: `apis/package/${packageId}`,
    method: 'GET'
  })
}
// 套餐列表
export function PackageList(pageModel, data) {
  return fetch({
    url: `apis/package/${pageModel.page}/${pageModel.rows}`,
    method: 'post',
    data
  })
}
// 删除套餐
export function delPackage(packageId) {
  return fetch({
    url: `apis/package/${packageId}`,
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
// 获取代金券列表
export function getVoucher(pageModel, data) {
  return fetch({
    url: `apis/coupon/page/${pageModel.page}/${pageModel.rows}`,
    method: 'post',
    data
  })
}
// 添加代金券
export function addVoucher(data) {
  return fetch({
    url: 'apis/coupon',
    method: 'post',
    data
  })
}
// 修改代金券
export function editVoucher(data) {
  return fetch({
    url: 'apis/coupon',
    method: 'put',
    data
  })
}
// 删除代金券
export function delVoucher(couponId) {
  return fetch({
    url: `apis/coupon/${couponId}`,
    method: 'DELETE'
  })
}
// 获取代金券详细
export function VoucherDetail(couponId) {
  return fetch({
    url: `apis/coupon/${couponId}`,
    method: 'GET'
  })
}
