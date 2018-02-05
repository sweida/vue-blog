<template>
  <div >
    <div class="header_title">房间</div>
    <div class="main-content scroll">
      <div class="main-head">
        <div>
          <label for="">会所名称</label>
          <span>{{organName}}</span>
        </div>
        <div>
          <label for="">房间名</label>
          <el-input v-model="roomName" placeholder="请输入房间名" size="medium"></el-input>
        </div>
        <div>
          <label for="">床位数</label>
          <el-select v-model="bedsAmount" size="medium">
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
          v-loading="loading"
          >
          <el-table-column
            label="会所">
            <template slot-scope="scope">
              <span>{{organName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="roomName"
            label="房名"
            sortable>
          </el-table-column>
          <el-table-column
            prop="bedsAmount"
            label="床位数"
            >
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <i class="el-icon-delete" @click="deleteBtn(scope.$index,scope.row)"></i>
            </template>
          </el-table-column>
        </el-table>
        <page :pageModel="pageModel" @selectList="selectRoleList" v-if="pageModel.sumCount>10"></page>
      </div>
    </div>
  </div>
</template>

<script>
import { getRoom, addRoom, delRoom } from '@/api/setting'
import page from '@/components/common/page'
export default {
  name: 'app',
  components: {
    page
  },
  data() {
    return {
      loading: false,
      organName: '王狮传奇南山总店',
      roomName: '',
      bedsAmount: '',
      pageModel: {
        page: 1,
        rows: 10,
        sumCount: 0
      },
      tableData: []
    }
  },
  methods: {
    addBtn() {
      if (this.roomName == '' || this.bedsAmount == '') {
        this.$message.error('房间名和床位数不能为空')
      } else {
        let param = {
          enterprise_id: '001',
          organId: '1',
          roomName: this.roomName,
          bedsAmount: this.bedsAmount
        }
        addRoom(param).then(res => {
          if (res.data.code == 200) {
            this.tableData.unshift(param)
            this.getRoomList()
            this.$message.success('新增成功!')
            this.roomName = ''
            this.bedsAmount = ''
          } else {
            this.$message.error('新增失败!')
          }
        })
      }
    },
    deleteBtn(index, row) {
      console.log(row)
      this.$confirm('是否删除该房间?', '提示', {
        type: 'warning'
      }).then(() => {
        delRoom(row.roomId).then(res => {
          if (res.data.code == 200) {
            this.tableData.splice(index, 1)
            this.$message.success('删除成功!')
            this.getRoomList()
          } else {
            this.$message.error('删除失败!')
          }
        })
      }).catch(() => {
      })
    },
    getRoomList() {
      this.loading = true
      getRoom(this.pageModel, {}).then(res => {
        this.loading = false
        this.tableData = res.data.data.rows
        this.pageModel.sumCount = res.data.data.total
      })
    },
    selectRoleList() {
      this.getRoomList()
    }
  },
  created() {
    this.getRoomList()
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
  .el-table{
    margin-bottom: 25px;
  }
}

</style>
