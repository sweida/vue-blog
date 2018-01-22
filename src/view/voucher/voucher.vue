<template>
  <div >
      <div class="header_title">代金券<i class="el-icon-info"></i></div>
      <div class="main-content">
        <div class="left_tree scroll">
          <el-menu
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
            <template v-for="(item, index) in menuList" :keys="index">
              <el-menu-item :index="item.url" v-if="item.childMenu==null" @click="changeMenu(item)">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{item.name}}</span>
                </template>
              </el-menu-item>
              <el-submenu :index="item.url" v-else>
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{item.name}}</span>
                </template>
                <template v-for="(child, index1) in item.childMenu" :keys="index1">
                  <el-menu-item :index="item.url+child.url" v-if="child.childMenu==null" @click="changeMenu(child)">
                    <i class="el-icon-location"></i>
                    <span>{{child.name}}</span>
                  </el-menu-item>
                  <el-submenu :index="item.url+child.url" v-else>
                    <template slot="title">
                      <i class="el-icon-location"></i>
                      <span>{{child.name}}</span>
                    </template>
                    <template v-for="(child2, index2) in child.childMenu" :keys="index1">
                      <el-menu-item :index="child.url+child2.url" @click="changeMenu(child2)">{{child2.name}}</el-menu-item>
                    </template>
                  </el-submenu>
                </template>
              </el-submenu>
            </template>
            <!-- <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航二</span>
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
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航三</span>
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
            </el-submenu> -->
            <!-- <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
              <span slot="title">导航三</span>
            </el-menu-item> -->
          </el-menu>
        </div>
        <div class="right_main">
          <div class="main-head">
            <div>
              <input type="text" class="search" v-model="search" v-on:keyup.enter="searchBtn">
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
                prop="organ"
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
            <el-form-item label="名称">
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
import { clone } from '@/api/login'
import page from '../../components/common/page'
export default {
  name: 'voucher',
  components: {
    page
  },
  data() {
    return {
      pageModel: {
        page: 1,
        rows: 10,
        sumCount: 0
      },
      voucherParam: {}, //代金券参数
      menuList: [],
      search: '',
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
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    added() {
      this.voucherDialog = true
    },
    //搜素客户
    searchBtn() {
      console.log('搜索')
    },
    selectRoleList () {
      this.getSttafList()
    },
    // 得到左侧菜单栏
    getMenuList() {
      getMenu().then(res => {
        if (res.data.code == 200) {
          this.menuList = res.data.data
        }
      })
    },
    // 得到总代金券数据
    getVoucherList() {
      getVoucher(this.pageModel, this.voucherParam).then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.rows
        }
      })
    },
    // 改变菜单时得到代金券数据
    changeMenu(item) {
      this.voucherParam.parentId = item.id
      this.getVoucherList()
    },
    // 增加时得到菜单
    addMenu() {
      getMenuAdd().then(res => {
        if (res.data.code == 200) {
          this.options = res.data.data
          console.log(res.data.data)
        }
      })
    },
    // 添加时获取名称
    handleItemChange(val) {
      if (val.length >= 2) {
        let parentIndex = this.options.findIndex(item => {
          return item.id == val[0]
        })
        let childId = this.options[parentIndex].childMenu.findIndex(item => {
          return item.id == val[1]
        })
        getMenuById([1, 6]).then(res => {
          if (res.data.code == 200) {
            // this.options[parentIndex].childMenu[childId].childMenu = [{'id': 1, 'name': 'mam'}]
            this.$set(this.options[parentIndex].childMenu[childId], 'childMenu', [{'id': 1, 'name': 'mam'}])
            // this.$set(this.options[parentIndex].childMenu, childId, this.options[parentIndex].childMenu[childId])
            // this.$set(this.options, parentIndex, this.options[parentIndex])
          }
        })
      }
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
    this.addMenu()
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
    width: 200px;
    height: 100%;
    border-right: 4px solid #F3F8FF;
    .el-menu{
      border-right: 0;
    }
  }
  .right_main{
    padding:0 30px;
    flex:1;
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
