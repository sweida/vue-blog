<template>
  <div >
      <div class="header_title">项目<i class="el-icon-info"></i></div>
      <div class="main-content scroll">
        <div class="left_tree scroll">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="right_main">
          <div class="main-head">
            <div>
              <input type="text" class="search" v-model="search" v-on:keyup.enter="searchBtn">
              <i class="el-icon-search" @click="searchBtn"></i>
            </div>
            <el-button type="primary"  size="small" @click="addBtn">新　增</el-button>
          </div>
          <div class="main_table">
            <el-table
              :data="projectList"
              stripe
              style="width: 100%"
              max-height="600"
              tooltip-effect="dark"
              >
              <el-table-column
                prop="projectName"
                label="名称"
                width="250px">
              </el-table-column>
              <el-table-column
                prop="projectPrice"
                label="价格"
                width="150px">
                <template slot-scope="scope">
                  <span>￥{{scope.row.projectPrice}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="修改">
                <template slot-scope="scope">
                  <i class="el-icon-edit" @click="editBtn(scope.$index, scope.row)"></i>
                </template>
              </el-table-column>
              <el-table-column
                label="删除">
                <template slot-scope="scope">
                  <i class="el-icon-delete" @click="deleteBtn(scope.$index, scope.row)"></i>
                </template>
              </el-table-column>
            </el-table>
            <page :pageModel="pageModel" @selectList="selectRoleList" v-if="pageModel.sumCount>10"></page>
          </div>
        </div>

      </div>

      <el-dialog title="新增代金券" :visible.sync="voucherDialog" width="1000px">
        <div class="form_box">
          <h4>选择</h4>
          <el-form ref="form" :model="form" label-width="120px" label-position='left'>
            <el-form-item label="类型">
              <el-radio-group v-model="form.type">
                <el-radio :label="1">代金券</el-radio>
                <el-radio :label="2">现金券</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否专项">
              <el-radio-group v-model="form.exclusive">
                <el-radio :label="1">通用</el-radio>
                <el-radio :label="2">专项</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
        <div class="form_box">
          <h4>设置</h4>
          <el-form ref="form" :model="form" label-width="120px" label-position='left'>
            <el-form-item label="额度（元）">
              <el-input size="medium" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="数量（张）">
              <el-input size="medium" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="有效期（天）">
              <el-input size="medium" v-model="form.desc"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="voucherDialog = false" size="small">取 消</el-button>
          <el-button type="primary" @click="voucherDialog = false" size="small">确 定</el-button>
        </span>
      </el-dialog>

  </div>
</template>

<script>
import { addproject, getproject, delProject } from '@/api/product'
import page from '@/components/common/page'
import { clone } from '@/utils/common'
export default {
  name: 'app',
  data() {
    return {
      search: '',
      bed: 1,
      input: '',
      voucherDialog: false,
      projectList: [],
      form: {
        type: 1,
        exclusive: 1,
        region: '',
        desc: ''
      },
      pageModel: {
        page: 1,
        rows: 10,
        sumCount: 0
      }
    }
  },
  created() {
    this.getprojectList()
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    //搜素客户
    searchBtn() {
      console.log('搜索')
    },
    addBtn() {
      this.$router.push('project/addProject')
    },
    // 删除项目
    deleteBtn(index, row) {
      console.log(row)
      this.$confirm('是否删除该项目?', '提示', {
        type: 'warning'
      }).then(() => {
        delProject(row.id).then(res => {
          if (res.data.code == 200) {
            console.log(res)
            this.projectList.splice(index, 1)
            this.$message.success(res.data.msg)
            this.getprojectList()
          } else {
            this.$message.error('删除失败!')
          }
        })
      }).catch(() => {
      })
    },
    // 编辑项目
    editBtn(index, row) {
      console.log(row.id)
      this.$router.push('project/edit/' + row.id)
    },
    getprojectList() {
      getproject(this.pageModel, {}).then(res => {
        console.log('获取项目列表', res)
        this.pageModel.sumCount = res.data.data.total
        this.projectList = res.data.data.rows
      })
    },
    selectRoleList() {
      this.getproject()
    }
  }
}
</script>

<style scoped lang="scss">
.main-content{
  padding:0;
  display: flex;
  .left_tree{
    width: 160px;
    height: 100%;
    border-right: 4px solid #F3F8FF;
    .el-menu{
      border-right: 0;
    }
  }
  .right_main{
    padding: 0 30px;
    width: 700px;
    .main-head{
      color:#5e6d82;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
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
  }
}
.form_box{
  display: flex;
  width: 500px;
  margin: 30px auto;
  h4{
    width: 100px;
    font-size: 16px;
    padding-top: 8px;
  }
  .el-form{
    width: 350px;
    .el-radio{
      color:#1F2D3D;
    }
    .el-cascader {
      width: 230px;
    }
  }

}
.main_table{
  margin-bottom: 20px;
}

</style>
