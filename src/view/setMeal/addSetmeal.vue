<template>
  <div >
      <div class="header_title"><span><router-link to="/setMeal">套餐</router-link> <i class="el-icon-arrow-right"></i> 添加套餐</span><i class="el-icon-info"></i></div>
      <div class="main-content scroll">
        <div class="form_box form_top">
          <h5>基础信息</h5>
          <el-form ref="form" :model="form" label-width="120px" label-position='left'>
            <el-form-item label="宝贝编号">
              <span>23532423453453422346364W</span>
            </el-form-item>
            <el-form-item label="套餐名称">
              <el-input size="medium" v-model="form.packageName"></el-input>
            </el-form-item>
            <el-form-item label="套餐价格">
              <el-input size="medium" v-model="form.packagePrice"></el-input>
            </el-form-item>
            <el-form-item label="有效天数">
              <el-input size="medium" v-model="form.effectiveDays"></el-input>
            </el-form-item>
            <!-- <el-form-item label="耗时(分钟)">
              <el-input size="medium" v-model="form.desc"></el-input>
            </el-form-item> -->
            <el-form-item label="所属类目">
              <el-input size="medium" v-model="form.desc"></el-input>
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

        <div class="form_box">
          <h5>其它信息</h5>
          <el-form ref="form" :model="form" label-width="170px" label-position='left'>
            <el-form-item label="折扣信息">
              <el-radio-group v-model="form.isDiscount">
                <el-radio :label="0">参与会员折扣</el-radio>
                <el-radio :label="1">不参与会员折扣</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否支持上面服务">
              <el-radio-group v-model="form.isDoorService">
                <el-radio :label="0">否</el-radio>
                <el-radio :label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否销售">
              <el-radio-group v-model="form.isSale">
                <el-radio :label="0">否</el-radio>
                <el-radio :label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="在ipad上显示">
              <el-radio-group v-model="form.isIpadShow">
                <el-radio :label="0">否</el-radio>
                <el-radio :label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="作为ipad推荐项目">
              <el-radio-group v-model="form.isIpadRecommendProject">
                <el-radio :label="0">否</el-radio>
                <el-radio :label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="消耗提成类型" class="radio-input">
              <el-radio-group v-model="form.commissionType" >
                <el-radio :label="0">消耗固定提成</el-radio>
                <el-radio :label="1">消耗百分比提成</el-radio>
              </el-radio-group>
              <div class="other" v-if="form.expend==0">
                <span>提成金额</span>
                <el-input size="mini" v-model="form.commissionMoney"></el-input>
              </div>
              <div class="other" v-else>
                <span>百分比例</span>
                <el-input size="mini" v-model="form.commissionPercentage"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="销售提成类型" class="radio-input">
              <el-radio-group v-model="form.commissionType" >
                <el-radio :label="0">消耗固定提成</el-radio>
                <el-radio :label="1">消耗百分比提成</el-radio>
              </el-radio-group>
              <div class="other" v-if="form.market==0">
                <span>提成金额</span>
                <el-input size="mini" v-model="form.commissionMoney"></el-input>
              </div>
              <div class="other" v-else>
                <span>百分比例</span>
                <el-input size="mini" v-model="form.commissionPercentage"></el-input>
              </div>
            </el-form-item>
          </el-form>
        </div>

        <div class="form_box setmeal_main">
          <h5>套餐明细</h5>
          <div class="contents">
            <el-dropdown @command="handleCommand">
              <el-button type="primary" size="small">
                添加组合
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">项目</el-dropdown-item>
                <el-dropdown-item command="b">产品</el-dropdown-item>
                <el-dropdown-item command="c">代金券</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div v-for="item in addList">
              <div class="meal_box" v-if="item.type == '产品'">
                <div class="head_box">
                  <span>NO.2</span>
                  <span>类型<em>{{item.type}}</em></span>
                  <span>组合名称<el-input size="mini" v-model="item.name"></el-input></span>
                  <span>是否必选
                    <el-radio-group v-model="item.isNecessary">
                      <el-radio :label="1">否</el-radio>
                      <el-radio :label="2">是</el-radio>
                    </el-radio-group>
                  </span>
                  <span>次数<el-input size="mini" class="count" v-model="item.inputCount"></el-input></span>
                  <i class="el-icon-close"></i>
                </div>
                <div class="set_table">
                  <el-table
                    :data="item.tableData"
                    stripe
                    style="width: 100%"
                    max-height="600"
                    tooltip-effect="dark"
                    >
                    <el-table-column
                      prop="name"
                      label="名称">
                    </el-table-column>
                    <el-table-column
                      prop="room"
                      label="产品价格">
                    </el-table-column>
                    <el-table-column
                      label="删除">
                      <template slot-scope="scope">
                        <i class="el-icon-delete" @click="deleteBtn(scope.$index,scope.row)"></i>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="addbtn">添加+</div>
                </div>
              </div>
              <div class="meal_box" v-if="item.type == '项目'">
                <div class="head_box">
                  <span>NO.2</span>
                  <span>类型<em>{{item.type}}</em></span>
                  <span>组合名称<el-input size="mini" v-model="item.name"></el-input></span>
                  <span>是否必选
                    <el-radio-group v-model="item.isNecessary">
                      <el-radio :label="1">否</el-radio>
                      <el-radio :label="2">是</el-radio>
                    </el-radio-group>
                  </span>
                  <span>次数<el-input size="mini" class="count" v-model="item.inputCount"></el-input></span>
                  <span>每次最多可选次数<el-input size="mini" class="count" v-model="item.maxCount"></el-input></span>
                  <i class="el-icon-close"></i>
                </div>
                <div class="set_table">
                  <el-table
                    :data="item.tableData"
                    stripe
                    style="width: 100%"
                    max-height="600"
                    tooltip-effect="dark"
                    >
                    <el-table-column
                      prop="name"
                      label="名称">
                    </el-table-column>
                    <el-table-column
                      prop="room"
                      label="消耗价格">
                    </el-table-column>
                    <el-table-column
                      prop="bed"
                      label="是否必选"
                      >
                      <template slot-scope="scope">
                        <el-switch
                          v-model="scope.row.value2"
                        >
                        </el-switch>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="删除">
                      <template slot-scope="scope">
                        <i class="el-icon-delete" @click="deleteBtn(scope.$index,scope.row)"></i>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="addbtn">添加+</div>
                </div>
              </div>
              <div class="meal_box" v-if="item.type == '代金券'">
                <div class="head_box">
                  <span>NO.2</span>
                  <span>类型<em>{{item.type}}</em></span>
                  <span>组合名称<el-input size="mini" v-model="item.name"></el-input></span>
                  <i class="el-icon-close"></i>
                </div>
                <div class="set_table">
                  <el-table
                    :data="item.tableData"
                    stripe
                    style="width: 100%"
                    max-height="600"
                    tooltip-effect="dark"
                    >
                    <el-table-column
                      prop="name"
                      label="名称">
                    </el-table-column>
                    <el-table-column
                      prop="room"
                      label="代金券金额（元）">
                    </el-table-column>
                    <el-table-column
                      label="删除">
                      <template slot-scope="scope">
                        <i class="el-icon-delete" @click="deleteBtn(scope.$index,scope.row)"></i>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="addbtn">添加+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="addGive">
          <el-button type="primary" size="small">
            添加赠送方案
          </el-button>
        </div>
      </div>
      <div class="footer">
        <el-button type="primary" size="medium">保　存</el-button>
      </div>
      <el-dialog :visible.sync="seatDialog" title="编辑配料" width="1050px" class="burbox">
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
            <!-- <el-table
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
            </el-table> -->
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="burdening = false" size="small">取 消</el-button>
          <el-button type="primary" @click="sureBurden" size="small">保存配料</el-button>
        </span>
      </el-dialog>

      <!-- <el-dialog title="新增赠送" :visible.sync="presentDialog" width="1000px">
        <div class="form_box">
          <h5>选择</h5>
          <el-form ref="form" :model="form" label-width="120px" label-position='left'>
            <el-form-item label="类型">
              <el-radio-group v-model="form.type">
                <el-radio :label="1">代金券</el-radio>
                <el-radio :label="2">现金券</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否专项">
              <el-radio-group v-model="              <el-radio :label="1">通用</el-radio>
                <el-radio :label="2">专项</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
        <div class="form_box">
          <h5>设置</h5>
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
      </el-dialog> -->

  </div>
</template>

<script>
const cityOptions = ['上海', '北京', '广州', '深圳','上海', '北京', '广州', '深圳']
export default {
  name: 'app',
  data() {
    return {
      materials_arr: [],
      mealType: '产品',
      imageUrl: '',
      tuisong: false,
      checkedCities1: ['上海', '北京'],
      cities: cityOptions,
      search: '',
      bed: 1,
      input: '',
      seatDialog: false,
      banner: 'static/img/phone.png',
      textarea: '',
      addList: [
        {
          name: '',
          type: '产品',
          isNecessary: 1, // 是否必选
          inputCount: '', // 次数
          tableData: [{
            date: '2016-05-02',
            name: '王狮传奇南山总店',
            phone: '13798661922',
            address: '上海市普陀区金沙江路 1518 弄',
            value2: ''
          }]
        },
        {
          name: '',
          type: '项目',
          isNecessary: 1, // 是否必选
          inputCount: '', // 次数
          maxCount: '', // 最多输入次数
          tableData: [{
            date: '2016-05-02',
            name: '王狮传奇南山总店',
            phone: '13798661922',
            address: '上海市普陀区金沙江路 1518 弄',
            value2: ''
          }]
        },
        {
          type: '代金券',
          name: '',
          tableData: [{
            date: '2016-05-02',
            name: '王狮传奇南山总店',
            phone: '13798661922',
            address: '上海市普陀区金沙江路 1518 弄',
            value2: ''
          }]
        }
      ],
      form: {
        packageName: '套餐名称', // 套餐名称
        packagePrice: '套餐价格', // 套餐价格
        effectiveDays: '', // 有效天数
        type: 1, // 是否必选
        region: '',
        desc: '',
        market: 1,
        expend: 1,
        isDiscount: 0,
        isDoorService: 0,
        isIpadShow: 0,
        isIpadRecommendProject: 0,
        isSale: 0, // 是否销售
        commissionType: 0, // 消耗提成类型
        commissionMoney: '', // 提成金额
        commissionPercentage: '' // 百分比例
      },
      // form1: {
      //   name: '',
      //   type: '产品',
      //   isNecessary: 1, // 是否必选
      //   inputCount: '', // 次数
      //   tableData: [{
      //     date: '2016-05-02',
      //     name: '王狮传奇南山总店',
      //     phone: '13798661922',
      //     address: '上海市普陀区金沙江路 1518 弄',
      //     value2: ''
      //   }]
      // },
      // form2: {
      //   name: '',
      //   type: '项目',
      //   isNecessary: 1, // 是否必选
      //   inputCount: '', // 次数
      //   maxCount: '', // 最多输入次数
      //   tableData: [{
      //     date: '2016-05-02',
      //     name: '王狮传奇南山总店',
      //     phone: '13798661922',
      //     address: '上海市普陀区金沙江路 1518 弄',
      //     value2: ''
      //   }]
      // },
      // form3: {
      //   type: '代金券',
      //   name: '',
      //   tableData: [{
      //     date: '2016-05-02',
      //     name: '王狮传奇南山总店',
      //     phone: '13798661922',
      //     address: '上海市普陀区金沙江路 1518 弄',
      //     value2: ''
      //   }]
      // },
      projectItem: {}, // 添加项目
      productItem: {}, // 添加产品
      voucherItem: {}, // 添加代金券
      tableData: [{
        date: '2016-05-02',
        name: '王狮传奇南山总店',
        phone: '13798661922',
        address: '上海市普陀区金沙江路 1518 弄',
        value2: ''
      }],
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
    added() {
      this.voucherDialog = true
    },
    //搜素客户
    searchBtn() {
      console.log('搜索')
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
    burdenBtn() {
      this.burdenDialog = true
    },
    presentBtn() {
      this.presentDialog = true
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    addseatBtn() {
      this.seatDialog = true
    },
    deleteBtn(index, item) {
      console.log(item)
    },
    sureBurden() {},
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
    },
    // 添加组合
    addGroup() {

    },
    handleCommand(command) {
      this.$message('click on item ' + command)
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
.addGive{
  padding-left: 180px
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
.contents{
  flex:1;
}
.setmeal_main{
  border-top: 1px solid #ddd;
  padding:20px 40px;
  margin-left: -40px;
  .meal_box{

    border:1px solid #C0CCDA;
    margin-top: 20px;
    .head_box{
      border-bottom: 1px solid #C0CCDA;
      padding: 0px 20px;
      background: #F7F7F7;
      line-height: 50px;
      text-align: left;
      color:#666;
      span:first-child{
        font-weight: bold;
        color:#475669;
      }
      span{
        margin-right: 30px;
      }
      em{
        margin-left: 10px;
        border:1px solid #ddd;
        border-radius: 4px;
        background: #fff;
        width: 80px;
        line-height: 26px;
        display: inline-block;
        text-align: center;
      }
      .el-input{
        margin: 0 30px 0 5px;
        width: 150px;
      }
      .el-input.count{
        width: 80px;
      }
      i{
        font-size: 20px;
        float: right;
        padding-top: 15px;
        cursor: pointer;
      }
    }
    .addbtn{
      margin-top: 8px;
      font-size: 14px;
      line-height: 40px;
      background: #F2F9FF;
      color: #20A0FF;
      text-align: center;
      cursor: pointer;
    }
    .set_table{
      padding: 20px;
      box-sizing: border-box;
    }
  }
}

</style>
