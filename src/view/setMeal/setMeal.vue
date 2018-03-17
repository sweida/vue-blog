<template>
  <div >
      <div class="header_title">套餐<i class="el-icon-info"></i></div>
      <div class="main-content scroll">
        <div class="left_tree scroll">
          <p class="nav-title" @click="navtitle">
            <span>{{menuList.name}}</span>
            <em class="navicon" v-if="openindex==menuList.url">
              <i class="el-icon-plus" @click="plusNav(menuList)"></i>
            </em>
          </p>
          <el-menu
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            @select="handleSelect">
            <template v-for="(item, index) in menuList.childMenu" :keys="index">
              <el-menu-item :index="item.url" v-if="item.childMenu==null || item.childMenu.length==0" @click="changeMenu(item)">
                <template slot="title">
                  <span>{{item.name}}</span>
                  <em class="navicon" v-if="item.url==openindex">
                    <i class="el-icon-plus" @click="plusNav(item)"></i>
                    <i class="el-icon-edit" @click="editNav(item, item.name)"></i>
                    <i class="el-icon-minus" @click="minusNav(item)" v-if="tableData==''"></i>
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
                    </em>
                  </div>
                </template>
                <template v-for="(child, index1) in item.childMenu" :keys="index1">
                  <el-menu-item :index="child.url" @click="changeMenu(child)">
                    <span>{{child.name}}</span>
                    <em class="navicon" v-if="child.url==openindex">
                      <i class="el-icon-edit" @click="editNav(child, child.name)"></i>
                      <i class="el-icon-minus" @click="minusNav(child)" v-if="tableData==''"></i>
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
            <el-button type="primary"  size="small" @click="addBtn">新　增</el-button>
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
                prop="projectName"
                label="名称"
                width="300px"
                >
              </el-table-column>
              <el-table-column
                prop="projectPrice"
                label="价格"
                width="120px">
                <template slot-scope="scope">
                  ￥{{scope.row.projectPrice}}
                </template>
              </el-table-column>
              <el-table-column
                label="会员价格"
                width="120px">
                <template slot-scope="scope">
                  <span class="red">￥{{scope.row.discountPrice}}</span>
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

  </div>
</template>

<script>
import { PackageList, delPackage } from '@/api/product'
import { mealMenu, delMenu, editMenu, addMenu } from '@/api/tree'
import page from '@/components/common/page'
export default {
  name: 'meal',
  components: {
    page
  },
  data() {
    return {
      openindex: '', // 点击时操作按钮显示与否
      menuList: {},
      search: '',
      tableData: [],
      MenuParam: [],
      pageModel: {
        page: 1,
        rows: 10,
        sumCount: 0
      }
    }
  },
  created() {
    this.getmealMenu()
    // this.getPackageList()
  },
  methods: {
    // 获取套餐菜单
    getmealMenu() {
      mealMenu().then(res => {
        if (res.data.code == 200) {
          this.menuList = res.data.data[0]
          console.log(this.menuList)
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
        if (value == null) {
          this.$message.error('不能为空')
        } else {
          addMenu(param).then(res => {
            console.log('添加菜单', res)
            if (res.data.code == 200) {
              this.getmealMenu()
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
            this.getmealMenu()
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
              this.getmealMenu()
              this.$message.success('修改菜单成功!')
            } else {
              this.$message.error('修改菜单失败!')
            }
          })
        }
      }).catch(() => {
      })
    },
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
    handleClose(key, keyPath) {
      this.openindex = ''
      console.log('handleOpen', key, keyPath)
    },
    // 改变菜单时得到套餐数据
    changeMenu(child) {
      console.log('changeMenu', child)
      this.MenuParam = {
        parentId: child.id
      }
      this.getPackageList()
    },
    // 获取套餐列表
    getPackageList() {
      PackageList(this.pageModel, this.MenuParam).then(res => {
        console.log('获取套餐列表', res)
        this.pageModel.sumCount = res.data.data.total
        this.tableData = res.data.data.rows
      })
    },
    addBtn() {
      this.$router.push('/setMeal/addSetmeal')
    },
    // 删除项目
    deleteBtn(index, row) {
      console.log(row)
      this.$confirm('是否删除该套餐?', '提示', {
        type: 'warning'
      }).then(() => {
        delPackage(row.id).then(res => {
          if (res.data.code == 200) {
            console.log(res)
            this.tableData.splice(index, 1)
            this.$message.success(res.data.msg)
            this.getPackageList()
          } else {
            this.$message.error('删除失败!')
          }
        })
      }).catch(() => {
      })
    },
    // 编辑按钮
    editBtn(index, row) {
      console.log(row.id)
      this.$router.push('setMeal/edit/' + row.id)
    },
    //搜素客户
    searchBtn() {
      console.log('搜索')
    },
    selectRoleList () {
      this.getPackageList()
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/project.scss";
.main-content .right_main{
  width: 750px;
}

</style>
