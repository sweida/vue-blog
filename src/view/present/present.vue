<template>
  <div >
      <div class="header_title">赠送方案<i class="el-icon-info"></i></div>
      <div class="main-content scroll">
        <div class="left_tree scroll">
          <p class="nav-title" @click="navtitle">
            <span>{{menuList.name}}</span>
            <em class="navicon" v-if="openindex==menuList.url">
              <i class="el-icon-plus" @click="plusNav(menuList)"></i>
              <i class="el-icon-edit" @click="editNav(menuList, menuList.name)" v-if="givePlanli==''"></i>
            </em>
          </p>
          <el-menu
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            @select="handleSelect">
            <template v-for="(item, index) in menuList.childMenu" :keys="index">
              <el-menu-item :index="item.url" v-if="item.childMenu==null || item.childMenu==''" @click="changeMenu(item)">
                <template slot="title">
                  <span>{{item.name}}</span>
                  <em class="navicon" v-if="item.url==openindex">
                    <i class="el-icon-plus" @click="plusNav(item)"></i>
                    <i class="el-icon-edit" @click="editNav(item, item.name)"></i>
                    <i class="el-icon-minus" @click="minusNav(item)" v-if="givePlanli==''"></i>
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
                      <!-- <i class="el-icon-minus" @click="minusNav(item)" v-if="givePlanli==''"></i> -->
                    </em>
                  </div>
                </template>
                <template v-for="(child, index1) in item.childMenu" :keys="index1">
                  <el-menu-item :index="child.url" @click="changeMenu(child)">
                    <span>{{child.name}}</span>
                    <em class="navicon" v-if="child.url==openindex">
                      <i class="el-icon-edit" @click="editNav(child, child.name)"></i>
                      <i class="el-icon-minus" @click="minusNav(child)" v-if="givePlanli==''"></i>
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
              </el-table-column>
              <el-table-column
                prop="createDate"
                label="生效日期"
                width="140px">
              </el-table-column>
              <el-table-column
                prop="effectiveDate"
                label="使用截止日期"
                width="140px">
              </el-table-column>
              <el-table-column
                prop="effectiveDays"
                label="有效天数(天)"
                width="120px">
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

      <!-- 添加弹框 -->
      <el-dialog :visible.sync="presentDialog" title="添加赠送方案" width="1250px" class="burbox">
        <div class="tableDialog">
          <div class="tabs scroll">
            <el-menu
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              @select="handleSelect">
              <template v-for="(item, index) in dialogMenu" :keys="index">
                <el-submenu :index="item.url">
                  <template slot="title" >
                    <div>
                      <span class="title">{{item.name}}</span>
                    </div>
                  </template>
                  <template v-for="(child, index1) in item.childMenu" :keys="index1">
                    <el-menu-item :index="child.url" @click="dialogChangeMenu(child,item)" v-if="child.childMenu==null || child.childMenu==''">
                      <template slot="title">
                        <span>{{child.name}}</span>
                      </template>
                    </el-menu-item>
                    <el-submenu :index="child.url"  v-else>
                      <template slot="title" >
                        <div @click="dialogChangeMenu(child,item)">
                          <span >{{child.name}}</span>
                        </div>
                      </template>
                      <template v-for="(son, index2) in child.childMenu" :keys="index2">
                        <el-menu-item :index="son.url" @click="dialogChangeMenu(son,item)" v-if="son.childMenu==null || son.childMenu==''">
                          <template slot="title">
                            <span>{{son.name}}</span>
                          </template>
                        </el-menu-item>
                      </template>
                    </el-submenu>
                  </template>
                </el-submenu>
              </template>
            </el-menu>
          </div>
          <div class="burli1">
            <el-table
              ref="goods"
              :data="tableList"
              stripe
              style="width:100%"
              max-height='450'
              tooltip-effect="dark"
              @select="selectGoods"
              @select-all="selectAllGoods"
              >
              <el-table-column
                label="名称"
                >
                <template slot-scope="scope" >
                  {{scope.row.projectName || scope.row.coupName}}
                </template>
              </el-table-column>
              <el-table-column
                label="价值">
                <template slot-scope="scope" >
                  ￥{{scope.row.projectPrice || scope.row.coupQuota}}
                </template>
              </el-table-column>
              <el-table-column
              type="selection"
              width="80">
              </el-table-column>
            </el-table>
          </div>
          <!-- 已选列表 -->
          <div class="burli3">
            <el-form ref="form" v-model="form" label-width="120px" label-position='left'>
              <el-form-item label="赠送方案名称">
                <el-input size="medium" v-model="form.givePlanName" placeholder="填写赠送方案名称"></el-input>
              </el-form-item>
              <el-form-item label="所属类目">
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
            </el-form>
            <el-table
              :data="checkGoods"
              stripe
              style="width: 100%;margin-bottom:20px;"
              height='240'
              tooltip-effect="dark"
            >
              <el-table-column
                prop="projectType"
                label="类型"
                >
                <template slot-scope="scope" >
                  {{scope.row.coupType == 0 ? projectType[3] : projectType[scope.row.projectType-1]}}
                </template>
              </el-table-column>
              <el-table-column
                label="名称"
                >
                <template slot-scope="scope" >
                  {{scope.row.projectName || scope.row.coupName}}
                </template>
              </el-table-column>
              <el-table-column
                label="价值">
                <template slot-scope="scope" >
                  ￥{{scope.row.projectPrice || scope.row.coupQuota}}
                </template>
              </el-table-column>
              <el-table-column
                prop="number"
                label="数量">
                <template slot-scope="scope" >
                  <el-input-number v-model="scope.row.projectNum" :min="1" :max="scope.row.coupNum"></el-input-number>
                </template>
              </el-table-column>
            </el-table>

            <el-form ref="form" v-model="form" label-width="120px" label-position='left'>
              <el-form-item label="有效天数">
                <el-input type="number" size="medium" v-model="form.effectiveDays" placeholder="填写有效天数"></el-input>
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
          <el-button type="primary" @click="savePlanBtn" size="small" v-if="!form.id">保 存</el-button>
          <el-button type="primary" @click="editPlanBtn" size="small" v-else>保存修改</el-button>
        </span>
      </el-dialog>

  </div>
</template>

<script>
import { addgivePlan, getgivePlan, delgivePlan, editgivePlan, givePlanDetail, getproject, addGivePlan, getDetailById } from '@/api/product'
import { giveNav, delMenu, editMenu, addMenu, ccGetMenu } from '@/api/tree'
import page from '@/components/common/page'
import { parseTime, clone } from '@/utils/common'
export default {
  name: 'app',
  components: {
    page
  },
  data() {
    return {
      nowDate: new Date(),
      openindex: '',
      menuList: [],
      givePlanli: [], //  赠送列表
      MenuParam: {}, // 赠送参数
      search: '',
      presentDialog: false,
      dialogMenu: [], // 弹框菜单
      diologMenuParam: {}, // 弹框菜单参数
      tableList: [], // 弹框点击菜单获取列表
      checkGoods: [], // 已选列表
      checkGoodIds: [], //已选id
      form: {},
      formInfo: '',
      options: [],
      selectedOptions: [],
      aa: '22',
      projectType: ['项目', '产品', '套餐', '优惠券'],
      defaultProps: {
        children: 'childMenu',
        value: 'id',
        label: 'name'
      },
      pageModel: {
        page: 1,
        rows: 10,
        sumCount: 0
      },
      diologpageModel: {
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
        if (value == null) {
          this.$message.error('不能为空')
        } else {
          addMenu(param).then(res => {
            console.log('添加菜单', res)
            if (res.data.code == 200) {
              this.getgiveNav()
              this.$message.success('新增菜单成功!')
            } else {
              this.$message.error('新增菜单失败!')
            }
          })
        }
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
        if (value == null) {
          this.$message.error('不能为空')
        } else {
          editMenu(item.id, value).then(res => {
            console.log('修改菜单', res)
            if (res.data.code == 200) {
              this.getgiveNav()
              this.$message.success('修改菜单成功!')
            } else {
              this.$message.error('修改菜单失败!')
            }
          })
        }
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
    // 选择菜单获取id
    handleItemChange(val) {
      this.form.takeMode = val.join(',')
      this.form.parentId = val[val.length - 1]
      console.log('点击', val, val[val.length - 1], this.form.takeMode)
    },
    // 改变菜单时得到赠送方案数据
    changeMenu(child) {
      console.log('changeMenu', child.id)
      this.MenuParam = {
        parentId: child.id
      }
      this.getgivePlanList()
    },
    // 获取赠送列表
    getgivePlanList() {
      getgivePlan(this.pageModel, this.MenuParam).then(res => {
        console.log(res.data)
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
        delgivePlan(row.id).then(res => {
          if (res.data.code == 200) {
            console.log(res)
            this.givePlanli.splice(index, 1)
            this.$message.success(res.data.msg)
            this.getgivePlanList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }).catch(() => {
      })
    },
    // 打开弹框
    added() {
      this.form = {
        givePlanName: '',
        effectiveDays: 1000,
        createDate: new Date(),
        effectiveDate: new Date((+new Date()) + 3651 * 24 * 3600 * 1000),
        parentId: '',
        takeMode: ''
      }
      this.tableList = []
      this.checkGoods = []
      this.checkGoodIds = []
      this.selectedOptions = []
      this.presentDialog = true
      this.getccGetMenu()
      console.log('form', this.form)
    },
    // 打开编辑弹框
    editBtn(index, row) {
      this.tableList = []
      this.checkGoods = []
      this.checkGoodIds = []
      this.selectedOptions = []
      this.getccGetMenu()
      this.presentDialog = true
      givePlanDetail(row.id).then(res => {
        console.log(res)
        if (res.data.code == 200) {
          this.form = res.data.data
          this.checkGoods = res.data.data.ccSelectedProjectVos
          this.checkGoods.forEach(val => {
            this.checkGoodIds.push(val.id)
          })
          let arr = res.data.data.takeMode.split(',')
          this.selectedOptions = arr.map((item) => {
            return +item
          })
        }
      })
    },
    // 获取项目、产品、套餐、优惠券菜单
    getccGetMenu() {
      ccGetMenu().then(res => {
        if (res.data.code == 200) {
          this.dialogMenu = res.data.data
        }
      })
    },
    // 改变菜单时得到列表数据
    dialogChangeMenu(child, item) {
      this.getprojectList(child.id, item.id)
    },
    selectGoods(selection, val) {
      var index = selection.indexOf(val)
      if (index < 0) {
        var sIndex = this.checkGoodIds.indexOf(val.id)
        val.number = 1
        if (sIndex > -1) {
          this.checkGoodIds.splice(sIndex, 1)
          this.checkGoods.splice(sIndex, 1)
        }
      } else {
        this.checkGoods.push(val)
        this.checkGoodIds.push(val.id)
      }
    },
    selectAllGoods(val) {
      if (val.length == 0) {
        this.tableList.forEach((good) => {
          var index = this.checkGoodIds.indexOf(good.id)
          good.number = 1
          this.checkGoods.splice(index, 1)
          this.checkGoodIds.splice(index, 1)
        })
      } else {
        val.forEach((good) => {
          var index = this.checkGoodIds.indexOf(good.id)
          if (index < 0) {
            this.checkGoods.push(good)
            this.checkGoodIds.push(good.id)
          }
        })
      }
    },
    // 获取项目列表
    getprojectList(childId, itemId) {
      addGivePlan(this.pageModel, itemId, {parentId: childId}).then(res => {
        console.log('获取项目列表', res)
        this.diologpageModel.sumCount = res.data.data.total
        this.tableList = res.data.data.rows
        this.tableList.forEach((good) => {
          if (this.checkGoodIds) {
            var index = this.checkGoodIds.indexOf(good.id)
            if (index > -1) {
              setTimeout(() => {
                this.$refs.goods.toggleRowSelection(good)
              }, 1)
            }
          }
        })
      })
    },
    // 保存添加赠送
    savePlanBtn() {
      if (this.form.givePlanName == '' || this.form.takeMode == '') {
        this.$message.error('赠送方案名称和类目不能为空')
      } else if (this.form.effectiveDate < this.form.createDate || this.form.createDate == '' || this.form.createDate == null) {
        this.$message.error('日期有误，请重新选择日期')
      } else {
        let param = Object.assign({
          enterpriseId: '001',
          ccSelectedProjectVos: this.checkGoods
        }, this.form)
        addgivePlan(param).then(res => {
          this.presentDialog = false
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
    // 修改赠送方案
    editPlanBtn() {
      if (this.form.givePlanName == '' || this.form.takeMode == '') {
        this.$message.error('方案名称和类目不能为空')
      } else if (this.form.effectiveDate < this.form.createDate || this.form.createDate == '' || this.form.createDate == null) {
        this.$message.error('日期有误，请重新选择日期')
      } else {
        let param = Object.assign({
          enterpriseId: '001',
          ccSelectedProjectVos: this.checkGoods
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
@import "../../style/project.scss";
.el-menu {
  border-right: 0;
}
</style>
