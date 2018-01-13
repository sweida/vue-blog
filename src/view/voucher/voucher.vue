<template>
  <div >
      <div class="header_title">代金券<i class="el-icon-info"></i></div>
      <div class="main-content">
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
                label="员工">
              </el-table-column>
              <el-table-column
                prop="post"
                label="职位">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="手机号"
                >
              </el-table-column>
              <el-table-column
                prop="organ"
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
                  <i class="el-icon-delete" @click="deleteBtn(scope.$index)"></i>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

      </div>

  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      search: '',
      bed: 1,
      input: '',
      banner: 'static/img/phone.png',
      tableData: [{
        date: '2016-05-02',
        name: '王狮传奇南山总店',
        phone: '13798661922',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05  -04',
        name: '王狮传奇南山总店',
        phone: '13798661922',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王狮传奇南山总店',
        phone: '13798661922',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王狮传奇南山总店',
        phone: '13798661922',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
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
    },
    //搜素客户
    searchBtn() {
      console.log('搜索')
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
  }
  .right_main{
    padding:0 40px;
    // width:100%;
    flex:1;
    .main-head{
      color:#5e6d82;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      // width: 1000px;
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


</style>
