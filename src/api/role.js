import fetch from '@/utils/fetch';

export function getRoleListPage(pageModel,data) {
  return fetch({
    url: '/apis/role/page/'+pageModel.page+"/"+pageModel.rows,
    method: 'post',
    data
  });
}

export function getRoleAll() {
  return fetch({
    url: '/apis/role/all',
    method: 'get'
  });
}

export function getUserRole(id) {
  return fetch({
    url: '/apis/role/user/'+id,
    method: 'get'
  });
}

export function getRoleById(id) {
  return fetch({
    url: '/apis/role/'+id,
    method: 'get'
  });
}

export function addRole(data) {
  return fetch({
    url: '/apis/role',
    method: 'post',
    data
  });
}

export function editRole(data) {
  return fetch({
    url: '/apis/role',
    method: 'put',
    data
  });
}

export function delRole(id) {
  return fetch({
    url: '/apis/role/'+id,
    method: 'delete'
  });
}

export function enableRole(id) {
  return fetch({
    url: '/apis/role/'+id,
    method: 'put'
  });
}

export function delsRole(ids) {
  return fetch({
    url: '/apis/role/delMany/'+ids,
    method: 'delete'
  });
}

export function enableSRole(ids) {
  return fetch({
    url: '/apis/role/enableMany/'+ids,
    method: 'put'
  });
}
