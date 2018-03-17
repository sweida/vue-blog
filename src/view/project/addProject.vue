<template>
  <div >
      <div class="header_title"><span><router-link to="/project">项目</router-link> <i class="el-icon-arrow-right"></i> {{form.projectId?"编辑项目":"添加项目"}}</span><i class="el-icon-info"></i></div>
      <div class="main-content scroll">
        <div class="form_box form_top">
          <h5>基础信息</h5>
          <el-form ref="form" v-model="form" label-width="120px" label-position='left'>
            <el-form-item label="宝贝编号" v-if="form.projectId">
              <span>{{form.projectId}}</span>
            </el-form-item>
            <el-form-item label="宝贝名称">
              <el-input size="medium" v-model="form.projectName"></el-input>
            </el-form-item>
            <el-form-item label="所属类目">
              <el-cascader
                placeholder="请选择类目名称"
                @change="handleItemChange"
                v-model="selectedOptions"
                change-on-select
                :options="menuList"
                :props="defaultProps"
                :clearable="true">
              </el-cascader>
            </el-form-item>
            <el-form-item label="价格">
              <el-input size="medium" type="number" v-model="form.projectPrice" ></el-input>
            </el-form-item>
            <el-form-item label="会员价格">
              <el-input size="medium" type="number" v-model="form.discountPrice" ></el-input>
            </el-form-item>
            <el-form-item label="有效天数">
              <el-input size="medium" type="number" v-model="form.availabilityDay" ></el-input>
            </el-form-item>
            <el-form-item label="耗时(分钟)">
              <el-select v-model="form.consumeTime" size="medium" placeholder="请选择">
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
          <div>
            <span class="moredes" @click="moredes=!moredes">展开需知与描述 <i class="el-icon-arrow-down"></i></span>
            <transition name="el-zoom-in-top">
              <div v-show="moredes" class="transition-box">
                <div><vue-editor v-model="form.detail"></vue-editor></div>
                <div class="form_box">
                  <h6>适合肤质</h6>
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
                  <h6>功效</h6>
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
              </div>
            </transition>
          </div>

        </div>

        <div class="form_box">
          <h5>配料</h5>
          <div class="li_box">
            <el-tag
              v-for="(Burden,index) in form.ccProjectMaterialList"
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

        <div class="form_box">
          <h5>优惠赠送</h5>
          <div class="li_box">
            <el-tag
            v-for="(item, index) in ccProjectGiveList"
            :key="item.id"
            closable
            :disable-transitions="false"
            @close="CloseGiveTags(index)"
            >
            {{item.projectName +'（*'+item.projectNum+'）'}}
            </el-tag>
          </div>
          <div class="right_but">
            <el-button type="primary" size="mini" @click="addGiveList">添加赠送</el-button>
            <i class="el-icon-info"></i>
          </div>
        </div>

        <!-- <div class="form_box">
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
        </div> -->

        <div class="form_box">
          <h5>其它信息</h5>
          <el-form ref="form" :model="form" label-width="170px" label-position='left'>
            <el-form-item label="折扣信息">
              <el-radio-group v-model="form.isDiscount">
                <el-radio :label="'0'">不参与会员折扣</el-radio>
                <el-radio :label="'1'">参与会员折扣</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否销售">
              <el-radio-group v-model="form.isSale">
                <el-radio :label="'0'">否</el-radio>
                <el-radio :label="'1'">是</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否支持上面服务">
              <el-radio-group v-model="form.isDoorService">
                <el-radio :label="'0'">否</el-radio>
                <el-radio :label="'1'">是</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="在ipad上显示">
              <el-radio-group v-model="form.isIpadShow">
                <el-radio :label="'0'">否</el-radio>
                <el-radio :label="'1'">是</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="作为ipad推荐项目">
              <el-radio-group v-model="form.isIpadRecommendProject">
                <el-radio :label="'0'">否</el-radio>
                <el-radio :label="'1'">是</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="销售提成类型" class="radio-input">
              <el-radio-group v-model="form.commissionType" >
                <el-radio :label="'0'">消耗固定提成</el-radio>
                <el-radio :label="'1'">消耗百分比提成</el-radio>
              </el-radio-group>
              <div class="other" v-if="form.commissionType=='0'">
                <span>提成金额</span>
                <el-input type="number" size="mini" v-model="form.commissionMoney"></el-input>
              </div>
              <div class="other" v-else>
                <span>百分比例</span>
                <el-input type="number" size="mini" v-model="form.commissionPercentage"></el-input>%
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="footer">
        <el-button size="medium" onclick="history.back()">取　消</el-button>
        <el-button type="primary" size="medium" @click="editBtn" v-if="form.projectId">保存修改</el-button>
        <el-button type="primary" size="medium" @click="saveBtn" v-else>保　存</el-button>
      </div>

      <!-- 配料弹框 -->
      <el-dialog :visible.sync="burdenDialog" title="编辑配料" width="1200px" class="burbox">
        <div class="tableDialog">
          <div class="tabs scroll">
            <p class="nav-title" @click="allBurden" :class="{active:activeP}">
              <span>所有配料</span>
            </p>
            <p class="nav-title">
              <span>载入历史配方</span>
            </p>
            <el-menu class="el-menu-vertical-demo">
              <template v-for="(item, index) in diolmenuList" :keys="index">
                <el-submenu :index="item.url">
                  <template slot="title" >
                    <span >{{item.name}}</span>
                  </template>
                  <template v-for="(child, index1) in item.childMenu" :keys="index1">
                    <el-menu-item :index="child.url" v-if="child.childMenu==null || child.childMenu==''">
                      <div @click="changeMenu(child)">
                        <span>{{child.name}}</span>
                      </div>
                    </el-menu-item>
                    <el-submenu :index="child.url" v-else>
                      <template slot="title" >
                        <div @click="changeMenu(child)">
                          <span >{{child.name}}</span>
                        </div>
                      </template>
                      <template v-for="(son, index1) in child.childMenu" :keys="index1">
                        <el-menu-item :index="son.url" v-if="son.childMenu==null || son.childMenu==''" @click="changeMenu(son)">
                          <span>{{son.name}}</span>
                        </el-menu-item>
                      </template>
                    </el-submenu>
                  </template>
                </el-submenu>
              </template>
            </el-menu>
          </div>
          <ul class="projectbox scroll" v-if="projectList.length!=0">
            <li class="projectli" v-for="(item) in projectList" @click="projectBur(item)" :class="{active:activeNav==item.id}">{{item.projectName}}</li>
          </ul>
          <div class="burli1">
            <el-table
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
              :data="form.ccProjectMaterialList"
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
      <!-- 添加赠送方案 -->
       <addGive ref="addGiveChild" :burdening="presentDialog" @saveGive="saveGive" @cancelGive="cancelGive"></addGive>
  </div>
</template>

<script>
import { addproject, getproject, getTagli, addTag, delTag, getBurden, getprojectBurden, projectDetail, editproject } from '@/api/product'
import { mixppMenu, projectMenu } from '@/api/tree'
import addGive from '@/components/common/addGive'
import page from '@/components/common/page'
import { clone } from '@/utils/common'
import { VueEditor } from 'vue2-editor'
export default {
  name: 'app',
  components: {
    VueEditor,
    addGive
  },
  data() {
    return {
      menuList: [],   // 菜单
      defaultProps: {
        children: 'childMenu',
        value: 'id',
        label: 'name'
      },
      moredes: false,
      skinList: [],
      checkSkin: [],
      skinInput: '',
      editSkin: true, // 肤质
      effectList: [],
      checkEffect: [],
      effectInput: '',
      editEffect: true, // 功效
      burdenDialog: false,    // 配料
      diolmenuList: '',       // 配料菜单
      projectList: '',        // 项目列表
      activeNav: false,
      activeP: true,
      MenuParam: [],
      imageUrl: '/static/img/phone.png',
      presentDialog: false,
      tuisong: false,   // 推送
      textarea: '',
      selectedOptions: [],
      ccProjectGiveList: [], //已选赠送
      form: {
        projectName: '',
        arrId: '',
        projectPrice: '',
        discountPrice: '',
        projectType: '',
        availabilityDay: 3650,  // 有效天数
        consumeTime: 60,      // 耗时
        parentId: '',         // 父id
        detail: '',           // 文章
        ccProjectMaterialList: [],   // 配料
        // isMateriel: 0,        // 是否有配料
        isSale: '1',            // 是否销售
        isDiscount: '1',
        isDoorService: '0',
        isIpadShow: '0',
        isIpadRecommendProject: '0',
        commissionType: '0',
        commissionMoney: '',
        commissionPercentage: ''
      },
      materials_arr: [],

      hasget: [],
      pageModel: {
        page: 1,
        rows: 10,
        sumCount: 0
      },
      pageModel2: {
        page: 1,
        rows: 1000,
        sumCount: 0
      }
    }
  },
  created() {
    this.getTagskin()
    this.getTageffect()
    this.getBurdenlist()
    this.getmixMenu()
    if (this.$route.params.id != undefined) {
      this.getprojectDetail()
    }
  },
  methods: {

    // 获取项目产品菜单
    getmixMenu() {
      mixppMenu().then(res => {
        this.menuList = res.data.data
        console.log('获取项目和产品菜单', res)
      })
    },
    // 选择类目获取id
    handleItemChange(val) {
      this.form.arrId = val.join(',')
      this.form.parentId = val[val.length - 1]
      this.form.projectType = val[0]
      console.log('点击', val, val[val.length - 1], this.form.arrId)
    },
    // 获取项目详情
    getprojectDetail() {
      projectDetail(this.$route.params.id).then(res => {
        this.form = res.data.data
        this.checkSkin = res.data.data.fitSkin.split(',')
        this.checkEffect = res.data.data.effect.split(',')
        this.ccProjectGiveList = res.data.data.ccProjectGiveList
        let arr = res.data.data.arrId.split(',')
        this.selectedOptions = arr.map((item) => {
          return +item
        })
        console.log('项目详情', res, this.$route.params.id, this.form)
      })
    },
    // 保存
    saveBtn() {
      let param = Object.assign({
        enterpriseId: '001',
        fitSkin: this.checkSkin.join(','),    // 肤质
        effect: this.checkEffect.join(','),   // 功效
        ccProjectPushList: [],                // 推送
        isGive: 0,
        ccProjectGiveList: this.ccProjectGiveList
      }, this.form)
      if (this.form.projectName == '' || this.form.projectPrice == '') {
        this.$message.error('项目名称、类目和价格不能为空')
      } else if (this.form.arrId.length < 2) {
        this.$message.error('请选择一个分类')
      } else {
        addproject(param).then(res => {
          console.log('添加项目', res)
          if (res.data.code == 200) {
            this.$router.push('/project')
            this.$message.success('新增成功!')
          } else {
            this.$message.error('新增失败!')
          }
        })
      }
    },
    // 保存修改
    editBtn() {
      if (this.form.projectName == '' || this.form.projectPrice == '') {
        this.$message.error('项目名称、类目和价格不能为空')
      } else if (this.form.arrId.length < 2) {
        this.$message.error('请选择一个分类')
      } else {
        this.form.fitSkin = this.checkSkin.join(',')
        this.form.effect = this.checkEffect.join(',')
        this.form.ccProjectGiveList = this.ccProjectGiveList
        editproject(this.form).then(res => {
          console.log('保存修改', res)
          if (res.data.code == 200) {
            this.$router.push('/project')
            this.$message.success('修改成功!')
          } else {
            this.$message.error('新增失败!')
          }
        })
      }
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
    // 配料弹框
    burdenBtn() {
      this.burdenDialog = true
      // 获取项目产品菜单
      projectMenu().then(res => {
        this.diolmenuList = res.data.data
        console.log('获取项目菜单', res)
      })
    },
    // 点击所有配料
    allBurden() {
      this.projectList = []
      this.activeP = true
      this.getBurdenlist()
    },
    // 改变菜单时得到列表数据
    changeMenu(child) {
      console.log('changeMenu', child.id)
      this.MenuParam = {
        parentId: child.id
      }
      this.getprojectList()
    },
    // 获取项目列表
    getprojectList() {
      getproject(this.pageModel2, this.MenuParam).then(res => {
        console.log('获取项目列表', res)
        this.pageModel2.sumCount = res.data.data.total
        this.projectList = res.data.data.rows
      })
    },
    // 点击项目获取配料
    projectBur(item) {
      this.activeNav = item.id
      this.activeP = false
      let param = {
        enterpriseId: '001',
        projectId: item.id
      }
      getprojectBurden(this.pageModel, param).then(res => {
        console.log('载入项目配料', res.data.data.rows)
        this.pageModel2.sumCount = res.data.data.total
        this.form.ccProjectMaterialList = res.data.data.rows
      })
    },
    // 获取配料列表
    getBurdenlist() {
      getBurden(this.pageModel, {}).then(res => {
        console.log('获取配料列表', res)
        this.materials_arr = res.data.data.rows
      })
    },
    // 添加配料
    addMaterials(val) {
      this.form.ccProjectMaterialList = val
      console.log(val)
    },
    // 删除配料tag
    CloseBurdenTags(index) {
      this.form.ccProjectMaterialList.splice(index, 1)
    },
    // 添加赠送
    // 添加赠送方案按钮
    addGiveList() {
      this.$refs.addGiveChild.materials_data = []
      this.$refs.addGiveChild.materials_arr = []
      this.$refs.addGiveChild.checkGoodIds = []
      this.presentDialog = true
    },
    // 删除赠送
    CloseGiveTags(index) {
      this.ccProjectGiveList.splice(index, 1)
    },
    // 监听保存
    saveGive(val) {
      this.ccProjectGiveList = val
      this.presentDialog = false
    },
    // 监听取消保存
    cancelGive() {
      this.presentDialog = false
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

.form_box{
  display: flex;
  position: relative;
  width: 100%;
  margin: 30px auto;
  h5{
    width: 180px;
    color:#475669;
    font-size: 16px;
    padding-top: 8px;
  }
  h6{
    color:#7f868e;
    font-size: 15px;
    position: absolute;
    left: -80px;
  }
  .moredes{
    font-size: 16px;
    color: #409EFF;
    line-height: 34px;
    padding-bottom: 8px;
    display: table;
    cursor: pointer;
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
      width: 260px;
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
.burli2{
  width: 400px
}
.tableDialog .tabs .nav-title{
  background: none;
  cursor: pointer;
}
.tableDialog .tabs .nav-title:nth-of-type(2){
  margin-top: 10px;
}
.projectbox{
  height: 100%;
  border-right: 2px solid #f3f8fe;
  padding: 30px 0;
  box-sizing: border-box;
}
.projectli{
  width: 120px;
  padding: 0 10px;
  box-sizing: border-box;
  line-height: 36px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.projectli.active{
  color: #409EFF;
}
.tableDialog .tabs .nav-title.active{
  background: #f5f5f5;
}
</style>
