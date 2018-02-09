<template>
  <div class="aside scroll">
    <router-link :to="item.url" tag="li" v-for="(item,index) in nav" :key="index">
      <i class="animate05 i"></i>
      <i class="el-icon-document"></i><span>{{item.name}}</span>
    </router-link>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
        navindex: 0,
        nav: [
          {name: '企业和会所', url: '/home'},
          {name: '房间', url: '/room'},
          {name: '职位权限', url: '/scope'},
          {name: '员工管理', url: '/staff'},
          {name: '优惠券', url: '/voucher'},
          {name: '会员卡', url: '/clubCard'},
          {name: '赠送方案', url: '/present'},
          {name: '项目', url: '/project'},
          {name: '套餐', url: '/setMeal'},
          {name: '云电话', url: '/phone'},
          {name: '设置', url: '/setting'},
          {name: '菜单管理', url: '/menuManage'}
        ]
      }
    },
    methods: {
    }
  }
</script>

<style scoped lang="scss">
.aside {
  background: #3a4354;
  width: 300px;
  margin-right: 20px;
  height: 100%;
  position: relative;
  box-shadow: 2px 2px 10px #b5b4b4;
  padding: 40px 0;
  box-sizing: border-box;
  overflow: auto;
  li{
    line-height: 55px;
    height: 55px;
    color: #fff;
    font-size: 16px;
    text-align: right;
    position: relative;
    cursor: pointer;
    .i{
      position: absolute;
      width: 6px;
      height:0;
      left: 0;
      top:50%;
    }
    span{
      margin-left: 20px;
      display: inline-block;
      width: 160px;
      text-align: left;
    }
  }
  li.router-link-active{
    background: #2a303c;
    .i{
      height: 100%;
      background: #59abff;
      top: 0;
    }
  }
}
</style>
