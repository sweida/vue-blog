import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
const home = resolve => require(['@/view/home'], resolve)
Vue.use(Router)
export const constantRouterMap = [
  { path: '/login', component: _import('login'), name: 'login', hidden: true },
  {
    path: '/',
    component: _import('login'),
    redirect: {
      name: 'login'
    }
  }
]
export default new Router({
  mode: 'history',
  routes: constantRouterMap
})

export function auth(authMap) {
  authMap.forEach(item => {
    item.component = home
    if (item.children) {
      item.children.forEach(child => {
        child.component = _import(child.component)
      })
    }
  })
  return authMap
}

// export const asyncRouterMap = [
//   {
//     path: '/home',
//     component: home,
//     children: [
//       { path: '/home', component: _import('content'), name: '企业和会所' },
//       { path: '/room', component: _import('room/room'), name: '房间' },
//       { path: '/scope', component: _import('scope/scope'), name: '职位权限' },
//       { path: '/staff', component: _import('staff/staff'), name: '员工管理' },
//       { path: '/voucher', component: _import('voucher/voucher'), name: '代金券' },
//       { path: '/clubCard', component: _import('clubCard/clubCard'), name: '会员卡' },
//       { path: '/present', component: _import('present/present'), name: '赠送方案' },
//       { path: '/project', component: _import('project/project'), name: '项目' },
//       { path: '/project/addProject', component: _import('project/addProject'), name: '添加项目' },
//       { path: '/project/edit/:id', component: _import('project/addProject'), name: '编辑项目' },
//       { path: '/setMeal', component: _import('setMeal/setMeal'), name: '套餐' },
//       { path: '/setMeal/addSetmeal', component: _import('setMeal/addSetmeal'), name: '添加套餐' },
//       { path: '/setMeal/edit/:id', component: _import('setMeal/addSetmeal'), name: '编辑套餐' },
//       { path: '/phone', component: _import('phone/phone'), name: '云电话' },
//       { path: '/setting', component: _import('setting/setting'), name: '设置' },
//       { path: '/menu', component: _import('menuManage/menu'), name: '菜单管理' }
//     ]
//   },
//   { path: '*', redirect: '/home', hidden: true }
// ]
