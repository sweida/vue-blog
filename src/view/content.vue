<template>
  <div >
      <div class="header_title">企业和会所<i class="el-icon-info"></i></div>
      <div class="main-content scroll">
        <div class="phone_bg">
          <img :src="banner" alt="">
        </div>
        <div class="text_li">
          <el-upload
            class="avatar-uploader"
            action="apis/file/pic"
            :show-file-list='false'
            :on-success="fileUploadSuccess"
            :on-error="fileUploadError"
            :before-upload="beforeAvatarUpload">
            <li>企业图片设置（手机端）</li>
          </el-upload>
          <li>企业信息修改</li>
          <div class="text_main">
            <p>企业编号</p>
            <input type="text" v-model="companyInfo.enterpriseId" readonly="readonly">
            <p>企业名称</p>
            <input type="text" v-model="companyInfo.enterpriseName">
          </div>
          <div class="saveInfo">
            <el-button type="primary" size="medium" @click="saveCompanyInfo">保　存</el-button>
          </div>
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
              prop="organName"
              label="会所">
            </el-table-column>
            <el-table-column
              prop="organPhone"
              label="电话">
              <template slot-scope="scope">
                {{scope.row.organPhone}}
              </template>
              <template slot-scope="scope" >
                <span v-if="edit">{{scope.row.organPhone}}</span>
                <el-input size="small" v-model="scope.row.organPhone" v-else></el-input>
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
                  <el-button size="small" type="primary" @click="sureEdit(scope.row)">确认</el-button>
                  <el-button size="small" @click="edit=true">取消</el-button>
                </template>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
import { clone } from '../utils/common'
import { getInfoCompany, changeCompanyInfo, getCurtureCompany, getShop, changeShop } from '../api/login'
export default {
  name: 'app',
  data() {
    return {
      header: {'Accept': '*/*'},
      edit: true,
      dialogVisible: false,
      banner: 'static/img/phone.png',
      tableData: [],
      companyInfo: {}
    }
  },
  methods: {
    editBtn() {
      this.edit = false
    },
    sureEdit(item) {
      changeShop(item).then(res => {
        if (res.data.code == 200) {
          this.$message.success('修改分店信息成功！')
          this.edit = true
        } else {
          this.$message.error('操作失败请稍后再试！')
        }
      })
    },
    ipadBtn() {
      this.dialogVisible = true
    },
    // 上传图片
    fileUploadSuccess(response) {
      this.banner = response.data
      this.$message.success('图像上传成功！')
    },
    fileUploadError() {
      this.$message.error('图像上传失败！')
    },
    beforeAvatarUpload(file) {
      let isJPG = file.type === 'image/jpeg'
      let isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 获取店面表格数据
    getList() {
      getShop().then(res => {
        this.tableData = res.data.data
      })
    },
    // 得到企业信息
    getCompanyInfo() {
      getInfoCompany().then(res => {
        this.companyInfo = res.data.data
      })
    },
    // 修改企业信息
    saveCompanyInfo() {
      changeCompanyInfo(this.companyInfo).then(res => {
        if (res.data.code == 200) {
          this.$message.success('保存成功！')
        } else {
          this.$message.error('操作失败！')
        }
      })
    },
    // 得到企业文化信息
    getCompanyCurture() {
      getCurtureCompany('001').then(res => {
        console.log(res)
      })
    }
  },
  created() {
    this.getList()
    this.getCompanyInfo()
    this.getCompanyCurture()
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
    li:nth-of-type(1){
      margin-bottom: 10px
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
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
.saveInfo{
  text-align: right
}
.el-upload-list{
  display: none;
}
</style>
