<template>
  <div >
    <div class="header_title">员工管理<i class="el-icon-info"></i></div>
    <div class="main-content scroll">
      <div class="main-head">
        <div>
          <el-input placeholder="请输入内容" v-model="inputContent" class="input-with-select">
            <el-select v-model="selectInput" slot="prepend" placeholder="请选择">
              <el-option label="姓名" value="userName"></el-option>
              <el-option label="手机号" value="mobilePhoneNum"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
          </el-input>
          <!-- <input type="text" class="search" v-model="search" v-on:keyup.enter="searchBtn">
          <i class="el-icon-search" ></i> -->
        </div>
        <el-button type="primary" size="small" @click="added">新　增</el-button>
      </div>
      <div class="main_table">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          max-height="600"
          tooltip-effect="dark"
          >
          <el-table-column
            prop="userName"
            label="员工">
          </el-table-column>
          <el-table-column
            prop="ccRole.rolename"
            label="职位">
          </el-table-column>
          <el-table-column
            prop="mobilePhoneNum"
            label="手机号"
            >
          </el-table-column>
          <el-table-column
            prop="ccOrganDetail.organName"
            label="会所"
            >
          </el-table-column>
          <el-table-column
            label="修改"
            >
            <template slot-scope="scope">
              <i class="el-icon-edit" @click="edit(scope.$index)"></i>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <i class="el-icon-delete" @click="deleteBtn(scope.$index,scope.row)"></i>
            </template>
          </el-table-column>
        </el-table>
        <page :pageModel="pageModel" @selectList="selectRoleList"></page>
      </div>
    </div>

    <el-dialog title="新增员工" :visible.sync="dialogVisible" width="1000px">
      <div class="rechargeli">
        <div class="top"></div>
        <div class="user-img">
          <img :src="img" alt="">
        </div>
        <el-form ref="form" v-model="newstaff" label-width="90px" >
          <el-form-item label="姓名">
           <el-input v-model="newstaff.userName" size="mini" ></el-input>
          </el-form-item>
          <el-form-item label="手机号">
           <el-input v-model="newstaff.mobile_phone_num" size="mini" ></el-input>
          </el-form-item>
          <el-form-item label="职位">
            <el-select v-model="newstaff.ccRole.id" placeholder="请选择职位" size="mini">
              <el-option :label="item.rolename" :value="item.id" v-for="item in jobList"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会所">
            <el-select v-model="organId" placeholder="请选择会所" size="mini">
              <el-option label="王狮传奇南山总店" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="直接添加">
            <el-radio-group v-model="newstaff.direct_add">
              <el-radio :label="1">是</el-radio>
              <!-- <el-radio :label="1">否</el-radio> -->
            </el-radio-group>
          </el-form-item>
          <el-form-item label="登录移动端">
            <el-radio-group v-model="newstaff.login_status">
              <el-radio :label="0">允许</el-radio>
              <el-radio :label="1">不允许</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getJob, getSttaf, delSttaf, addSttaf } from '../../api/login'
import page from '../../components/common/page'
export default {
  name: 'app',
  components: {
    page
  },
  data() {
    return {
      inputContent: '',
      selectInput: '',
      search: '',
      dialogVisible: false,
      img: 'static/img/phone.png',
      pageModel: {
        page: 1,
        rows: 10,
        sumCount: 0
      },
      jobList: [], // 员工职位
      tableData: [],
      organId: '',
      newstaff: {
        ccRole: {
          id: ''
        },
        userName: '',
        mobile_phone_num: '',
        direct_add: 1,
        login_status: 1
      }
    }
  },
  methods: {
    selectRoleList () {

    },
    added() {
      this.dialogVisible = true
      this.newstaff = {
        ccRole: {
          id: ''
        },
        userName: '',
        mobile_phone_num: '',
        direct_add: 1,
        login_status: 1
      }
    },
    edit(index) {
      this.dialogVisible = true
      this.newstaff = this.tableData[index]
    },
    // 删除员工
    deleteBtn(index, row) {
      this.$confirm('是否删除该员工?', '提示', {
        type: 'warning'
      }).then(() => {
        delSttaf(row.userId).then(res => {
          if (res.status == 200) {
            this.tableData.splice(index, 1)
            this.$message.success('删除成功!')
          }
        })
      }).catch(() => {
      })
    },
    // 新增员工
    confirmAdd() {
      let param = this.newstaff
      param.userId = this.newstaff.mobile_phone_num
      addSttaf(this.newstaff).then(res => {
        console.log(res)
      })
    },
    // 搜素客户
    searchBtn() {
      this.getSttafList()
    },
    // 员工列表
    getSttafList() {
      let param = {}
      param[this.selectInput] = this.inputContent
      getSttaf(this.pageModel, param).then(res => {
        console.log(res.data.data.rows)
        this.pageModel.sumCount = res.data.data.total
        this.tableData = res.data.data.rows
      })
    }
  },
  created() {
    getJob().then(res => {
      this.jobList = res.data.data
    })
    this.getSttafList()
  }
}
</script>
<style>
.main-content .el-select .el-input {
  width: 100px;
}
</style>
<style scoped lang="scss">
.main-content{
  .main-head{
    color:#5e6d82;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1000px;
    span{
      padding-left: 10px;
      color:#99a9c0;
    }
    .search{
      width: 200px;
      padding:0 38px 0 16px;
      background: #f7f7f7;
      border:0;
      outline: none;
      border-radius: 15px;
      line-height: 30px;
    }
    i{
      cursor: pointer;
      font-size: 20px;
      position: relative;
      top: 3px;
      left: -35px;
    }
  }
  .main_table{
    width: 1000px;
    i{
      cursor: pointer;
      padding:5px 0;
      font-size: 20px;
    }
  }
}

</style>
