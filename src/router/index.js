// import Vue from 'vue'
// import Router from 'vue-router'
// const _import = require('./_import_' + process.env.NODE_ENV)
// const home = resolve => require(['@/view/home'], resolve)
// Vue.use(Router)
// export const constantRouterMap = [
//   { path: '/login', component: _import('login'), name: 'login', hidden: true },
//   {
//     path: '/',
//     component: _import('login'),
//     redirect: {
//       name: 'login'
//     }
//   }
// ]
// export default new Router({
//   mode: 'history',
//   routes: constantRouterMap
// })

// export function auth(authMap) {
//   authMap.forEach(item => {
//     item.component = home
//     if (item.children) {
//       item.children.forEach(child => {
//         child.component = _import(child.component)
//       })
//     }
//   })
//   return authMap
// }

// // export const asyncRouterMap = [
// //   {
// //     path: '/home',
// //     component: home,
// //     children: [
// //       { path: '/home', component: _import('content'), name: '企业和会所' },
// //       { path: '/room', component: _import('room/room'), name: '房间' },
// //       { path: '/scope', component: _import('scope/scope'), name: '职位权限' },
// //       { path: '/staff', component: _import('staff/staff'), name: '员工管理' },
// //       { path: '/voucher', component: _import('voucher/voucher'), name: '代金券' },
// //       { path: '/clubCard', component: _import('clubCard/clubCard'), name: '会员卡' },
// //       { path: '/present', component: _import('present/present'), name: '赠送方案' },
// //       { path: '/project', component: _import('project/project'), name: '项目' },
// //       { path: '/project/addProject', component: _import('project/addProject'), name: '添加项目' },
// //       { path: '/project/edit/:id', component: _import('project/addProject'), name: '编辑项目' },
// //       { path: '/setMeal', component: _import('setMeal/setMeal'), name: '套餐' },
// //       { path: '/setMeal/addSetmeal', component: _import('setMeal/addSetmeal'), name: '添加套餐' },
// //       { path: '/setMeal/edit/:id', component: _import('setMeal/addSetmeal'), name: '编辑套餐' },
// //       { path: '/phone', component: _import('phone/phone'), name: '云电话' },
// //       { path: '/setting', component: _import('setting/setting'), name: '设置' },
// //       { path: '/menu', component: _import('menuManage/menu'), name: '菜单管理' }
// //     ]
// //   },
// //   { path: '*', redirect: '/home', hidden: true }
// // ]

import Vue from 'vue'
import Router from 'vue-router'
import login from '@/view/login'
import home from '@/view/home'
import setting from '@/view/Admin/setting'
import article from '@/view/Admin/article'
import comment from '@/view/Admin/comment'
import message from '@/view/Admin/message'
import userlist from '@/view/Admin/userlist'
// const login = resolve => require(['@/view/login'], resolve)
// const home = resolve => require(['@/view/home'], resolve)
// const welcome = resolve => require(['@/view/welcome/welcome'], resolve)

// const detailList = resolve => require(['@/view/purchase/detailList/detailList'], resolve)
// const chaseReturn = resolve => require(['@/view/purchase/chaseReturn/chaseReturn'], resolve)
// const chaseOrder = resolve => require(['@/view/purchase/chaseOrder/chaseOrder'], resolve)
// const putIn = resolve => require(['@/view/purchase/putIn/putIn'], resolve)
// const returnStock = resolve => require(['@/view/purchase/returnStock/returnStock'], resolve)

// const allot = resolve => require(['@/view/repertory/allot/allot'], resolve)
// const burdening = resolve => require(['@/view/repertory/burdening/burdening'], resolve)
// const editBurdening = resolve => require(['@/view/repertory/burdening/edit'], resolve)
// const checkStock = resolve => require(['@/view/repertory/checkStock/checkStock'], resolve)
// const Output = resolve => require(['@/view/repertory/Output/Output'], resolve)
// const productsOutput = resolve => require(['@/view/repertory/productsOutput/productsOutput'], resolve)
// const sureAllot = resolve => require(['@/view/repertory/sureAllot/sureAllot'], resolve)

// const express = resolve => require(['@/view/baseData/express/express'], resolve)
// const materialInfo = resolve => require(['@/view/baseData/materialInfo/materialInfo'], resolve)
// const payType = resolve => require(['@/view/baseData/payType/payType'], resolve)
// const StoreInfo = resolve => require(['@/view/baseData/StoreInfo/StoreInfo'], resolve)
// const unitSetup = resolve => require(['@/view/baseData/unitSetup/unitSetup'], resolve)

// const allotList = resolve => require(['@/view/queryData/allotList/allotList'], resolve)
// const checkList = resolve => require(['@/view/queryData/checkList/checkList'], resolve)
// const inventoryWarning = resolve => require(['@/view/queryData/inventoryWarning/inventoryWarning'], resolve)
// const OutputList = resolve => require(['@/view/queryData/OutputList/OutputList'], resolve)
// const putDetailList = resolve => require(['@/view/queryData/putDetailList/putDetailList'], resolve)
// const stockList = resolve => require(['@/view/queryData/stockList/stockList'], resolve)
// const validWarning = resolve => require(['@/view/queryData/validWarning/validWarning'], resolve)

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/login',
      component: login,
      name: 'login'
    },
    {
      path: '/',
      component: home,
      redirect: {
        name: 'home'
      }
    },
    { path: '*', redirect: '/home', hidden: true },

    {
      path: '/home',
      component: home,
      name: 'home',
      children: [
        { path: '/admin/setting', component: setting, name: 'setting' },
        { path: '/admin/article', component: article, name: 'article' },
        { path: '/admin/userlist', component: userlist, name: 'userlist' },
        { path: '/admin/comment', component: comment, name: 'comment' },
        { path: '/admin/message', component: message, name: 'message' }
        //   { path: '/', component: welcome, name: 'welcome' },

        //   { path: '/chaseOrder', component: chaseOrder, name: '采购订单' },
        //   { path: '/chaseReturn', component: chaseReturn, name: '采购退货' },
        //   { path: '/putIn', component: putIn, name: '进货入库' },
        //   { path: '/detailList', component: detailList, name: '进货入库明细表' },
        //   { path: '/returnStock', component: returnStock, name: '退货出库' },

        //   { path: '/allot', component: allot, name: '库存调拨' },
        //   { path: '/sureAllot', component: sureAllot, name: '确认调拨' },
        //   { path: '/checkStock', component: checkStock, name: '库存盘点' },
        //   { path: '/burdening', component: burdening, name: '配料' },
        //   { path: '/burdening/edit/:id', component: editBurdening, name: '配料明细' },
        //   { path: '/productsOutput', component: productsOutput, name: '销售产品出库' },
        //   { path: '/Output', component: Output, name: '出库' },

        //   { path: '/StoreInfo', component: StoreInfo, name: '仓库信息' },
        //   { path: '/unitSetup', component: unitSetup, name: '计量单位设置' },
        //   { path: '/payType', component: payType, name: '支付方式' },
        //   { path: '/materialInfo', component: materialInfo, name: '物料信息' },
        //   { path: '/express', component: express, name: '快递公司' },

        //   { path: '/inventoryWarning', component: inventoryWarning, name: '查询库存预警' },
        //   { path: '/validWarning', component: validWarning, name: '查询库存有效期预警' },
        //   { path: '/stockList', component: stockList, name: '查询库存记录' },
        //   { path: '/allotList', component: allotList, name: '查询调拨记录' },
        //   { path: '/checkList', component: checkList, name: '查询盘点记录' },
        //   { path: '/OutputList', component: OutputList, name: '查询出库记录' },
        //   { path: '/putDetailList', component: putDetailList, name: '查询出库明细记录表' }
      ]
    }
  ]
})
