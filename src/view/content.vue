<template>
  <div >
    <div class="warp">
      <div class="header_title">企业和会所<i class="el-icon-info"></i></div>
      <div class="main-content">
        <div class="phone_bg">
          <img :src="banner" alt="">
        </div>
        <div class="text_li">
          <li>企业图片设置（手机端）</li>
          <li>企业信息修改</li>
          <div class="text_main">
            <p>企业编号</p>
            <input type="text">
            <p>企业名称</p>
            <input type="text">
          </div>

          <li>企业文化修改（平板端）</li>
        </div>
        <div class="company_table">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            max-height="400"
            tooltip-effect="dark"
            >
            <el-table-column
              prop="name"
              label="会所">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="电话">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              width="250px">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <i class="el-icon-edit"></i>
                <!-- <el-button size="mini" type="warning" @click="edit(scope.$index)">修改</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
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
      banner:'static/img/phone.png',
      tableData: [{
        date: '2016-05-02',
        name: '王狮传奇南山总店',
        phone:'13798661922',
        address: '深圳市南山区南头街道玉泉路麒麟花园A区12栋二楼202、203、204商铺'
      }]
    }
  }
}
</script>

<style scoped lang="scss">

.main-content{
  display: flex;
  justify-content: space-around;
  align-items: center;
  // padding: 0 40px;

  height: 750px;
  .phone_bg{
    width: 380px;
    height: 600px;
    background: url(/static/img/phone_bg.png) no-repeat center top;
    text-align: center;
    img{
      margin-top: 60px;
      height: 425px;
      width: 230px;
    }
  }
  .text_li{
    padding-right: 50px;
    border-right: 1px solid #ddd;
    li{
      color: #3cb4ff;
      font-size: 18px;
      border-left: 3px solid #3cb4ff;
      padding-left: 10px;
      margin: 30px 0;
      line-height: 18px;
    }
    .text_main{
      padding-left: 15px;
      color: #666;
    }
    input{
      color: #666;
      border: 0;
      border-bottom: 1px solid #ddd;
      outline: none;
      line-height: 30px;
      margin: 5px 0 10px;
    }
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
.el-icon-edit{
  cursor: pointer;
  padding:5px 0;
  font-size: 20px;
}
</style>
