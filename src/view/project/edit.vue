<template>
  <div >
      <div class="header_title"><span><router-link to="/project">项目</router-link> <i class="el-icon-arrow-right"></i> 添加项目</span><i class="el-icon-info"></i></div>
      <div class="main-content scroll">
        <div class="form_box form_top">
          <h5>基础信息</h5>
          <el-form ref="projectDetail" v-model="projectDetail" label-width="120px" label-position='left'>
            <el-form-item label="宝贝编号">
              <span>{{projectDetail.projectId}}</span>
              <!-- <el-input size="medium" v-model="projectDetail.projectId"></el-input> -->
            </el-form-item>
            <el-form-item label="宝贝名称">
              <el-input size="medium" v-model="projectDetail.projectName"></el-input>
            </el-form-item>
            <el-form-item label="价格">
              <el-input size="medium" v-model="projectDetail.projectPrice"></el-input>
            </el-form-item>
            <el-form-item label="有效天数">
              <el-input size="medium" v-model="projectDetail.availabilityDay"></el-input>
            </el-form-item>
            <el-form-item label="耗时(分钟)">
              <el-input size="medium" v-model="projectDetail.consumeTime"></el-input>
            </el-form-item>
            <el-form-item label="所属类目">
              <el-input size="medium" v-model="projectDetail.parentId"></el-input>
            </el-form-item>
          </el-form>
          <div class="uploader_box">
            <el-upload
              class="uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p>建议分辨率为400*400</p>
          </div>

        </div>
        <!-- <div class="form_box">
          <h5>适合肤质</h5>
          <div class="li_box">
            <el-checkbox-group
              v-model="checkedCities1"
              :min="1"
              :max="2">
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
            <div class="edit_box" v-if="skin">
              <el-input size="mini"></el-input>
              <el-button type="primary" size="mini">新增</el-button>
              <el-button size="mini" @click="skinClose">取消</el-button>
            </div>
          </div>
          <div class="right_but">
            <el-button type="primary" size="mini" @click="skinBtn">编辑肤质</el-button>
            <i class="el-icon-info"></i>
          </div>
        </div> -->

        <!-- <div class="form_box">
          <h5>功效</h5>
          <div class="li_box">
            <el-tag
              v-for="tag in tags"
              :key="tag.name"
              closable
              :disable-transitions="false"
              @close="CloseTags(tag)"
              >
              {{tag.name}}
            </el-tag>
            <div class="edit_box" v-if="effect">
              <el-input size="mini"></el-input>
              <el-button type="primary" size="mini">新增</el-button>
              <el-button size="mini" @click="effectClose">取消</el-button>
            </div>
          </div>
          <div class="right_but">
            <el-button type="primary" size="mini" @click="effectBtn">编辑功效</el-button>
            <i class="el-icon-info"></i>
          </div>
        </div> -->

        <!-- <div class="form_box">
          <h5>配料</h5>
          <div class="li_box">
            <el-tag
              v-for="tag in tags"
              :key="tag.name"
              closable
              :disable-transitions="false"
              @close="CloseTags(tag)"
              >
              {{tag.name}}
            </el-tag>
          </div>
          <div class="right_but">
            <el-button type="primary" size="mini" @click="burdenBtn">添加配料</el-button>
            <i class="el-icon-info"></i>
          </div>
        </div> -->

        <!-- <div class="form_box">
          <h5>添加赠送+</h5>
          <div class="li_box">
            <el-tag
              v-for="tag in tags"
              :key="tag.name"
              closable
              :disable-transitions="false"
              @close="CloseTags(tag)"
              >
              {{tag.name}}
            </el-tag>
          </div>
          <div class="right_but">
            <el-button type="primary" size="mini" @click="presentBtn">添加赠送</el-button>
            <i class="el-icon-info"></i>
          </div>
        </div> -->

        <div class="form_box">
          <h5>推送</h5>
          <div class="li_box" v-if="tuisong">
          </div>
          <div v-else>
            <div class="tuis_box">
              <div class="head_box">
                <span>NO.1</span>
                <el-input size="mini"></el-input><span>天</span>
                <el-input size="mini"></el-input><span>分钟</span>
                <el-input size="mini"></el-input><span>小时</span>
                <i class="el-icon-close"></i>
              </div>
              <textarea class="scroll"></textarea>
            </div>
            <div class="tuis_box">
              <div class="head_box">
                <span>NO.1</span>
                <el-input size="mini"></el-input><span>天</span>
                <el-input size="mini"></el-input><span>分钟</span>
                <el-input size="mini"></el-input><span>小时</span>
                <i class="el-icon-close"></i>
              </div>
              <textarea class="scroll"></textarea>
            </div>
          </div>

          <div class="right_but">
            <el-button type="primary" size="mini">添加推送</el-button>
            <i class="el-icon-info"></i>
          </div>
        </div>
        <div class="form_box">
          <h5>其它信息</h5>
          <el-form ref="projectDetail" v-model="projectDetail" label-width="170px" label-position='left'>
            <el-form-item label="折扣信息">
              <el-radio-group v-model="projectDetail.isDiscount">
                <el-radio :label="'0'">参与会员折扣</el-radio>
                <el-radio :label="'1'">不参与会员折扣</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否支持上面服务">
              <el-radio-group v-model="projectDetail.isDoorService">
                <el-radio :label="'0'">否</el-radio>
                <el-radio :label="'1'">是</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否销售">
              <el-radio-group v-model="projectDetail.isSale">
                <el-radio :label="'0'">否</el-radio>
                <el-radio :label="'1'">是</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="在ipad上显示">
              <el-radio-group v-model="projectDetail.isIpadShow">
                <el-radio :label="'0'">否</el-radio>
                <el-radio :label="'1'">是</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="作为ipad推荐项目">
              <el-radio-group v-model="projectDetail.isIpadRecommendProject">
                <el-radio :label="'0'">否</el-radio>
                <el-radio :label="'1'">是</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="消耗提成类型" class="radio-input">
              <el-radio-group v-model="projectDetail.commissionType" >
                <el-radio :label="'0'">消耗固定提成</el-radio>
                <el-radio :label="'1'">消耗百分比提成</el-radio>
              </el-radio-group>
              <div class="other" v-if="projectDetail.commissionType==0">
                <span>提成金额</span>
                <el-input size="mini" v-model="projectDetail.commissionMoney"></el-input>
              </div>
              <div class="other" v-else>
                <span>百分比例</span>
                <el-input size="mini" v-model="projectDetail.commissionPercentage"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="销售提成类型" class="radio-input">
              <el-radio-group v-model="projectDetail.commissionType" >
                <el-radio :label="'0'">消耗固定提成</el-radio>
                <el-radio :label="'1'">消耗百分比提成</el-radio>
              </el-radio-group>
              <div class="other" v-if="projectDetail.commissionType==0">
                <span>提成金额</span>
                <el-input size="mini" v-model="projectDetail.commissionMoney"></el-input>
              </div>
              <div class="other" v-else>
                <span>百分比例</span>
                <el-input size="mini" v-model="projectDetail.commissionPercentage"></el-input>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="footer">
        <el-button size="medium" onclick="history.back()">取　消</el-button>
        <el-button type="primary" size="medium" @click="saveBtn">保　存</el-button>
      </div>

      <el-dialog :visible.sync="burdenDialog" title="编辑配料" width="1050px" class="burbox">
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

      <el-dialog title="新增赠送" :visible.sync="presentDialog" width="1000px">
        <div class="form_box">
          <h5>选择</h5>
          <el-form ref="projectDetail" v-model="projectDetail" label-width="120px" label-position='left'>
            <el-form-item label="类型">
              <el-radio-group v-model="projectDetail.type">
                <el-radio :label="'0'">代金券</el-radio>
                <el-radio :label="'1'">现金券</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否专项">
              <el-radio-group v-model="projectDetail.exclusive">
                <el-radio :label="'1'">通用</el-radio>
                <el-radio :label="2">专项</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
        <div class="form_box">
          <h5>设置</h5>
          <el-form ref="projectDetail" v-model="projectDetail" label-width="120px" label-position='left'>
            <el-form-item label="额度（元）">
              <el-input size="medium" v-model="projectDetail.desc"></el-input>
            </el-form-item>
            <el-form-item label="数量（张）">
              <el-input size="medium" v-model="projectDetail.desc"></el-input>
            </el-form-item>
            <el-form-item label="有效期（天）">
              <el-input size="medium" v-model="projectDetail.desc"></el-input>
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
import { projectDetail, editproject } from '@/api/product'
import { clone } from '@/utils/common'
import page from '@/components/common/page'
const cityOptions = ['上海', '北京', '广州', '深圳', '上海', '北京', '广州', '深圳']
export default {
  name: 'app',
  data() {
    return {
      imageUrl: '',
      tuisong: false,
      checkedCities1: ['上海', '北京'],
      cities: cityOptions,
      search: '',
      bed: 1,
      input: '',
      voucherDialog: false,
      imageUrl: 'static/img/phone.png',
      projectDetail: '',  // 详情
      skin: false,      // 肤质
      effect: false,    // 功效
      burdenDialog: false,    // 配料
      presentDialog: false,
      textarea: '',
      materials_arr: '',
      materials_data: '',
      tags: [
        {name: '标签一'},
        {name: '标签二'},
        {name: '标签三'},
        {name: '标签四'},
        {name: '标签五'},
        {name: '标签一'},
        {name: '标签二'},
        {name: '标签三'},
        {name: '标签四'},
        {name: '标签五'}
      ]
    }
  },
  created() {
    this.getprojectDetail()
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    CloseTags(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    },
    // 获取项目详情
    getprojectDetail() {
      projectDetail(this.$route.params.id).then(res => {
        console.log('项目详情', res)
        this.projectDetail = res.data.data
      })
    },
    // 保存修改
    saveBtn() {
      editproject(this.projectDetail).then(res => {
        console.log('保存修改', res)
        if (res.data.code == 200) {
          this.$router.push('/project')
          this.$message.success('修改成功!')
        } else {
          this.$message.error('新增失败!')
        }
      })
    },
    skinBtn() {
      this.skin = true
    },
    skinClose() {
      this.skin = false
    },
    effectBtn() {
      this.effect = true
    },
    effectClose() {
      this.effect = false
    },
    sureBurden() {
    },
    burdenBtn() {
      this.burdenDialog = true
    },
    presentBtn() {
      this.presentDialog = true
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style>

.form_box .el-form-item__label{
  color: #5E6D82
}
.li_box .el-checkbox__label {
    font-size: 16px;
}
.uploader .el-upload{
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
</style>

<style scoped lang="scss">
.main-content{
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
    width: 700px;
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
  width: 100%;
  margin: 30px auto;
  h5{
    width: 180px;
    color:#475669;
    font-size: 16px;
    padding-top: 8px;
  }
  .el-form{
    width: 650px;
    .el-form-item {
      margin-bottom: 2px;
    }
    .el-radio{
      color:#1F2D3D;
      width:110px;
    }
    .el-cascader {
      width: 230px;
    }
  }
  .right_but{
    margin-left: 40px;
    .el-icon-info{
      color: #3bb3ff;
      font-size: 22px;
      margin-left: 20px;
      cursor: pointer;
    }
  }
}
.uploader_box{
  padding-top: 30px;
  width: 250px;
  text-align: center;
  p{
    font-size: 14px;
    color:#999;
    padding-top: 10px;
  }
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.form_top .el-form .el-form-item {
  margin-bottom: 10px;
  .el-input{
    width: 260px;
  }
}
.li_box{
  width: 800px;
  border:1px solid #C0CCDA;
  .el-tag{
    margin: 10px 0px 10px 20px;
  }
  .el-checkbox-group{
    padding: 5px 20px;
    .el-checkbox {
      margin-left: 0px;
      width: 120px;
      line-height: 40px;
    }
  }
  .edit_box{
    border-top:1px solid #C0CCDA;
    padding: 0px 20px;
    background: #F7F7F7;
    line-height: 40px;
    text-align: right;
    .el-input{
      width: 150px;
      margin-right: 20px;
    }
  }
}
.tuis_box{
  width: 800px;
  border:1px solid #C0CCDA;
  margin-bottom: 20px;
  .head_box{
    border-bottom: 1px solid #C0CCDA;
    padding: 0px 20px;
    background: #F7F7F7;
    line-height: 40px;
    text-align: left;
    color:#666;
    span:first-child{
      font-weight: bold;
      color:#475669;
    }
    .el-input{
      margin: 0 5px 0 30px;
      width: 80px;
    }
    i{
      font-size: 20px;
      float: right;
      padding-top: 12px;
      cursor: pointer;
    }
  }
  textarea{
    width: 100%;
    outline: none;
    resize: none;
    border: 0;
    color: #333;
    box-sizing: border-box;
    line-height: 24px;
    padding:5px 12px;
  }
}
.radio-input{
  .other{
    float: right;
    span{
      border-left: 1px solid #999;
      padding: 0 10px 0 20px;
    }
  }
  .el-input{
      width: 100px;
  }
}


</style>
