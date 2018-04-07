import fetch from '@/utils/fetch';

// 菜单分页
export function getMenuListPage(pageModel, data) {
  return fetch({
    url: '/apis/auth/page/' + pageModel.page + "/" + pageModel.rows,
    method: 'post',
    data
  });
}

//树形组件菜单
export function getMenuTree(data) {
  return fetch({
    url: '/apis/auth/show',
    method: 'post',
    data: data
  });
}

//获取当前菜单
export function getMenuById(id) {
  return fetch({
    url: '/apis/auth/' + id,
    method: 'get'
  });
}

//获取当前登录用户的菜单
export function getCurMenu() {
  return fetch({
    url: '/apis/leftMenu',
    method: 'get'
  });
}

//角色编辑页面获取全部菜单
export function getAllMenu(osType) {
  return fetch({
    url: `/apis/auth/all/${osType}`,
    method: 'get'
  })
}

//根据角色ID获取菜单和权限
export function getRoleMenuById(osType, roleId) {
  return fetch({
    url: `/apis/auth/role/${osType}/${roleId}`,
    method: 'get'
  });
}

//根据父级菜单ID获取子菜单
export function getMenuSortByParentId(id) {
  return fetch({
    url: '/apis/auth/parent/' + id,
    method: 'get'
  });
}

//根据菜单ID获取权限按钮
export function getAuthMenuById(id) {
  return fetch({
    url: '/apis/auth/authMenu/' + id,
    method: 'get'
  });
}


//新增菜单
export function addMenu(data) {
  return fetch({
    url: '/apis/auth',
    method: 'post',
    data
  });
}

//修改菜单
export function editMenu(data) {
  return fetch({
    url: '/apis/auth',
    method: 'put',
    data
  });
}

//删除菜单
export function delMenu(id) {
  return fetch({
    url: '/apis/auth/' + id,
    method: 'delete'
  });
}

//批量删除菜单
export function delSMenu(ids) {
  return fetch({
    url: '/apis/auth/delMany/' + ids,
    method: 'delete'
  });
}

//启用菜单
export function enableMenu(id) {
  return fetch({
    url: '/apis/auth/' + id,
    method: 'put'
  });
}

//批量启用菜单
export function enableSMenu(ids) {
  return fetch({
    url: '/apis/auth/delMany/' + ids,
    method: 'put'
  });
}


//---------------------------------------------------

/***
 * 静态测试资源
 */
export function getFunJson() {
  return fetch({
    url: 'static/json/fun.json',
    method: 'get'
  });
}

export function getFunButJson() {
  return fetch({
    url: 'static/json/funBut.json',
    method: 'get'
  });
}