<template>
  <div >
      <div class="header_title">职位权限<i class="el-icon-info"></i></div>
      <div class="main-content scroll">
        <el-tabs v-model="activeName">
          <el-tab-pane label="职位新增" name="first" >
            <div class="head_nav">
              <div class="radio_box">
                <el-radio v-model="radio" label="1">新增职位</el-radio>
                <el-radio v-model="radio" label="2">修改职位名称</el-radio>
              </div>
              <div>
                <label for="">选择模板</label>
                <el-select v-model="muban" placeholder="请选择模板" size="medium">
                  <el-option label="销售" value="xiaoshou"></el-option>
                  <el-option label="前台" value="qiantai"></el-option>
                  <el-option label="护士" value="hushi"></el-option>
                </el-select>

              </div>
              <div>
                <label for="">职位名称</label>
                <el-input placeholder="请输入要新增的模板" size="medium"></el-input>
              </div>
            </div>
            <div class="select_box">
              <p>权限列表</p>
              <div class="select_main ">
                <div class="select_li">
                  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" class="check_title" @change="handleCheckAllChange">客户模块</el-checkbox>
                  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="customer in customers" :label="customer" :key="customer">{{customer}}</el-checkbox>
                  </el-checkbox-group>
                </div>
                <div class="select_li">
                  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" class="check_title" @change="handleCheckAllChange">工作圈模块</el-checkbox>
                  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="work in works" :label="work" :key="work">{{work}}</el-checkbox>
                  </el-checkbox-group>
                </div>
                <div class="select_li">
                  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" class="check_title" @change="handleCheckAllChange">设定模块</el-checkbox>
                  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="extend in extendli" :label="extend" :key="extend">{{extend}}</el-checkbox>
                  </el-checkbox-group>
                </div>
                <div class="select_li">
                  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" class="check_title" @change="handleCheckAllChange">设定模块</el-checkbox>
                  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="setting in settings" :label="setting" :key="setting">{{setting}}</el-checkbox>
                  </el-checkbox-group>
                </div>
                <div class="select_li">
                  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" class="check_title" @change="handleCheckAllChange">进销存模块</el-checkbox>
                  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="Invoic in Invoicing" :label="Invoic" :key="Invoic">{{Invoic}}</el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
            </div>

          </el-tab-pane>
          <el-tab-pane label="职位权限变更" name="second">职位权限变更</el-tab-pane>
        </el-tabs>
      </div>
      <div class="footer">
        <el-button type="primary" size="medium">保　存</el-button>
      </div>

  </div>
</template>

<script>

const customerli = ['客户模块权限', '项目产品记录权限', '修改金额', '客户分组权限','欠款权限','付款权限','绑定员工','蜕变影相功能','修改客户详细资料','查看客户详细资料','查询全企业客户','预约权限','开耗卡单','会员充值','开购买项目单','开购买产品单','持有记录权限'];
const workli = ['废单权限', '工作圈模块权限', '发送通知权限','查询全企业数据','查询所属会所数据','订单管理权限']
const extendli = ['推广权限']
const settings = ['企业参数设置权限','设置权限','设定职位权限','设定基本资料权限','设定模块权限']
const Invoicing = ['采购管理权限','查询所属会所产品领料单','查询全企业产品领料单','库存管理权限','基础资料权限','数据查询权限','财务报表权限','统计报表权限','查询所有仓库权限','修改库存记录权限','工资结算权限','产品领料权限','更改盘点记录权限','库存调拨权限','查询调拨记录权限','更改调拨记录权限','查询库存预警权限','查询有效期预警权限','物料报废权限','查询库存记录权限','基础资料查询权限','基础资料管理权限','采购订单权限','采购退货权限','进货入库权限','退货出库权限','库存盘点权限','配料权限','配料管理权限','查询盘点记录权限','进销存系统权限']

export default {
  name: 'app',
  data(){
    return{
      activeName: 'first',
      radio:'1',
      customers: customerli,
      works: workli,
      extendli:extendli,
      settings:settings,
      Invoicing:Invoicing,
      bed:1,
      muban:'',
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
  height: 60px;
  font-size: 16px;
}
.radio_box .el-radio__label{
  font-size: 16px;
}
.select_main .el-checkbox__label{
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
  .head_nav{
    display: flex;
    width: 850px;
    justify-content: space-between;
    align-items: center;
    .radio_box{
      font-size: 16px;
      line-height: 30px;
      height: 30px;
      border-right: 1px solid #888;
      padding-right: 30px;
    }
  }
  .select_main{
    width: 100%;
    padding: 25px 25px 0;
    background: #F7F7F7;
    border:1px solid #ebebeb;
    box-sizing: border-box;
    margin-bottom: 30px;
    .select_li{
      width: 100%;
      background: #fff;
      border:1px solid #ebebeb;
      margin-bottom: 25px;
      .check_title{
        width: 100%;
        box-sizing: border-box;
        padding: 5px 30px;
        font-weight: bold;
        border-bottom: 1px solid #ebebeb;
      }
      .el-checkbox-group{
        padding:5px 30px;
        .el-checkbox {
          margin-left: 0px;
          width: 220px;
        }
      }
    }
  }
  .el-input{
    width: 220px;
  }
  .el-select{
    width: 150px;
  }
}


</style>
