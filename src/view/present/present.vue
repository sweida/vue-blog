<template>
  <div >
      <div class="header_title">赠送方案<i class="el-icon-info"></i></div>
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
                prop="name"
                label="名称"
                width="300px"
                >
                <template slot-scope="scope" >
                  <span v-if="editBtn">{{scope.row.name}} <i class="el-icon-edit" @click="editTitle(scope.$index)"></i></span>
                  <template v-else>
                    <el-input v-model="scope.row.name" size="mini" class="text_edit"></el-input>
                    <el-button type="primary" size="mini">确定</el-button>
                    <el-button size="mini" @click="editClose">取消</el-button>
                  </template>
                </template>
              </el-table-column>
              <el-table-column
                prop="startDate"
                label="生效日期"
                width="150px">
              </el-table-column>
              <el-table-column
                prop="endDate"
                label="使用截止日期"
                width="150px">
              </el-table-column>
              <el-table-column
                label="修改详情"
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
          </div>
        </div>

      </div>

      <el-dialog :visible.sync="presentDialog" title="编辑配料" width="1050px" class="burbox">
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
                prop="material_name"
                label="配料名称"
                >
              </el-table-column>
              <el-table-column
                prop="unit"
                label="单位">
              </el-table-column>
              <el-table-column
              label="选择">
                <template slot-scope="scope" >
                  <el-button type="primary" @click="SelMaterials(scope.row)" size="small">添加</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 默认配料 -->
          <div class="burli2">
            <el-table
              :data="materials_data"
              stripe
              style="width: 400px;margin-bottom:20px;"
              max-height='200'
              tooltip-effect="dark"
            >
              <el-table-column
                prop="material_name"
                label="已添加配料名称"
                >
              </el-table-column>
              <el-table-column
                prop="unit"
                label="单位"
                >
              </el-table-column>
              <el-table-column
                prop="material_amount"
                label="数量">
                <template slot-scope="scope" >
                  <el-input-number v-model="scope.row.material_amount"  :min="1"></el-input-number>
                </template>
              </el-table-column>
              <el-table-column
              label="操作">
                <template slot-scope="scope" >
                  <el-button type="danger" @click="delSelect(scope.$index)" size="small"><i class="el-icon-delete"></i></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="burdening = false" size="small">取 消</el-button>
          <el-button type="primary" @click="sureBurden" size="small">保存配料</el-button>
        </span>
      </el-dialog>

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
      presentDialog: false,
      editBtn: true,
      banner: 'static/img/phone.png',
      form: {
        type: 1,
        exclusive: 1,
        region: '',
        desc: ''
      },
      tableData: [{
        name: '美白面部护理套',
        startDate: '2016-05-02',
        endDate: '2018-05-02'
      }, {
        name: '果冻肌之三重',
        startDate: '2016-05-02',
        endDate: '2018-05-02'
      }, {
        name: '紧致换肤',
        startDate: '2016-05-02',
        endDate: '2018-05-02'
      }, {
        name: '相宜本草柔肤水百合',
        startDate: '2016-05-02',
        endDate: '2018-05-02'
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
      this.presentDialog = true
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
