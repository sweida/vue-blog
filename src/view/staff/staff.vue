<template>
<div>
  <div class="header_title">员工管理<i class="el-icon-info"></i></div>
  <div class="main-content scroll">
    <div class="main-head">
      <div>
        <el-input placeholder="请输入搜索内容" v-model="inputContent" class="input-with-select" @keyup.enter.native="searchBtn" :clearable="true">
          <el-select v-model="selectInput" slot="prepend" placeholder="请选择">
            <el-option label="姓名" value="userName"></el-option>
            <el-option label="手机号" value="mobilePhoneNum"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
        </el-input>
      </div>
      <!-- <el-button style='margin-bottom:20px;' type="primary" size="small" @click="handleDownload" :loading="isLoading">导出excel</el-button> -->
      <el-button type="primary" size="small" @click="added">新　增</el-button>
    </div>
    <div class="main_table">
      <el-table :data="tableData" stripe style="width: 100%" max-height="600" tooltip-effect="dark" v-loading="loading">
        <el-table-column prop="userName" label="员工" sortable>
        </el-table-column>
        <el-table-column prop="ccRole.rolename" label="职位" sortable>
        </el-table-column>
        <el-table-column prop="mobilePhoneNum" label="手机号">
        </el-table-column>
        <el-table-column prop="ccOrganDetail.organName" label="机构">
        </el-table-column>
        <el-table-column label="修改">
          <template slot-scope="scope">
              <i class="el-icon-edit" @click="editBtn(scope.row)"></i>
            </template>
        </el-table-column>
        <el-table-column label="删除">
          <template slot-scope="scope">
              <i class="el-icon-delete" @click="deleteBtn(scope.$index,scope.row)"></i>
            </template>
        </el-table-column>
      </el-table>
      <page :pageModel="pageModel" @selectList="selectRoleList" v-if="pageModel.sumCount>10"></page>
    </div>
  </div>

  <el-dialog title="新增员工" :visible.sync="dialogVisible" width="1000px">
    <div class="rechargeli">
      <div class="top"></div>
      <div class="user-img">
        <img :src="img" alt="">
      </div>
      <el-form :rules="rules" ref="ruleForm" :model="newstaff" label-width="90px">
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="newstaff.userName" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobilePhoneNum">
          <el-input v-model="newstaff.mobilePhoneNum" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="ccRole.id">
          <el-select v-model="newstaff.ccRole.id" placeholder="请选择职位" size="mini">
            <template v-for="(item,index) in jobList">
                <el-option :label="item.rolename" :value="item.id"></el-option>
              </template>
          </el-select>
        </el-form-item>
        <el-form-item label="登录移动端">
          <el-radio-group v-model="newstaff.loginStatus">
            <el-radio :label="'0'">允许</el-radio>
            <el-radio :label="'1'">不允许</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmAdd" size="small" v-if="!newstaff.userId">确 定</el-button>
        <el-button type="primary" @click="confirmEdit" size="small" v-else>保存修改</el-button>
      </span>
  </el-dialog>
</div>
</template>
<script>
import mixinExportTable from '@/utils/mixinExportTable'
import {
  getJob,
  getSttaf,
  delSttaf,
  addSttaf,
  editSttaf
} from '@/api/setting'
import page from '@/components/common/page'
export default {
  name: 'app',
  mixins: [mixinExportTable],
  components: {
    page
  },
  data() {
    return {
      loading: false,
      inputContent: '',
      selectInput: 'userName',
      search: '',
      dialogVisible: false,
      img: 'static/img/staff.jpg',
      pageModel: {
        page: 1,
        rows: 10,
        sumCount: 0
      },
      jobList: [], // 员工职位
      headerList: [],
      filterList: ['userName', 'mobilePhoneNum'],
      tableData: [],
      newstaff: {
        ccRole: {
          id: ''
        },
        userName: '',
        mobilePhoneNum: '',
        direct_add: 1,
        loginStatus: '0'
      },
      rules: {
        userName: [{
          required: true,
          message: '请输入姓名',
          trigger: 'change'
        }],
        mobilePhoneNum: [{
            required: true,
            message: '请输入手机号',
            trigger: 'change'
          },
          {
            pattern: /^1(3|4|5|7|8)\d{9}$/,
            message: '请输入正确的手机号',
            trigger: 'change'
          }
        ],
        'ccRole.id': [{
          required: true,
          message: '请选择职位',
          trigger: 'change'
        }]
      }
    }
  },
  watch: {
    inputContent() {
      if (this.inputContent == '') {
        this.getSttafList()
      }
    }
  },
  methods: {
    selectRoleList() {
      this.getSttafList()
    },
    // 获取职位
    getJoblist() {
      getJob().then(res => {
        this.jobList = res.data.data
      })
    },
    added() {
      this.getJoblist()
      this.dialogVisible = true
      this.newstaff = {
        ccRole: {
          id: ''
        },
        userId: '',
        userName: '',
        mobilePhoneNum: '',
        direct_add: 1,
        loginStatus: '0'
      }
    },
    // 新增员工
    confirmAdd() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          addSttaf(this.newstaff).then(res => {
            if (res.data.code == 200) {
              this.getSttafList()
              this.$message.success(res.data.msg)
              this.dialogVisible = false
            } else {
              this.$message.error(res.data.msg)
            }
          })
        }
      })
    },
    // 删除员工
    deleteBtn(index, row) {
      this.$confirm('是否删除该员工?', '提示', {
        type: 'warning'
      }).then(() => {
        delSttaf(row.userId).then(res => {
          if (res.status == 200) {
            this.getSttafList()
            this.$message.success('删除成功!')
          }
        })
      }).catch(() => {})
    },
    // 编辑按钮
    editBtn(row) {
      this.dialogVisible = true
      this.newstaff = row
      this.getJoblist()
    },
    // 保存编辑
    confirmEdit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          editSttaf(this.newstaff).then(res => {
            if (res.data.code == 200) {
              this.getSttafList()
              this.$message.success(res.data.msg)
              this.dialogVisible = false
            } else {
              this.$message.error(res.data.msg)
            }
          })
        }
      })
    },
    // 搜素客户
    searchBtn() {
      this.getSttafList()
    },
    // 员工列表
    getSttafList() {
      this.loading = true
      let param = {}
      param[this.selectInput] = this.inputContent
      getSttaf(this.pageModel, param).then(res => {
        this.loading = false
        this.pageModel.sumCount = res.data.data.total
        this.tableData = res.data.data.rows
      })
    }
  },
  created() {
    this.getSttafList()
  }
}
</script>

<style scoped lang="scss">
.main-content {
    .main-head {
        color: #5e6d82;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 1000px;
        span {
            padding-left: 10px;
            color: #99a9c0;
        }
        .search {
            width: 200px;
            padding: 0 38px 0 16px;
            background: #f7f7f7;
            border: 0;
            outline: none;
            border-radius: 15px;
            line-height: 30px;
        }
        i {
            cursor: pointer;
            font-size: 20px;
            position: relative;
            top: 3px;
            left: -35px;
        }
    }
    .main_table {
        width: 1000px;
        i {
            cursor: pointer;
            padding: 5px 0;
            font-size: 20px;
        }
    }
    .el-table {
        margin-bottom: 25px;
    }
}
.input-with-select .el-select {
    width: 100px;
}
</style>
