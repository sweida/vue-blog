const tokenKey = 'token'

export function getToken() {
  return (localStorage[tokenKey] == '' || localStorage[tokenKey] == undefined) ? '' : JSON.parse(localStorage[tokenKey])
}
export function setToken(token) {
  localStorage[tokenKey] = JSON.stringify(token)
}

export function removeToken(token) {
  localStorage[tokenKey] = ''
}
