<template>
  <div >
    <!-- <el-menu
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
    </el-menu> -->
      <div class="header_title"><span><router-link to="/project">项目</router-link> <i class="el-icon-arrow-right"></i> 添加项目</span><i class="el-icon-info"></i></div>
      <div class="main-content scroll">
        <div class="form_box form_top">
          <h5>基础信息</h5>
          <el-form ref="projectDetail" v-model="projectDetail" label-width="120px" label-position='left'>
            <el-form-item label="宝贝编号">
              <span>{{projectDetail.projectId}}</span>
            </el-form-item>
            <el-form-item label="宝贝名称">
              <el-input size="medium" v-model="projectDetail.projectName"></el-input>
            </el-form-item>
            <el-form-item label="所属类目">
              <el-cascader
                placeholder="请选择类目名称"
                @change="handleItemChange"
                v-model="selectedOptions"
                change-on-select
                :options="projectDetail.parentId"
                :props="defaultProps"
                :clearable="true">
              </el-cascader>
            </el-form-item>
            <el-form-item label="价格">
              <el-input size="medium" v-model="projectDetail.projectPrice"></el-input>
            </el-form-item>
            <el-form-item label="有效天数">
              <el-input size="medium" v-model="projectDetail.availabilityDay"></el-input>
            </el-form-item>
            <el-form-item label="耗时(分钟)">
              <el-select v-model="projectDetail.consumeTime" size="medium" placeholder="请选择">
                <el-option
                  v-for="item in 18"
                  :key="item.value"
                  :label="item*10"
                  :value="item*10">
                </el-option>
              </el-select>
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
          <h5>需知与描述</h5>
          <vue-editor v-model="projectDetail.detail"></vue-editor>
        </div>

        <div class="form_box">
          <h5>适合肤质</h5>
          <div class="li_box">
            <el-checkbox-group
              v-model="checkSkin"
              v-if="editSkin">
              <el-checkbox v-for="skin in skinList" :label="skin" :key="skin">{{skin}}</el-checkbox>
            </el-checkbox-group>
            <template v-else>
              <el-tag
                v-for="skin in skinList"
                :key="skin"
                closable
                :disable-transitions="false"
                @close="CloseSkinTags(skin)"
                >
                {{skin}}
              </el-tag>
              <div class="edit_box" >
                <el-input size="mini" v-model="skinInput"></el-input>
                <el-button type="primary" size="mini" @click='addSkin'>新增</el-button>
                <el-button size="mini" @click="skinClose">取消</el-button>
              </div>
            </template>
          </div>
          <div class="right_but">
            <el-button type="primary" size="mini" @click="skinBtn">编辑肤质</el-button>
            <i class="el-icon-info"></i>
          </div>
        </div>

        <div class="form_box">
          <h5>功效</h5>
          <div class="li_box">
            <el-checkbox-group
              v-model="checkEffect"
              v-if="editEffect">
              <el-checkbox v-for="effect in effectList" :label="effect" :key="effect">{{effect}}</el-checkbox>
            </el-checkbox-group>
            <template v-else>
              <el-tag
                v-for="effect in effectList"
                :key="effect"
                closable
                :disable-transitions="false"
                @close="CloseEffectTags(effect)"
                >
                {{effect}}
              </el-tag>
              <div class="edit_box" >
                <el-input size="mini" v-model="effectInput"></el-input>
                <el-button type="primary" size="mini" @click='addEffect'>新增</el-button>
                <el-button size="mini" @click="effectClose">取消</el-button>
              </div>
            </template>
          </div>
          <div class="right_but">
            <el-button type="primary" size="mini" @click="effectBtn">编辑功效</el-button>
            <i class="el-icon-info"></i>
          </div>
        </div>

        <div class="form_box">
          <h5>配料</h5>
          <div class="li_box">
            <el-tag
              v-for="(Burden,index) in projectDetail.ccProjectMaterialList"
              :key="Burden.materialName"
              closable
              :disable-transitions="false"
              @close="CloseBurdenTags(index)"
              >
              {{Burden.materialName+Burden.materialNum+Burden.unit}}
            </el-tag>
          </div>
          <div class="right_but">
            <el-button type="primary" size="mini" @click="burdenBtn">添加配料</el-button>
            <i class="el-icon-info"></i>
          </div>
        </div>

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
            <p>载入配方</p>
          </div>
          <div class="burli1">
            <el-table
              ref="multipleTable"
              :data="materials_arr"
              stripe
              style="width:100%"
              max-height='450'
              tooltip-effect="dark"
              @selection-change="addMaterials"
              >
              <el-table-column
                prop="materialName"
                label="配料名称"
                >
              </el-table-column>
              <el-table-column
                prop="unit"
                label="单位">
              </el-table-column>
              <el-table-column
              type="selection"
              width="80">
              </el-table-column>
            </el-table>
            <page :pageModel="pageModel" @selectList="selectRoleList" v-if="pageModel.sumCount>10"></page>
          </div>
          <!-- 默认配料 -->
          <div class="burli2">
            <el-table
              :data="projectDetail.ccProjectMaterialList"
              stripe
              max-height='200'
              tooltip-effect="dark"
            >
              <el-table-column
                prop="materialName"
                label="已添加配料"
                >
              </el-table-column>
              <el-table-column
                prop="unit"
                label="单位"
                >
              </el-table-column>
              <el-table-column
                prop="materialNum"
                label="数量">
                <template slot-scope="scope" >
                  <el-input-number v-model="scope.row.materialNum" :min="1"></el-input-number>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="burdenDialog = false" size="small">确 定</el-button>
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
import { projectDetail, editproject, getTagli, addTag, delTag, getBurden } from '@/api/product'
import { clone } from '@/utils/common'
import page from '@/components/common/page'
import { VueEditor } from 'vue2-editor'
export default {
  name: 'app',
  components: {
     VueEditor
  },
  data() {
    return {
      skinList: ['干性', '混合性', '干燥', '中性', '过敏', '粗糙', '暗沉', '敏感', '暗哑'],
      checkSkin: [],
      skinInput: '',
      editSkin: true, // 肤质
      effectList: ['保湿', '去痘', '祛斑', '美白', '抗衰', '嫩肤补水', '纤体瘦身', '去脂修复', '淡痕', '清新淡雅'],
      checkEffect: [],
      effectInput: '',
      editEffect: true, // 功效
      tuisong: false,
      search: '',
      bed: 1,
      input: '',
      voucherDialog: false,
      imageUrl: 'static/img/phone.png',
      projectDetail: '',  // 详情
      skin: false,      // 肤质
      effect: false,    // 功效
      presentDialog: false,
      textarea: '',
      burdenDialog: false,    // 配料
      materials_arr: [],    // 配料
      materials_data: [],
      selectedOptions: [],
      defaultProps: {
        children: 'childMenu',
        value: 'id',
        label: 'name'
      },
      hasget: [],
      pageModel: {
        page: 1,
        rows: 10,
        sumCount: 0
      }
    }
  },
  created() {
    this.getprojectDetail()
    this.getTagskin()
    this.getTageffect()
    this.getBurdenlist()
    console.log('bb', this.materials_arr[0])
  },
  mounted() {
    console.log('aa', this.materials_arr[0])
    // this.toggleSelection(this.materials_arr[0])
    // this.$refs.multipleTable.toggleRowSelection(this.materials_arr[0])
  },
  methods: {

    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    // 获取肤质
    getTagskin() {
      getTagli(1).then(res => {
        this.skinList = res.data.data
        console.log('获取肤质', res)
      })
    },
    // 添加肤质
    addSkin() {
      if (this.skinInput == '') {
        this.$message.error('不能为空')
      } else {
        let param = {
          enterpriseId: '001',
          tagName: this.skinInput,
          tagType: 1
        }
        addTag(param).then(res => {
          if (res.data.code == 200) {
            console.log('添加肤质', res)
            this.skinInput = ''
            this.getTagskin()
          }
        })
      }
    },
    // 删除肤质
    CloseSkinTags(skin) {
      let param = {
        enterpriseId: '001',
        tagName: skin,
        tagType: 1
      }
      delTag(param).then(res => {
        console.log('删除肤质', res)
        if (res.data.code == 200) {
          this.skinList.splice(this.skinList.indexOf(skin), 1)
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    // 获取功效
    getTageffect() {
      getTagli(2).then(res => {
        this.effectList = res.data.data
        console.log('获取功效', res)
      })
    },
    // 添加功效
    addEffect() {
      if (this.effectInput == '') {
        this.$message.error('不能为空')
      } else {
        let param = {
          enterpriseId: '001',
          tagName: this.effectInput,
          tagType: 2
        }
        addTag(param).then(res => {
          if (res.data.code == 200) {
            console.log('添加功效', res)
            this.effectInput = ''
            this.getTageffect()
          }
        })
      }
    },
    // 删除功效
    CloseEffectTags(effect) {
      let param = {
        enterpriseId: '001',
        tagName: effect,
        tagType: 2
      }
      delTag(param).then(res => {
        console.log('删除功效', res)
        if (res.data.code == 200) {
          this.effectList.splice(this.effectList.indexOf(effect), 1)
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    // 肤质
    skinBtn() {
      this.editSkin = false
    },
    skinClose() {
      this.editSkin = true
    },
    // 功效
    effectBtn() {
      this.editEffect = false
    },
    effectClose() {
      this.editEffect = true
    },
    // 获取项目详情
    getprojectDetail() {
      projectDetail(this.$route.params.id).then(res => {
        this.projectDetail = res.data.data
        // this.materials_data = res.data.data.ccProjectMaterialList
        this.checkSkin = res.data.data.fitSkin.split(',')
        this.checkEffect = res.data.data.effect.split(',')
        console.log('项目详情', res)
      })
    },
    // 获取配料列表
    getBurdenlist() {
      getBurden(this.pageModel, {}).then(res => {
        console.log('获取配料列表', res, this.materials_arr)
        this.materials_arr = res.data.data.rows
        console.log('cc', this.materials_arr[0])
      })
    },
    // 添加配料
    addMaterials(val) {
      this.projectDetail.ccProjectMaterialList = val
      console.log(val)
    },
    // 删除配料tag
    CloseBurdenTags(index) {
      this.projectDetail.ccProjectMaterialList.splice(index, 1)
    },
    // 保存修改
    saveBtn() {
      this.projectDetail.fitSkin = this.checkSkin.join(',')
      this.projectDetail.effect = this.checkEffect.join(',')
      // this.projectDetail.ccProjectMaterialList = this.materials_data
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
    sureBurden() {
    },
    // 初始化选择
    // toggleSelection(rows) {
    //   if (rows) {
    //     rows.forEach(row => {
    //       this.$refs.materials_arr.toggleRowSelection(row)
    //     })
    //   }
    // },
    burdenBtn() {
      console.log('打开弹框', this.projectDetail.ccProjectMaterialList)
      this.burdenDialog = true
      // this.toggleSelection(this.materials_arr[0])
      // this.$refs.materials_arr.toggleRowSelection(this.materials_arr[0],true)

      // this.$refs.materials_arr.toggleRowSelection(this.projectDetail.ccProjectMaterialList)
      // toggleSelection(rows) {
      //   if (rows) {
      //     rows.forEach(row => {
      //     })
      //   }
      // },
      // this.toggleSelection(this.projectDetail.ccProjectMaterialList)
      // this.$refs.materials_arr.toggleRowSelection(2)
      // this.$refs.materials_arr.toggleRowSelection(row);
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
.form_box .ql-container{
  height: 200px;
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
  .quillWrapper{
    width: 75%;
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
    .el-select{
      width: 260px;
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
  min-height: 52px;
  .el-tag{
    margin: 10px 0px 10px 20px;
  }
  .el-checkbox-group{
    padding: 5px 20px;
    .el-checkbox {
      margin-left: 0px;
      width: 124px;
      line-height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
