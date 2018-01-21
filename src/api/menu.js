import fetch from '@/utils/fetch';

// 菜单分页
export function getMenuListPage(pageModel, data) {
  return fetch({
    url: 'apis/auth/page/' + pageModel.page + "/" + pageModel.rows,
    method: 'post',
    data
  });
}

//树形组件菜单
export function getMenuTree() {
  return fetch({
    url: 'apis/auth/show',
    method: 'get'
  });
}

//获取当前菜单
export function getMenuById(id) {
  return fetch({
    url: 'apis/auth/' + id,
    method: 'get'
  });
}

//获取当前登录用户的菜单
export function getCurMenu() {
  return fetch({
    url: 'apis/leftMenu',
    method: 'get'
  });
}

//角色编辑页面获取全部菜单
export function getAllMenu() {
  return fetch({
    url: 'apis/auth/all',
    method: 'get',
  });
}

//根据角色ID获取菜单和权限
export function getRoleMenuById(roleId) {
  return fetch({
    url: 'apis/auth/role/' + roleId,
    method: 'get'
  });
}
//根据父级菜单ID获取子菜单
export function getMenuSortByParentId(id) {
  return fetch({
    url: 'apis/auth/parent/'+id,
    method: 'get'
  });
}

//新增菜单
export function addMenu(data) {
  return fetch({
    url: 'apis/auth',
    method: 'post',
    data
  });
}

//修改菜单
export function editMenu(data) {
  return fetch({
    url: 'apis/auth',
    method: 'put',
    data
  });
}

//删除菜单
export function delMenu(id) {
  return fetch({
    url: 'apis/auth/' + id,
    method: 'delete'
  });
}

//批量删除菜单
export function delSMenu(ids) {
  return fetch({
    url: 'apis/delMany',
    method: 'delete',
    ids
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

export function getMenuJson() {
  return fetch({
    url: 'static/json/menu.json',
    method: 'get'
  });
}

