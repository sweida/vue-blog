<template>
  <div >
      <div class="header_title">套餐<i class="el-icon-info"></i></div>
      <div class="main-content">
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
              :data="tableData"
              stripe
              style="width: 100%"
              max-height="600"
              tooltip-effect="dark"
              >
              <el-table-column
                prop="packageName"
                label="名称"
                width="150px">
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
import { getMenuMeal, getMealList } from '@/api/login'
import page from '@/components/common/page'
export default {
  name: 'meal',
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
      openindex: '', // 点击时操作按钮显示与否
      menuList: {},
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
      tableData: []
    }
  },
  methods: {
    navtitle() {
      this.openindex = this.menuList.url
      console.log(this.openindex)
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
    // 改变菜单时得到套餐数据
    changeMenu(child) {
      console.log('changeMenu', child.id)
      // this.givePlanParam = {
      //   parentId: child.id
      // }
      // this.getgivePlanList()
    },
    // 新增菜单
    plusNav(item) {
      event.stopPropagation()
      // this.$prompt('请输入新增的类目名称', '提示', {
      // }).then(({ value }) => {
      //   console.log(value)
      //   let param = {
      //     icon: '',
      //     name: value,
      //     parentId: item.id
      //   }
      //   addgiveNav(param).then(res => {
      //     console.log('添加菜单', res)
      //     if (res.data.code == 200) {
      //       this.getgiveNav()
      //       this.$message.success('新增菜单成功!')
      //     } else {
      //       this.$message.error('新增菜单失败!')
      //     }
      //   })
      //   this.$message.success('新增类目成功')
      // }).catch(() => {
      // })
    },
    // 删除菜单
    minusNav(item) {
      // event.stopPropagation()
      // console.log(item.id)
      // this.$confirm('是否删除该类目?', '提示', {
      //   type: 'warning'
      // }).then(() => {
      //   delMenu(item.id).then(res => {
      //     console.log('删除菜单', res)
      //     if (res.data.code == 200) {
      //       this.getgiveNav()
      //       this.$message.success(res.data.msg)
      //     } else {
      //       this.$message.error(res.data.msg)
      //     }
      //   })
      // }).catch(() => {
      // })
    },
    // 修改菜单
    editNav(item, name) {
      // console.log(item, name)
      // event.stopPropagation()
      // this.$prompt('请输入修改的类目名称', '提示', {
      //   inputValue: name
      // }).then(({ value }) => {
      //   editMenu(item.id, value).then(res => {
      //     console.log('修改菜单', res)
      //     if (res.data.code == 200) {
      //       this.getgiveNav()
      //       this.$message.success('修改菜单成功!')
      //     } else {
      //       this.$message.error('修改菜单失败!')
      //     }
      //   })
      //   this.$message.success('新增类目成功')
      // }).catch(() => {
      // })
    },
    added() {
      this.$router.push('/setMeal/addSetmeal')
    },
    selectRoleList () {
      this.getListMeal()
    },
    //搜素客户
    searchBtn() {
      console.log('搜索')
    },
    // 得到套餐菜单
    getMealMenu() {
      getMenuMeal().then(res => {
        if (res.data.code == 200) {
          this.menuList = res.data.data[0]
          console.log(this.menuList)
        }
      })
    },
    // 得到套餐列表
    getListMeal() {
      getMealList(this.pageModel, {}).then(res => {
        this.tableData = res.data.data.rows
      })
    }
  },
  created() {
    this.getMealMenu()
    // this.getListMeal()
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
