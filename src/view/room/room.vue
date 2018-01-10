<template>
  <div >
    <div class="warp">
      <div class="header">房间</div>
      <div class="main-content">
        <div class="main-head">
          <div>
            <label for="">会所名称</label>
            <span>王狮传奇南山总店</span>
          </div>
          <div>
            <label for="">房间名</label>
            <el-input v-model="input" placeholder="请输入房间名" size="small"></el-input>
          </div>
          <div>
            <label for="">床位数</label>
            <el-select v-model="bed" size="small">
              <el-option
                v-for="item in 10"
                :key="item.value"
                :label="item.index"
                :value="item.index">
              </el-option>
            </el-select>
          </div>
          <el-button type="primary" size="small">新　增</el-button>
        </div>
        <div class="room_table">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            max-height="600"
            tooltip-effect="dark"
            >
            <el-table-column
              prop="name"
              label="会所">
            </el-table-column>
            <el-table-column
              prop="room"
              label="房名">
            </el-table-column>
            <el-table-column
              prop="bed"
              label="床位数"
              >
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <i class="el-icon-delete"></i>
                <!-- <el-button size="mini" type="warning" @click="edit(scope.$index)">修改</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

  </div>
</template>

<script>


export default {
  name: 'app',
  data(){
    return{
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

<style scoped lang="scss">
.warp{
    background: #fff;
    min-height: 100%;
    position: relative;
}
.header{
  padding: 0 20px;
  background: #f7f7f7;
  font-weight: bold;
  display: flex;
  box-sizing: border-box;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  i{
    color: #3bb3ff;
    font-size: 20px;
  }
}
.main-content{
  padding:0 30px;
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
  .phone_bg{
    width: 400px;
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
.el-icon-delete{
  cursor: pointer;
  padding:5px 0;
  font-size: 20px;
}
</style>
