<template>
  <div >
      <div class="header_title">代金券<i class="el-icon-info"></i></div>
      <div class="main-content scroll">
        <div class="left_tree scroll">
          <el-menu
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            @select="handleSelect">
            <template v-for="(item, index) in menuList.childMenu" :keys="index">
              <el-menu-item :index="item.url" v-if="item.childMenu==null || item.childMenu==''" @click="changeMenu(item)">
                <template slot="title">
                  <span class="title">{{item.name}}</span>
                  <em class="navicon" v-if="item.url==openindex">
                    <i class="el-icon-plus" @click="plusNav(item)"></i>
                  </em>
                </template>
              </el-menu-item>
              <el-submenu :index="item.url" v-else>
                <template slot="title" >
                  <div @click="changeMenu(item)">
                    <span class="title">{{item.name}}</span>
                    <em class="navicon" v-if="item.url==openindex">
                      <i class="el-icon-plus" @click="plusNav(item)"></i>
                    </em>
                  </div>
                </template>
                <template v-for="(child, index1) in item.childMenu" :keys="index1">
                  <el-menu-item :index="child.url" @click="changeMenu(child)" v-if="child.childMenu==null || child.childMenu==''">
                    <template slot="title">
                      <span>{{child.name}}</span>
                      <em class="navicon" v-if="child.url==openindex">
                        <i class="el-icon-edit" @click="editNav(child, child.name)"></i>
                        <i class="el-icon-minus" @click="minusNav(child)"></i>
                      </em>
                    </template>
                  </el-menu-item>
                </template>
              </el-submenu>
            </template>
          </el-menu>
        </div>
        <div class="right_main">
          <div class="main-head">
            <div>
              <input type="text" class="search" v-model="voucherParam.coupName" v-on:keyup.enter="searchBtn" placeholder="请输入代金券名称">
              <i class="el-icon-search" @click="searchBtn"></i>
            </div>
            <el-button type="primary" size="small" @click="addBtn">新　增</el-button>
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
                prop="name"
                label="编号"
                width="150px">
              </el-table-column>
              <el-table-column
                prop="post"
                label="类型">
              </el-table-column>
              <el-table-column
                prop="coupName"
                label="名称"
                >
              </el-table-column>
              <el-table-column
                prop="coupPrice"
                label="价格"
                >
              </el-table-column>
              <el-table-column
                prop="coupQuota"
                label="代金券额度"
                >
              </el-table-column>
              <el-table-column
                prop="coupValidfate"
                label="有效期(天)"
                >
              </el-table-column>
              <el-table-column
                prop="coupNum"
                label="总数量"
                >
              </el-table-column>
              <el-table-column
                label="修改"
                >
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
              <el-table-column
                label="打印">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini">打印</el-button>
                </template>
              </el-table-column>
            </el-table>
            <page :pageModel="pageModel" @selectList="selectRoleList"></page>
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
            <el-form-item label="名称" v-if="form.exclusive==2">
              <el-cascader
                placeholder="可搜索名称"
                @change="handleItemChange"
                change-on-select
                :options="options"
                :props="defaultProps"
                :clearable="true"
                filterable>
              </el-cascader>
            </el-form-item>
            <el-form-item label="" v-if="form.exclusive==2">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in optionsDetail"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="form_box">
          <h4>设置</h4>
          <el-form ref="form" :model="form" label-width="120px" label-position='left'>
            <el-form-item label="额度（元）">
              <el-input size="medium" v-model="form.coupQuota"></el-input>
            </el-form-item>
            <el-form-item label="数量（张）">
              <el-input size="medium" v-model="form.coupNum"></el-input>
            </el-form-item>
            <el-form-item label="有效期（天）">
              <el-input size="medium" v-model="form.coupValidfate"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="voucherDialog = false" size="small">取 消</el-button>
          <el-button type="primary" @click="addvoucherBtn" size="small" v-if="form.coupId==''">确 定</el-button>
          <el-button type="primary" @click="editvoucherBtn" size="small" v-else>保存修改</el-button>
        </span>
      </el-dialog>

  </div>
</template>

<script>
import { getVoucher, addVoucher, editVoucher, delVoucher, VoucherDetail } from '@/api/product'
import { vouMenu, delMenu, editMenu, addMenu } from '@/api/tree'
import { clone } from '@/utils/common'
import page from '../../components/common/page'
export default {
  name: 'voucher',
  components: {
    page
  },
  data() {
    return {
      optionsDetail: [],
      value: '',
      pageModel: {
        page: 1,
        rows: 10,
        sumCount: 0
      },
      openindex: '',      // 点击菜单显示操作按钮
      voucherParam: {},   //代金券参数
      menuList: [],
      bed: 1,
      input: '',
      voucherDialog: false,
      banner: 'static/img/phone.png',
      MenuParam: {},
      form: {
        type: 1,
        exclusive: 1,
        arrId: '',
        coupId: '',
        // coupName: '',      // 名称
        coupNum: '',       // 数量
        coupPrice: '500',  // 项目价格
        coupQuota: '',
        coupType: 0,
        coupValidfate: '',   // 有效天
        parentId: 18,
        topParent: 0
      },
      tableData: [],
      options: [],
      defaultProps: {
        children: 'childMenu',
        value: 'id',
        label: 'name'
      }

    }
  },
  created() {
    this.getvouMenu()
    // this.getVoucherList()
    // this.addOptionMenu()
  },
  methods: {
    // 获取优惠券菜单
    getvouMenu() {
      vouMenu().then(res => {
        if (res.data.code == 200) {
          this.menuList = res.data.data[0]
          console.log('获取优惠券菜单', res)
        }
      })
    },
    // 新增菜单
    plusNav(item) {
      event.stopPropagation()
      this.$prompt('请输入新增的类目名称', '提示', {
      }).then(({ value }) => {
        console.log(value)
        let param = {
          icon: '',
          name: value,
          parentId: item.id
        }
        addMenu(param).then(res => {
          console.log('添加菜单', res)
          if (res.data.code == 200) {
            this.getvouMenu()
            this.$message.success('新增菜单成功!')
          } else {
            this.$message.error('新增菜单失败!')
          }
        })
        this.$message.success('新增类目成功')
      }).catch(() => {
      })
    },
    // 删除菜单
    minusNav(item) {
      event.stopPropagation()
      console.log(item.id)
      this.$confirm('是否删除该类目?', '提示', {
        type: 'warning'
      }).then(() => {
        delMenu(item.id).then(res => {
          console.log('删除菜单', res)
          if (res.data.code == 200) {
            this.getvouMenu()
            this.$message.success(res.data.msg)
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }).catch(() => {
      })
    },
    // 修改菜单
    editNav(item, name) {
      console.log(item, name)
      event.stopPropagation()
      this.$prompt('请输入修改的类目名称', '提示', {
        inputValue: name
      }).then(({ value }) => {
        editMenu(item.id, value).then(res => {
          console.log('修改菜单', res)
          if (res.data.code == 200) {
            this.getvouMenu()
            this.$message.success('修改菜单成功!')
          } else {
            this.$message.error('修改菜单失败!')
          }
        })
        this.$message.success('新增类目成功')
      }).catch(() => {
      })
    },
    handleSelect(key, keyPath) {
      this.openindex = key
      console.log('handleSelect', key, keyPath)
    },
    handleOpen(key, keyPath) {
      this.openindex = key
      console.log('handleOpen', key, keyPath)
    },
    handleClose(key, keyPath) {
      this.openindex = ''
      console.log('handleOpen', key, keyPath)
    },
    // 改变菜单时得到代金券数据
    changeMenu(child) {
      console.log('changeMenu', child)
      this.MenuParam = {
        parentId: child.id
      }
      this.getVoucherList()
    },
    // 获取代金券数据
    getVoucherList() {
      getVoucher(this.pageModel, this.MenuParam).then(res => {
        if (res.data.code == 200) {
          this.pageModel.sumCount = res.data.data.total
          this.tableData = res.data.data.rows
          console.log('获取代金券列表', res.data.data)
        }
      })
    },
    // 新增按钮
    addBtn() {
      this.voucherDialog = true
    },
    //搜素客户
    searchBtn() {
      console.log('搜索')
      // this.getVoucherList()
    },
    // 保存新增
    addvoucherBtn() {
      let param = Object.assign({
        enterpriseId: '001',
        coupName: '代金券',
        organId: 1
        // coupType: 0
      }, this.form)
      addVoucher(param).then(res => {
        console.log('添加项目', res)
        if (res.data.code == 200) {
          this.$message.success('新增成功!')
          this.voucherDialog = false
        } else {
          this.$message.error('新增失败!')
        }
      })
    },
    // 删除项目
    deleteBtn(index, row) {
      console.log(row)
      this.$confirm('是否删除该项目?', '提示', {
        type: 'warning'
      }).then(() => {
        delVoucher(row.coupId).then(res => {
          if (res.data.code == 200) {
            console.log(res)
            this.tableData.splice(index, 1)
            this.$message.success(res.data.msg)
            this.getVoucherList()
          } else {
            this.$message.error('删除失败!')
          }
        })
      }).catch(() => {
      })
    },
    // 编辑代金券
    editBtn(index, row) {
      this.voucherDialog = true
      VoucherDetail(row.coupId).then(res => {
        console.log('获取代金券详情', res.data)
        this.form = res.data.data
      })
    },
    // 保存编辑代金券
    editvoucherBtn() {
      editVoucher(this.form).then(res => {
        console.log('保存修改', res)
        if (res.data.code == 200) {
          this.voucherDialog = false
          this.$message.success('修改成功!')
        } else {
          this.$message.error('修改失败!')
        }
      })
    },
    // 添加时获取名称
    handleItemChange(val) {
    },
    selectRoleList () {
      this.getVoucherList()
    }
  },
  // 过滤器
  filters: {
    filterVoucher(value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/project.scss";
.main-content .right_main{
  flex:1;
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

</style>
