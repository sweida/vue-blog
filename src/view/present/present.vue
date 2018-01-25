<template>
  <div >
      <div class="header_title">赠送方案<i class="el-icon-info"></i></div>
      <div class="main-content scroll">
        <div class="left_tree scroll">
          <p class="nav-title" @click="navtitle">
            <span>{{menuList.name}}</span>
            <em class="navicon" v-if="openindex==menuList.url">
              <i class="el-icon-plus" @click="plusNav(menuList)"></i>
              <i class="el-icon-edit" @click="editNav(menuList, menuList.name)"></i>
            </em>
          </p>
          <el-menu
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            @select="handleSelect">
            <template v-for="(item, index) in menuList.childMenu" :keys="index">
              <el-menu-item :index="item.url" v-if="item.childMenu==null" @click="changeMenu(item)">
                <template slot="title">
                  <span>{{item.name}}</span>
                  <em class="navicon" v-if="item.url==openindex">
                    <i class="el-icon-plus" @click="plusNav(item)"></i>
                    <i class="el-icon-edit" @click="editNav(item, item.name)"></i>
                    <i class="el-icon-minus" @click="minusNav(item)"></i>
                  </em>
                </template>
              </el-menu-item>
              <el-submenu :index="item.url"  v-else>
                <template slot="title" >
                  <div @click="changeMenu(item)">
                    <span >{{item.name}}</span>
                    <em class="navicon" v-if="item.url==openindex">
                      <i class="el-icon-plus" @click="plusNav(item)"></i>
                      <i class="el-icon-edit" @click="editNav(item, item.name)"></i>
                      <i class="el-icon-minus" @click="minusNav(item)"></i>
                    </em>
                  </div>
                </template>
                <template v-for="(child, index1) in item.childMenu" :keys="index1">
                  <el-menu-item :index="child.url" @click="changeMenu(child)">
                    <span>{{child.name}}</span>
                    <em class="navicon" v-if="child.url==openindex">
                      <i class="el-icon-edit" @click="editNav(child, child.name)"></i>
                      <i class="el-icon-minus" @click="minusNav(child)"></i>
                    </em>
                  </el-menu-item>
                </template>
              </el-submenu>
            </template>
          </el-menu>
        </div>
        <div class="right_main">
          <div class="main-head">
            <div>
              <input type="text" class="search" v-model="search" v-on:keyup.enter="searchBtn">
              <i class="el-icon-search" @click="searchBtn"></i>
            </div>
            <el-button type="primary"  size="small" @click="added">新　增</el-button>
          </div>
          <div class="main_table">
            <el-table
              :data="givePlanli"
              stripe
              style="width: 100%"
              max-height="600"
              tooltip-effect="dark"
              >
              <el-table-column
                prop="givePlanName"
                label="名称"
                width="300px"
                >
                <!-- <template slot-scope="scope" >
                  <span v-if="editBtn">{{scope.row.givePlanName}} <i class="el-icon-edit" @click="editTitle(scope.$index)"></i></span>
                  <template v-else>
                    <el-input v-model="scope.row.givePlanName" size="mini" class="text_edit"></el-input>
                    <el-button type="primary" size="mini">确定</el-button>
                    <el-button size="mini" @click="editClose">取消</el-button>
                  </template>
                </template> -->
              </el-table-column>
              <el-table-column
                prop="createDate"
                label="生效日期"
                width="150px">
              </el-table-column>
              <el-table-column
                prop="effectiveDate"
                label="使用截止日期"
                width="150px">
              </el-table-column>
              <el-table-column
                label="修改详情">
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

      <el-dialog :visible.sync="presentDialog" title="添加赠送方案" width="1150px" class="burbox">
        <div class="tableDialog">
          <div class="tabs">
            <p>所有配料</p>
          </div>
          <div class="burli1">
            <el-table
              :data="materials_arr"
              stripe
              style="width:100%"
              max-height='450'
              tooltip-effect="dark"
              >
              <el-table-column
                prop="name"
                label="名称"
                >
              </el-table-column>
              <el-table-column
                prop="price"
                label="价值">
              </el-table-column>
              <el-table-column
              type="selection"
              width="80">
              </el-table-column>
            </el-table>
          </div>
          <!-- 默认配料 -->
          <div class="burli3">
            <el-table
              :data="materials_data"
              stripe
              style="width: 100%;margin-bottom:20px;"
              max-height='300'
              tooltip-effect="dark"
            >
              <el-table-column
                prop="givePlanType"
                label="类型"
                >
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称"
                >
              </el-table-column>
              <el-table-column
                prop="price"
                label="价值"
                >
              </el-table-column>
              <el-table-column
                prop="number"
                label="数量">
                <template slot-scope="scope" >
                  <el-input-number v-model="scope.row.number"  :min="1"></el-input-number>
                </template>
              </el-table-column>
            </el-table>

            <h4>设置</h4>
            <el-form ref="form" v-model="form" label-width="120px" label-position='left'>
              <el-form-item label="赠送方案名称">
                <el-input size="medium" v-model="form.givePlanName" placeholder="填写赠送方案名称"></el-input>
              </el-form-item>
              <el-form-item label="所属类目">
                <!-- <el-cascader
                  :options="menuList"
                  v-model="selectedOptions"
                  @change="handleChange">
                </el-cascader> -->
                <el-cascader
                  placeholder="请选择类目名称"
                  @change="handleItemChange"
                  v-model="selectedOptions"
                  change-on-select
                  :options="menuList.childMenu"
                  :props="defaultProps"
                  :clearable="true">
                </el-cascader>
              </el-form-item>
              <el-form-item label="生效日期" >
                <el-date-picker type="date" placeholder="选择生效日期" v-model="form.createDate" size="medium" :editable="false"></el-date-picker>
              </el-form-item>
              <el-form-item label="使用截止日期" >
                <el-date-picker type="date" placeholder="选择使用截止日期" v-model="form.effectiveDate" size="medium" :editable="false"></el-date-picker>
              </el-form-item>
            </el-form>

          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="presentDialog = false" size="small">取 消</el-button>
          <el-button type="primary" @click="savePlanBtn" size="small" v-if="!form.givePlanId">保 存</el-button>
          <el-button type="primary" @click="editPlanBtn" size="small" v-else>保存修改</el-button>
        </span>
      </el-dialog>

  </div>
</template>

<script>
import { giveNav, delMenu, editMenu, addgiveNav, addgivePlan, getgivePlan, delgivePlan, editgivePlan, givePlanDetail } from '@/api/product'
import page from '@/components/common/page'
import { parseTime, clone } from '@/utils/common'
export default {
  name: 'app',
  components: {
    page
  },
  data() {
    return {
      openindex: '',
      menuList: [],
      givePlanli: [], //  赠送列表
      givePlanParam: {},    // 赠送参数
      search: '',
      presentDialog: false,
      materials_arr: [],    // 配料
      materials_data: [],
      form: '',
      formInfo: '',
      options: [],
      selectedOptions: [],
      aa: '22',
      defaultProps: {
        children: 'childMenu',
        value: 'id',
        label: 'name'
      },
      pageModel: {
        page: 1,
        rows: 10,
        sumCount: 0
      }
    }
  },
  created() {
    // this.getgivePlanList()
    this.getgiveNav()
  },
  methods: {
    // 获取赠送菜单
    getgiveNav() {
      giveNav().then(res => {
        if (res.data.code == 200) {
          this.menuList = res.data.data[0]
        }
        console.log('获取赠送菜单', res, this.menuList)
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
        addgiveNav(param).then(res => {
          console.log('添加菜单', res)
          if (res.data.code == 200) {
            this.getgiveNav()
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
            this.getgiveNav()
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
            this.getgiveNav()
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
    handleOpen2(item) {
      console.log('handleOpen2', item)
    },
    handleClose(key, keyPath) {
      this.openindex = ''
      console.log('handleOpen', key, keyPath)
    },
    navtitle() {
      this.openindex = this.menuList.url
      console.log(this.openindex)
    },
    // 改变菜单时得到代金券数据
    changeMenu(child) {
      console.log('changeMenu', child.id)
      this.givePlanParam = {
        parentId: child.id
      }
      this.getgivePlanList()
    },
    // 获取赠送列表
    getgivePlanList() {
      getgivePlan(this.pageModel, this.givePlanParam).then(res => {
        console.log('获取赠送列表', res)
        this.givePlanli = res.data.data.rows
        this.pageModel.sumCount = res.data.data.total
        this.givePlanli.forEach(item => {
          item.createDate = parseTime(item.createDate, '{y}-{m}-{d}')
          item.effectiveDate = parseTime(item.effectiveDate, '{y}-{m}-{d}')
        })
      })
    },
    // 删除赠送
    deleteBtn(index, row) {
      console.log(row)
      this.$confirm('是否删除该赠送方案?', '提示', {
        type: 'warning'
      }).then(() => {
        delgivePlan(row.givePlanId).then(res => {
          if (res.data.code == 200) {
            console.log(res)
            this.givePlanli.splice(index, 1)
            this.$message.success(res.data.msg)
            this.getgivePlanList()
          } else {
            this.$message.error('删除失败!')
          }
        })
      }).catch(() => {
      })
    },
    // 打开弹框
    added() {
      this.form = {
        givePlanName: '',
        createDate: '',
        effectiveDate: '',
        parentId: ''
      }
      this.selectedOptions = []
      this.presentDialog = true
      console.log('form', this.form)
    },
    // 选择菜单获取id
    handleItemChange(val) {
      this.form.takeMode = val.join(',')
      this.form.parentId = val[val.length - 1]
      console.log('点击', val, val[val.length - 1], this.form.takeMode)
    },
    // 保存添加赠送
    savePlanBtn() {
      if (this.form.givePlanName == '') {
        this.$message.error('赠送方案名称不能为空')
      } else if (this.form.effectiveDate < this.form.createDate || this.form.createDate == '' || this.form.createDate == null) {
        this.$message.error('日期有误，请重新选择日期')
      } else {
        let param = Object.assign({
          enterpriseId: '001',
          ccGivePlanSubtabulationList: [
            {
              giveId: '',
              givePlanId: '',
              givePlanSubtabulationId: '',
              givePlanType: '',
              name: '',
              number: 0,
              price: 0
            }
          ]
        }, this.form)
        addgivePlan(param).then(res => {
          console.log('添加赠送', res)
          if (res.data.code == 200) {
            this.presentDialog = false
            this.getgivePlanList()
            this.$message.success('新增赠送方案成功!')
          } else {
            this.$message.error('新增失败!')
          }
        })
      }
    },
    // 打开编辑弹框
    editBtn(index, row) {
      this.presentDialog = true
      givePlanDetail(row.givePlanId).then(res => {
        if (res.data.code == 200) {
          this.form = res.data.data
          let arr = res.data.data.takeMode.split(',')
          this.selectedOptions = arr.map((item) => {
            return +item
          })
        }
        console.log('打开编辑弹框', this.form, res.data.data.takeMode, this.selectedOptions)
      })
    },
    // 修改赠送方案
    editPlanBtn() {
      if (this.form.givePlanName == '') {
        this.$message.error('方案名称不能为空')
      } else if (this.form.effectiveDate < this.form.createDate || this.form.createDate == '' || this.form.createDate == null) {
        this.$message.error('日期有误，请重新选择日期')
      } else {
        let param = Object.assign({
          enterpriseId: '001',
          ccGivePlanSubtabulationList: [
            {
              giveId: '',
              givePlanId: '',
              givePlanSubtabulationId: '',
              givePlanType: '',
              name: '',
              number: 0,
              price: 0
            }
          ]
        }, this.form)
        editgivePlan(param).then(res => {
          console.log('添加赠送', res)
          if (res.data.code == 200) {
            this.presentDialog = false
            this.getgivePlanList()
            this.form = {
              givePlanName: '',
              createDate: '',
              effectiveDate: '',
              parentId: ''
            }
            this.$message.success('修改赠送方案成功!')
          } else {
            this.$message.error('新增失败!')
          }
        })
      }
    },
    //搜素客户
    searchBtn() {
      console.log('搜索')
    },

    editTitle() {
      this.editBtn = false
    },
    editClose() {
      this.editBtn = true
    },
    // 分页
    selectRoleList() {
      this.getgivePlanList()
    }
  }
}
</script>

<style scoped lang="scss">
.main-content{
  padding:0;
  display: flex;
  .left_tree{
    width: 240px;
    height: 100%;
    border-right: 4px solid #F3F8FF;
    position: relative;
    .nav-title{
      cursor: pointer;
      font-weight: bold;
      font-size: 18px;
      padding: 25px 20px 10px;
    }
    .el-menu{
      border-right: 0;
      span{
        padding-left: 15px;
      }
    }
    .navicon{
      position: absolute;
      right: 40px;
      i{
        color: #fff;
        width: 20px;
        height: 20px;
        font-size: 12px;
        background: #409EFF;
        line-height: 20px;
        padding: 0;
        text-align: center;
      }
    }
  }
  .right_main{
    padding: 0 30px;
    width: 900px;
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
.text_edit{
  width: 140px;
}

.el-form{
  .el-form-item {
    margin-bottom: 8px;
  }
  .el-input{
    width: 217px;
  }
}
.main_table{
  margin-bottom: 20px;
}

</style>
