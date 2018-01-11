<template>
  <div >
    <div class="warp">
      <div class="header_title">职位权限<i class="el-icon-info"></i></div>
      <div class="main-content">
        <el-tabs v-model="activeName">
          <el-tab-pane label="职位新增" name="first" >职位新增</el-tab-pane>
          <el-tab-pane label="职位权限变更" name="second">职位权限变更</el-tab-pane>
        </el-tabs>
      </div>
      <div class="footer">
        <el-button type="primary" size="small">保　存</el-button>
      </div>
    </div>

  </div>
</template>

<script>


export default {
  name: 'app',
  data(){
    return{
      activeName: 'first',
      bed:1,
      input:'',
      banner:'static/img/phone.png',
      tableData: [{
        date: '2016-05-02',
        name: '王狮传奇南山总店',
        phone:'13798661922',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05  -04',
        name: '王狮传奇南山总店',
        phone:'13798661922',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王狮传奇南山总店',
        phone:'13798661922',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王狮传奇南山总店',
        phone:'13798661922',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>
<style>
.el-tabs__item{
  line-height: 60px;
  font-size: 16px;
}
</style>

<style scoped lang="scss">

.el-tab-pane{
  line-height: 50px;
}
.main-content{
  .main-head{
    color:#5e6d82;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 800px;
    span{
      padding-left: 10px;
      color:#99a9c0;
    }
  }
  .room_table{
    width: 800px;
  }
  .el-input{
    width: 150px;
  }
  .el-select{
    width: 100px;
  }


  .company_table{
    margin: 40px;
    width: 700px;
  }
}
.footer{
  position: absolute;
  height: 55px;
  padding:30px;
  box-sizing: border-box;
  border-top: 1px solid #f2f2f2;
  width: 100%;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

</style>
