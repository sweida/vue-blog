import fetch from '@/utils/fetch'
import qs from 'qs'
// 查询企业信息
export function getInfoCompany() {
  return fetch({
    url: 'apis/enterprise',
    method: 'GET'
  })
}
export function getShop(data) {
  return fetch({
    url: `apis/organ/page/${data.page}/${data.rows}`,
    method: 'post',
    data
  })
}
export function addRoom(data) {
  return fetch({
    url: 'apis/rooms',
    method: 'post',
    data
  })
}
export function getRoom(data) {
  return fetch({
    url: `apis/rooms/page/${data.page}/${data.rows}`,
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
