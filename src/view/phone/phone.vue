<template>
  <div >
    <div class="warp">
      <div class="header_title">云电话<i class="el-icon-info"></i></div>
      <div class="main-content">
        <div class="main-head">
          <div>
            <label for="">云电话状态：</label>
            <span>正常</span>
          </div>
          <div>
            <label for="">余额</label>
            <span>9999元</span>
          </div>
          <div>
            <label for="">预警线：</label>
            <span>100</span>
          </div>
          <div>
            <label for="">呼叫费用：</label>
            <span>0.1元/分钟</span>
          </div>
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
              label="员工姓名">
            </el-table-column>
            <el-table-column
              prop="staff"
              label="职位">
            </el-table-column>
            <el-table-column
              prop="state"
              label="状态"
              >
              <template slot-scope="scope">
                {{scope.row.state?'开通':'关闭'}}
              </template>
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.state">
                </el-switch>
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
      value3:'',
      banner:'static/img/phone.png',
      tableData: [{
        date: '2016-05-02',
        name: '小甜甜',
        staff:'分店长',
        state: true,
      }, {
        date: '2016-05-02',
        name: '小甜甜',
        staff:'分店长',
        state: false,
      }, {
        date: '2016-05-02',
        name: '小甜甜',
        staff:'分店长',
        state: false,
      }, {
        date: '2016-05-02',
        name: '小甜甜',
        staff:'分店长',
        state: true,
      }]
    }
  }
}
</script>

<style scoped lang="scss">

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
}
.el-switch{
  margin:4px 0
}

</style>
