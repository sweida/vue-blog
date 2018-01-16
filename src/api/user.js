import fetch from '@/utils/fetch'
import qs from 'qs'

// 客户列表
export function getinfo(data) {
  return fetch({
    url: 'customer/queryfastwork.do',
    method: 'get',
    data: qs.stringify(data)
  })
}

//搜索客户
export function searchCustomer(data) {
  return fetch({
    url: 'customer/queryCustomerInfo.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
//添加新客户
export function addCustomer(data) {
  return fetch({
    url: 'customer/addCustomer.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
//客户详情页
export function CustomerDetail(data) {
  return fetch({
    url: 'customer/enterCustomerBasicPage.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
//客户余额、持有数量
export function CustomerInitInfo(data) {
  return fetch({
    url: 'customer/queryCustomerInitInfo.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
//更新客户信息
export function updateCustomer(data) {
  return fetch({
    url: 'customer/updateCustomerBasicInfo.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 查询分店
export function getStore() {
  return fetch({
    url: 'customer/queryOrganNameSettingData1.do',
    method: 'get'
  })
}
// 获取产品和项目菜单
export function getProductInfo(data) {
  return fetch({
    url: 'customer/queryprojectstructure.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 获取套餐菜单
export function getMealInfo(data) {
  return fetch({
    url: 'customer/queryprojectstructurebytype.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 获取持有项目
export function holdRecord(data) {
  return fetch({
    url: 'customer/queryHoldProjects.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 耗卡查询个人预约单
export function revOrderlist(data) {
  return fetch({
    url: 'customer/queryRevOrderList.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 获取耗卡单初始化信息
export function OperationOrderInitInfo(data) {
  return fetch({
    url: 'customer/queryOperationOrderInitInfo.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 所有配料
export function queryMaterials(data) {
  return fetch({
    url: 'customer/queryMaterials.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 单个项目配料
export function queryMaterialsInfo(data) {
  return fetch({
    url: 'customer/queryMaterialsInfo.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 提交耗卡订单
export function addOperationOrderRecords(data) {
  return fetch({
    url: 'customer/addOperationOrderRecords.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 获取床号
export function RoomsStatus(data) {
  return fetch({
    url: 'customer/queryRoomsStatus.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 进入预约表
export function enterReservation(data) {
  return fetch({
    url: 'customer/ajaxEnterReservationStatus.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 获取预约号
export function getTableSequence(data) {
  return fetch({
    url: 'customer/getTableSequence.do',
    method: 'get',
    data: qs.stringify(data)
  })
}
// 取消预约
export function cancelReserva(data) {
  return fetch({
    url: 'customer/cancelReservationOrder.do',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 查看服务人员
export function enterServer(data) {
  return fetch({
    url: 'customer/ajaxEnterReservationStatusByBea.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 提交预约表
export function addReservation(data) {
  return fetch({
    url: 'customer/addReservationRecords.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 查询今日预约
export function TodayReservation(data) {
  return fetch({
    url: 'customer/queryTodayOrderCustomers.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
//查询客户预约单
export function getRevOrderList(data) {
  return fetch({
    url: 'customer/getReservationOrderinfo.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
//进入充值页面
export function Recharge(data) {
  return fetch({
    url: 'customer/queryRechargeOrderInitInfo.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
//提交充值
export function addRecharge(data) {
  return fetch({
    url: 'customer/addRechargeRecords.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
