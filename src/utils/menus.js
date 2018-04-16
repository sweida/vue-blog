import Cookies from 'js-cookie'
const menuKey = 'menus'
export function getMenus() {
  return (localStorage[menuKey] == '' || localStorage[menuKey] == undefined) ? '' : JSON.parse(localStorage[menuKey])
}
export function setMenus(menus) {
  localStorage[menuKey] = JSON.stringify(menus)
}
export function removeMenus() {
  localStorage.removeItem(menuKey)
}