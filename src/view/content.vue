<template>
  <div >
      <div class="header_title">企业和会所<i class="el-icon-info"></i></div>
      <div class="main-content scroll">
        <div class="phone_bg">
          <img :src="banner" alt="">
        </div>
        <div class="text_li">
          <li>企业图片设置（手机端）</li>
          <li>企业信息修改</li>
          <div class="text_main">
            <p>企业编号</p>
            <input type="text">
            <p>企业名称</p>
            <input type="text">
          </div>
          <el-button type="primary" size="mini" style="text-align:right">按时</el-button>
          <li @click="ipadBtn">企业文化修改（平板端）</li>
        </div>
        <div class="company_table">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            max-height="400"
            tooltip-effect="dark"
            >
            <el-table-column
              prop="name"
              label="会所">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="电话">
              <template slot-scope="scope">
                {{scope.row.phone}}
              </template>
              <template slot-scope="scope" >
                <span v-if="edit">{{scope.row.phone}}</span>
                <el-input size="small" v-model="scope.row.phone" v-else></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              width="250px">
              <template slot-scope="scope" >
                <span v-if="edit">{{scope.row.address}}</span>
                <el-input size="small" v-model="scope.row.address" v-else></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <i class="el-icon-edit" @click="editBtn" v-if="edit"></i>
                <template v-else>
                  <el-button size="small" type="primary" @click="sureEdit">确认</el-button>
                  <el-button size="small" @click="edit=true">取消</el-button>
                </template>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination background
          @current-change="currentPageChange"
          :current-page.sync="currentPage"
          :page-size="limit"
          :total="total"
          layout="prev, pager, next, total">
          </el-pagination>
        </div>
      </div>
      <div class="footer">
        <el-button type="primary" size="medium">保　存</el-button>
      </div>

      <el-dialog title="新增员工" :visible.sync="dialogVisible" width="1000px">

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false" size="small">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import { getInfoCompany, getShop } from '../api/login'
export default {
  name: 'app',
  data() {
    return {
      edit: true,
      dialogVisible: false,
      banner: 'static/img/phone.png',
      tableData: [{
        date: '2016-05-02',
        name: '王狮传奇南山总店',
        phone: '13798661922',
        address: '深圳市南山区南头街道玉泉路麒麟花园A区12栋二楼202、203、204商铺'
      }],
      total: 0, // 数据总条数
      currentPage: 1, // 当前页码
      limit: 10 // 每页数据条数
    }
  },
  methods: {
    editBtn() {
      this.edit = false
    },
    sureEdit() {
      this.edit = true
    },
    ipadBtn() {
      this.dialogVisible = true
    },
    // 页码改变事件处理程序
    currentPageChange(current) {
      this.currentPage = current
      this.getList()
    },
    // 获取表格数据
    getList (url) {
      // 生成请求参数
      var data = {
        page: this.currentPage,
        rows: this.limit
      }
      return getShop(data).then(res => {
        console.log(res)
        // if (res.status === 200) {
        //   this.tableData = res.data.list
        //   this.total = res.data.total
        // } else {
        //   this.$toastMsg('error', '网络好像出了点问题！')
        // }
      })
    }
  },
  created() {
    getInfoCompany()
  }
}
</script>

<style scoped lang="scss">

.main-content{
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding:50px 0;
  .phone_bg{
    width: 380px;
    height: 600px;
    background: url(/static/img/phone_bg.png) no-repeat center top;
    text-align: center;
    img{
      margin-top: 60px;
      height: 425px;
      width: 230px;
    }
  }
  .text_li{
    padding-right: 50px;
    border-right: 1px solid #ddd;
    li{
      color: #3cb4ff;
      font-size: 18px;
      border-left: 3px solid #3cb4ff;
      padding-left: 10px;
      margin: 30px 0;
      line-height: 18px;
    }
    .text_main{
      padding-left: 15px;
      color: #666;
    }
    input{
      color: #666;
      border: 0;
      border-bottom: 1px solid #ddd;
      outline: none;
      line-height: 30px;
      margin: 5px 0 10px;
    }
  }
  .company_table{
    margin: 40px;
    width: 700px;
  }
}

.el-icon-edit{
  cursor: pointer;
  padding:5px 0;
  font-size: 20px;
}
</style>
