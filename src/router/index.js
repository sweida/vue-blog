import Vue from 'vue'
import Router from 'vue-router'
import login from '@/view/login'
// import home from '@/view/home'
// const login = resolve => require(['@/view/login'], resolve)
const home = resolve => require(['@/view/home'], resolve)
const content = resolve => require(['@/view/content'], resolve)
const room = resolve => require(['@/view/room/room'], resolve)
const scope = resolve => require(['@/view/scope/scope'], resolve)
const staff = resolve => require(['@/view/staff/staff'], resolve)
const voucher = resolve => require(['@/view/voucher/voucher'], resolve)
const clubCard = resolve => require(['@/view/clubCard/clubCard'], resolve)
const project = resolve => require(['@/view/project/project'], resolve)
const present = resolve => require(['@/view/present/present'], resolve)
const setMeal = resolve => require(['@/view/setMeal/setMeal'], resolve)
const phone = resolve => require(['@/view/phone/phone'], resolve)
const setting = resolve => require(['@/view/setting/setting'], resolve)

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/login',
      component: login,
      name: 'login',
      hidden: true
    },
    {
      path: '/',
      component: login,
      redirect: {
        name: 'login',
      }
    },
    {
      path: '/home',
      component: home,
      children: [
        { path: '/', component: content, name: '主页' },
        { path: '/room', component: room, name: '房间' },
        { path: '/scope', component: scope, name: '职位权限' },
        { path: '/staff', component: staff, name: '员工管理' },
        { path: '/voucher', component: voucher, name: '代金券' },
        { path: '/clubCard', component: clubCard, name: '会员卡' },
        { path: '/project', component: project, name: '项目' },
        { path: '/present', component: present, name: '赠送方案' },
        { path: '/setMeal', component: setMeal, name: '套餐' },
        { path: '/phone', component: phone, name: '云电话' },
        { path: '/setting', component: setting, name: '设置' }
      ]
    }
  ]
})
