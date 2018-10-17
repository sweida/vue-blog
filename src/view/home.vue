<template>
  <div>
    <headnav class="headnav"></headnav>
    <content class="content">
      <leftnav></leftnav>
      <router-view class="main scroll"/>
    </content>
  </div>
</template>

<script>

import headnav from '@/view/headnav'
import leftnav from '@/view/leftnav'
import '../style/common.scss'
import '../style/user.scss'
export default {
  name: 'app',
  components: {
    headnav,
    leftnav
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
@import "../style/table.scss";
/*退出登录菜单样式*/
.el-dialog__title{
  font-size: 16px;
}
.el-menu--horizontal .el-submenu>.el-menu{
  top:60px;
  border-radius:0;
}
.el-submenu .el-menu-item{
  min-width: 150px;
}

</style>
