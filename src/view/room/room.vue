<template>
  <div >
      <div class="header_title">房间</div>
      <div class="main-content">
        <div class="main-head">
          <div>
            <label for="">会所名称</label>
            <span>王狮传奇南山总店</span>
          </div>
          <div>
            <label for="">房间名</label>
            <el-input v-model="room" placeholder="请输入房间名" size="medium"></el-input>
          </div>
          <div>
            <label for="">床位数</label>
            <el-select v-model="bed" size="medium">
              <el-option
                v-for="item in 10"
                :key="item.value"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
          <el-button type="primary" size="medium" @click="addBtn">新　增</el-button>
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
                <i class="el-icon-delete" @click="deleteBtn(scope.$index)"></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>


  </div>
</template>

<script>


export default {
  name: 'app',
  data(){
    return{
      room:'',
      bed:1,
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
  },
  methods:{
    addBtn(){
      this.$message.success('新增成功')
    },
    deleteBtn(index){
      this.$confirm('是否删除该员工?', '提示', {
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index,1)
        this.$message.success('删除成功!')
      }).catch(() => {
      });
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
  .el-input{
    width: 150px;
  }
  .el-select{
    width: 100px;
  }
}
</style>
