<template>
  <div >
      <div class="header_title">代金券<i class="el-icon-info"></i></div>
      <div class="main-content">
        <div class="left_tree scroll">
          <el-menu
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            @select="handleSelect">
            <template v-for="(item, index) in menuList" :keys="index">
              <el-menu-item :index="item.url" v-if="item.childMenu==null || item.childMenu==''" @click="changeMenu(item)">
                <template slot="title">
                  <span class="title">{{item.name}}</span>
                  <em class="navicon" v-if="item.url==openindex">
                    <i class="el-icon-plus" @click="plusNav(item)"></i>
                    <i class="el-icon-edit" @click="editNav(item, item.name)"></i>
                  </em>
                </template>
              </el-menu-item>
              <el-submenu :index="item.url"  v-else>
                <template slot="title" >
                  <div @click="changeMenu(item)">
                    <span class="title">{{item.name}}</span>
                    <em class="navicon" v-if="item.url==openindex">
                      <i class="el-icon-plus" @click="plusNav(item)"></i>
                      <i class="el-icon-edit" @click="editNav(item, item.name)"></i>
                    </em>
                  </div>
                </template>
                <template v-for="(child, index1) in item.childMenu" :keys="index1">
                  <el-menu-item :index="child.url" @click="changeMenu(child)" v-if="child.childMenu==null || child.childMenu==''">
                    <template slot="title">
                      <span>{{child.name}}</span>
                      <em class="navicon" v-if="child.url==openindex">
                        <i class="el-icon-plus" @click="plusNav(child)"></i>
                        <i class="el-icon-edit" @click="editNav(child, child.name)"></i>
                        <i class="el-icon-minus" @click="minusNav(child)"></i>
                      </em>
                    </template>
                  </el-menu-item>
                  <el-submenu :index="child.url"  v-else>
                    <template slot="title" >
                      <div @click="changeMenu(child)">
                        <span >{{child.name}}</span>
                        <em class="navicon" v-if="child.url==openindex">
                          <i class="el-icon-plus" @click="plusNav(child)"></i>
                          <i class="el-icon-edit" @click="editNav(child, child.name)"></i>
                          <i class="el-icon-minus" @click="minusNav(child)"></i>
                        </em>
                      </div>
                    </template>
                    <template v-for="(son, index1) in child.childMenu" :keys="index1">
                      <el-menu-item :index="son.url" @click="changeMenu(son)">
                        <template slot="title">
                          <span>{{son.name}}</span>
                          <em class="navicon" v-if="son.url==openindex">
                            <i class="el-icon-edit" @click="editNav(son, son.name)"></i>
                            <i class="el-icon-minus" @click="minusNav(son)"></i>
                          </em>
                        </template>
                      </el-menu-item>
                    </template>
                  </el-submenu>
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
                  <i class="el-icon-edit" @click="edit(scope.$index)"></i>
                </template>
              </el-table-column>
              <el-table-column
                label="删除">
                <template slot-scope="scope">
                  <i class="el-icon-delete" @click="deleteBtn(scope.$index)"></i>
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
import { getMenu, getVoucher, getMenuAdd, getMenuById } from '@/api/login'
import { delMenu, editMenu, addMenu } from '@/api/tree'
import { clone } from '@/utils/common'
import page from '../../components/common/page'
export default {
  name: 'voucher',
  components: {
    page
  },
  data() {
    return {
      optionsDetail: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      pageModel: {
        page: 1,
        rows: 10,
        sumCount: 0
      },
      openindex: '', // 点击时操作按钮显示与否
      voucherParam: {}, //代金券参数
      menuList: [],
      bed: 1,
      input: '',
      voucherDialog: false,
      banner: 'static/img/phone.png',
      form: {
        type: 1,
        exclusive: 1,
        region: '',
        desc: ''
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
  methods: {
    added() {
      this.voucherDialog = true
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
    //搜素客户
    searchBtn() {
      console.log('搜索')
      this.getVoucherList()
    },
    selectRoleList () {
      this.getVoucherList()
    },
    // 得到左侧菜单栏
    getMenuList() {
      getMenu().then(res => {
        if (res.data.code == 200) {
          this.menuList = res.data.data
          console.log(res)
        }
      })
    },
    // 得到总代金券数据
    getVoucherList() {
      getVoucher(this.pageModel, this.voucherParam).then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.rows
          this.pageModel.sumCount = res.data.data.total
          console.log(res.data.data)
        }
      })
    },
    // 改变菜单时得到代金券数据
    changeMenu(child, parent) {
      this.voucherParam.parentId = child.id
      if (arguments.length == 2) {
        this.voucherParam.coupId = parent.id
      }
      console.log(child, parent)
      this.getVoucherList()
    },
    // 增加时得到菜单
    addOptionMenu() {
      getMenuAdd().then(res => {
        if (res.data.code == 200) {
          this.options = res.data.data
          console.log(res.data.data)
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
            this.getMealMenu()
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
            this.getMealMenu()
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
            this.getMealMenu()
            this.$message.success('修改菜单成功!')
          } else {
            this.$message.error('修改菜单失败!')
          }
        })
        this.$message.success('新增类目成功')
      }).catch(() => {
      })
    },
    // 添加时获取名称
    handleItemChange(val) {
      // console.log(val)
      // if (val.length >= 2) {
      //   let parentIndex = this.options.findIndex(item => {
      //     return item.id == val[0]
      //   })
      //   let childId = this.options[parentIndex].childMenu.findIndex(item => {
      //     return item.id == val[1]
      //   })
      // this.$set(this.options[parentIndex].childMenu[childId], 'childMenu', [{'id': 1, 'name': 'mam'}])
      //   getMenuById([parentIndex, childId]).then(res => {
      //     if (res.data.code == 200) {
      //       this.options[parentIndex].childMenu[childId].childMenu = [{'id': 1, 'name': 'mam'}]
      //       this.$set(this.options[parentIndex].childMenu, childId, this.options[parentIndex].childMenu[childId])
      //       this.$set(this.options, parentIndex, this.options[parentIndex])
      //     }
      //   })
      // }
    }

  },
  // 过滤器
  filters: {
    filterVoucher(value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  created() {
    this.getMenuList()
    this.getVoucherList()
    this.addOptionMenu()
    // getMenuById([1, 6]).then(res => {
    //   if (res.data.code == 200) {
    //     // this.options = res.data.data
    //     console.log(res.data.data)
    //   }
    // })
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
