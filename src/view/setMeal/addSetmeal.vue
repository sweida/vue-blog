<template>
  <div >
      <div class="header_title"><span><router-link to="/setMeal">套餐</router-link> <i class="el-icon-arrow-right"></i> {{form.packageId?"编辑套餐":"添加套餐"}}</span><i class="el-icon-info"></i></div>
      <div class="main-content scroll">
        <div class="form_box form_top">
          <h5>基础信息</h5>
          <el-form ref="form" :model="form" label-width="120px" label-position='left'>
            <el-form-item label="套餐编号" v-if="form.packageId">
              <span>{{form.packageId}}</span>
            </el-form-item>
            <el-form-item label="套餐名称">
              <el-input size="medium" v-model="form.packageName"></el-input>
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
            <el-form-item label="套餐价格">
              <el-input size="medium" type="number" v-model="form.packagePrice"></el-input>
            </el-form-item>
            <el-form-item label="有效天数">
              <el-input size="medium" type="number" v-model="form.effectiveDays"></el-input>
            </el-form-item>
            <el-form-item label="购买方式">
              <el-select v-model="form.purchaseMethod" size="medium">
                <el-option value="0" label="购买套餐">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="购买权限">
              <el-select v-model="form.purchaseAuthority" size="medium">
                <el-option value="0" label="所有客户均可购买"></el-option>
                <el-option value="1" label="一星经理人以上可购买"></el-option>
                <el-option value="2" label="二星经理人以上可购买"></el-option>
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
              </div>
            </transition>
          </div>

        </div>

        <div class="form_box">
          <h5>其它信息</h5>
          <el-form ref="form" :model="form" label-width="170px" label-position='left'>
            <el-form-item label="折扣信息">
              <el-radio-group v-model="form.isDiscounts">
                <el-radio :label="'0'">不参与会员折扣</el-radio>
                <el-radio :label="'1'">参与会员折扣</el-radio>
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
              <el-radio-group v-model="form.isIpadRecommend">
                <el-radio :label="'0'">否</el-radio>
                <el-radio :label="'1'">是</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="销售提成类型" class="radio-input">
              <el-radio-group v-model="form.salesPromotionMethod" >
                <el-radio :label="'0'">消耗固定提成</el-radio>
                <el-radio :label="'1'">消耗百分比提成</el-radio>
              </el-radio-group>
              <div class="other" v-if="form.salesPromotionMethod=='0'">
                <span>提成金额</span>
                <el-input type="number" size="mini" v-model="form.promotionMoney"></el-input>
              </div>
              <div class="other" v-else>
                <span>百分比例</span>
                <el-input type="number" size="mini" v-model="form.promotionPercentage"></el-input>%
              </div>
            </el-form-item>
          </el-form>
        </div>

        <div class="form_box setmeal_main">
          <h5>套餐明细</h5>
          <div class="contents">
            <el-dropdown @command="selectDown">
              <el-button type="primary" size="small">
                添加组合
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">项目</el-dropdown-item>
                <el-dropdown-item command="b">产品</el-dropdown-item>
                <el-dropdown-item command="c">代金券</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div v-for="(item, index) in ccPackageGroupVoList">
              <!-- 产品框 -->
              <div class="meal_box" v-if="item.groupType == 2">
                <div class="head_box">
                  <span>NO.{{index+1}}</span>
                  <span>类型<em>产品</em></span>
                  <span>组合名称<el-input size="mini" v-model="item.groupName"></el-input></span>
                  <!-- <span>总次数<el-input size="mini" class="count" type="number" v-model="item.groupTime"></el-input></span> -->
                  <i class="el-icon-close" @click="delGroup(index)"></i>
                </div>
                <div class="set_table">
                  <el-table
                    :data="item.ccPackageGroupDetailList"
                    stripe
                    style="width: 100%"
                    max-height="600"
                    tooltip-effect="dark"
                    >
                    <el-table-column
                      prop="projectName"
                      label="名称">
                    </el-table-column>
                    <el-table-column
                      width="100px"
                      label="产品价格">
                      <template slot-scope="scope">
                        <el-input size="mini" class="count" v-model="scope.row.projectPrice"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="删除">
                      <template slot-scope="scope">
                        <i class="el-icon-delete" @click="deleteBtn(scope.$index,item.ccPackageGroupDetailList)"></i>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="addbtn" @click="addProduct(index)">添加+</div>
                </div>
              </div>

              <!-- 项目框 -->
              <div class="meal_box" v-if="item.groupType == 1">
                <div class="head_box">
                  <span>NO.{{index+1}}</span>
                  <span>类型<em>项目</em></span>
                  <span>组合名称<el-input size="mini" v-model="item.groupName"></el-input></span>
                  <span>总使用次数<el-input size="mini" class="count" type="number" v-model="item.groupTime"></el-input></span>
                  <span>每次最多可选次数<el-input size="mini" class="count" type="number" v-model="item.maxOptionalNum"></el-input></span>
                  <i class="el-icon-close" @click="delGroup(index)"></i>
                </div>
                <div class="set_table">
                  <el-table
                    :data="item.ccPackageGroupDetailList"
                    stripe
                    style="width: 100%"
                    max-height="600"
                    tooltip-effect="dark"
                    >
                    <el-table-column
                      prop="projectName"
                      label="名称">
                    </el-table-column>
                    <el-table-column
                      width="100px"
                      label="消耗价格">
                      <template slot-scope="scope">
                        <el-input size="mini" class="count" v-model="scope.row.projectPrice"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="bed"
                      label="是否必选"
                      >
                      <template slot-scope="scope">
                        <el-switch
                          v-model="scope.row.isMandatory"
                          active-value="1"
                          inactive-value="0"
                        >
                        </el-switch>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="删除">
                      <template slot-scope="scope">
                        <i class="el-icon-delete" @click="deleteBtn(scope.$index,item.ccPackageGroupDetailList)"></i>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="addbtn" @click="addProject(index)">添加+</div>
                </div>
              </div>

              <!-- 代金券框 -->
              <div class="meal_box" v-if="item.groupType == 4">
                <div class="head_box">
                  <span>NO.{{index+1}}</span>
                  <span>类型<em>代金券</em></span>
                  <span>组合名称<el-input size="mini" v-model="item.groupName"></el-input></span>
                  <i class="el-icon-close" @click="delGroup(index)"></i>
                </div>
                <div class="set_table">
                  <el-table
                    :data="item.ccPackageGroupDetailList"
                    stripe
                    style="width: 100%"
                    max-height="600"
                    tooltip-effect="dark"
                    >
                    <el-table-column
                      prop="projectName"
                      label="名称">
                    </el-table-column>
                    <el-table-column
                      width="140px"
                      prop="projectPrice"
                      label="代金券金额（元）">
                    </el-table-column>
                    <el-table-column
                      label="删除">
                      <template slot-scope="scope">
                        <i class="el-icon-delete" @click="deleteBtn(scope.$index,item.ccPackageGroupDetailList)"></i>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="addbtn" @click="addVoucher(index)">添加+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="addGive">
          <el-button type="primary" size="small" @click="addGiveList">
            添加赠送方案
          </el-button>
          <div class="form_box">
            <div class="li_box">
              <el-tag
              :key="item.id"
              v-for="(item, index) in ccPackageGiveList"
              closable
              :disable-transitions="false"
              @close="CloseBurdenTags(index)"
              >
              {{(item.givePlanName || item.giftName)+'（*'+item.giftNum+'）'}}
              </el-tag>
            </div>
          </div>
        </div>
      </div>

      <div class="footer">
        <el-button size="medium" onclick="history.back()">取　消</el-button>
        <el-button type="primary" size="medium" @click="editBtn" v-if="form.packageId">保存修改</el-button>
        <el-button type="primary" size="medium" @click="saveBtn" v-else>保　存</el-button>
      </div>
      <!-- 添加产品 -->
      <el-dialog :visible.sync="addProductDialog" title="选择产品" width="1050px" class="burbox">
        <div class="tableDialog">
          <div class="tabs scroll">
            <h3>{{productList.name}}</h3>
            <el-menu>
              <template v-for="(child, index1) in productList.childMenu">
                <el-menu-item :index="productList.url+child.url" v-if="child.childMenu == null" @click="changeMenu(child, productList.id)">
                  <span>{{child.name}}</span>
                </el-menu-item>
                <el-submenu :index="productList.url+child.url" v-else>
                <template slot="title">
                  <span>{{child.name}}</span>
                </template>
                <template v-for="(child2, index2) in child.childMenu" :keys="index1">
                  <el-menu-item :index="productList.url+child.url+child2.url" @click="changeMenu(child2, productList.id)">{{child2.name}}</el-menu-item>
                </template>
                </el-submenu>
              </template>
            </el-menu>
          </div>
          <div class="burli1">
            <el-table
              :data="materials_arr"
              stripe
              style="width:100%"
              max-height='450'
              @selection-change="handleSelectionChange"
              tooltip-effect="dark"
              >
              <el-table-column
              label="选择"
              type="selection"
              width="80">
              </el-table-column>
              <el-table-column
                label="序号"
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                prop="projectName"
                label="名称"
                >
              </el-table-column>
              <el-table-column
                prop="projectPrice"
                label="价值">
              </el-table-column>
            </el-table>
            <page :pageModel="pageModel" @selectList="selectRoleList" v-if="pageModel.sumCount>10"></page>
          </div>
          <!-- 选择产品 -->
          <div class="burli2">
            <el-table
              :data="multipleSelection"
              stripe
              style="width:100%"
              max-height='450'
              tooltip-effect="dark"
              >
              <el-table-column
                prop="projectName"
                label="名称"
                >
              </el-table-column>
              <el-table-column
                prop="projectPrice"
                label="价值">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="comformAddproduct" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 添加项目 -->
      <el-dialog :visible.sync="addProjectDialog" title="选择项目" width="1050px" class="burbox">
        <div class="tableDialog">
          <div class="tabs scroll">
            <h3>{{projectList.name}}</h3>
            <el-menu>
              <template v-for="(child, index1) in projectList.childMenu">
                <el-menu-item :index="projectList.url+child.url" v-if="child.childMenu == null" @click="changeMenu(child, projectList.id)">
                  <span>{{child.name}}</span>
                </el-menu-item>
                <el-submenu :index="projectList.url+child.url" v-else>
                <template slot="title">
                  <span>{{child.name}}</span>
                </template>
                <template v-for="(child2, index2) in child.childMenu" :keys="index1">
                  <el-menu-item :index="projectList.url+child.url+child2.url" @click="changeMenu(child2, projectList.id)">{{child2.name}}</el-menu-item>
                </template>
                </el-submenu>
              </template>
            </el-menu>
          </div>
          <div class="burli1">
            <el-table
              :data="materials_arr"
              stripe
              style="width:100%"
              max-height='450'
              @selection-change="handleSelectionChange"
              tooltip-effect="dark"
              >
              <el-table-column
              label="选择"
              type="selection"
              width="80">
              </el-table-column>
              <el-table-column
                label="序号"
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                prop="projectName"
                label="名称"
                >
              </el-table-column>
              <el-table-column
                prop="projectPrice"
                label="价值">
              </el-table-column>
            </el-table>
            <page :pageModel="pageModel" @selectList="selectRoleList" v-if="pageModel.sumCount>10"></page>
          </div>
          <!-- 添加项目 -->
          <div class="burli2">
            <el-table
              :data="multipleSelection"
              stripe
              style="width:100%"
              max-height='450'
              tooltip-effect="dark"
              >
              <el-table-column
                prop="projectName"
                label="名称"
                >
              </el-table-column>
              <el-table-column
                prop="projectPrice"
                label="价值">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="comformAddproduct" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 添加代金券 -->
      <el-dialog :visible.sync="addVoucherDialog" title="选择代金券" width="1050px" class="burbox">
        <div class="tableDialog">
          <div class="tabs scroll">
            <h3>{{menuVoucherList.name}}</h3>
            <el-menu>
              <template v-for="(child, index1) in menuVoucherList.childMenu">
                <el-menu-item :index="menuVoucherList.url+child.url" v-if="child.childMenu == null" @click="changeMenu(child, menuVoucherList.id)">
                  <span>{{child.name}}</span>
                </el-menu-item>
                <el-submenu :index="menuVoucherList.url+child.url" v-else>
                <template slot="title">
                  <span>{{child.name}}</span>
                </template>
                <template v-for="(child2, index2) in child.childMenu" :keys="index1">
                  <el-menu-item :index="menuVoucherList.url+child.url+child2.url" @click="changeMenu(child2, menuVoucherList.id)">{{child2.name}}</el-menu-item>
                </template>
                </el-submenu>
              </template>
            </el-menu>
          </div>
          <div class="burli1">
            <el-table
              :data="materials_arr"
              stripe
              style="width:100%"
              max-height='450'
              @selection-change="handleSelectionChange"
              tooltip-effect="dark"
              >
              <el-table-column
              label="选择"
              type="selection"
              width="80">
              </el-table-column>
              <el-table-column
                label="序号"
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                prop="projectName"
                label="名称"
                >
              </el-table-column>
              <el-table-column
                prop="projectPrice"
                label="价值">
              </el-table-column>
            </el-table>
            <page :pageModel="pageModel" @selectList="selectRoleList" v-if="pageModel.sumCount>10"></page>
          </div>
          <!-- 添加代金券 -->
          <div class="burli2">
            <el-table
              :data="multipleSelection"
              stripe
              style="width:100%"
              max-height='450'
              tooltip-effect="dark"
              >
              <el-table-column
                prop="projectName"
                label="名称"
                >
              </el-table-column>
              <el-table-column
                prop="projectPrice"
                label="价值">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="comformAddproduct" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 添加赠送方案 -->
       <addGive ref="addGiveChild" :burdening="presentDialog" @saveGive="saveGive" @cancelGive="cancelGive"></addGive>
      <!-- <el-dialog title="添加赠送方案" :visible.sync="presentDialog" width="1000px" class="burbox">

      </el-dialog> -->
  </div>
</template>

<script>
// import { getMenuProduct, getMenuProject, getMenu, getMenuById } from '@/api/login'
import { addPackage, editPackage, PackageDetail, getPackage, getProductById } from '@/api/product'
import { mealMenu, giveNav, productMenu, projectMenu, vouMenu } from '@/api/tree'
import { VueEditor } from 'vue2-editor'
import addGive from '@/components/common/addGive'
export default {
  name: 'app',
  components: {
    VueEditor,
    addGive
  },
  data() {
    return {
      moredes: false,
      pageModel: {
        page: 1,
        rows: 10,
        sumCount: 0
      },
      menuList: [],
      defaultProps: {
        children: 'childMenu',
        value: 'id',
        label: 'name'
      },
      selectedOptions: [],
      addProductDialog: false,
      addProjectDialog: false,
      addVoucherDialog: false,
      presentDialog: false, // 添加赠送
      addIndex: -1, // 添加时改变index用于记录下标向数组添加数据
      materials_arr: [],
      multipleSelection: [],
      ccPackageGiveList: [], //已选赠送
      productList: {}, // 产品菜单
      projectList: {}, // 项目菜单
      menuVoucherList: {}, // 代金券菜单
      addGivemenuList: [], // 添加赠送方案
      imageUrl: '',
      tuisong: false,
      search: '',
      bed: 1,
      input: '',
      seatDialog: false,
      ccPackageGroupVoList: [], //添加的组合
      form: {
        packageName: '', // 套餐名称
        packagePrice: '', // 套餐价格
        effectiveDays: 3560, // 有效天数
        arrId: '',
        parentId: '',     // 父级ID
        detail: '',
        pictureUrl: '',
        region: '',
        market: 1,
        expend: 1,
        isDiscounts: '1',
        isDoorService: '0',
        isIpadShow: '0',
        isIpadRecommend: '0',
        salesPromotionMethod: '0',
        promotionMoney: '', // 提成金额
        promotionPercentage: '', // 百分比例
        purchaseMethod: '0',
        purchaseAuthority: '0'
      }
    }
  },
  created() {
    this.getgiveNav()
    this.getmealMenu()
    if (this.$route.params.id != undefined) {
      this.getPackageDetail()
    }
  },
  methods: {
    // 获取套餐详情
    getPackageDetail() {
      PackageDetail(this.$route.params.id).then(res => {
        this.form = res.data.data
        this.ccPackageGiveList = res.data.data.ccPackageGiveList
        this.ccPackageGroupVoList = res.data.data.ccPackageGroupVoList
        let arr = res.data.data.arrId.split(',')
        this.selectedOptions = arr.map((item) => {
          return +item
        })
        console.log('套餐详情', res, this.$route.params.id, this.form)
      })
    },
    // 获取项目产品菜单
    getmealMenu() {
      mealMenu().then(res => {
        this.menuList = res.data.data[0].childMenu
        console.log('获取套餐菜单', res)
      })
    },
    // 选择类目获取id
    handleItemChange(val) {
      this.form.arrId = val.join(',')
      this.form.parentId = val[val.length - 1]
      this.form.projectType = val[0]
      console.log('点击', val, this.form.arrId, this.form.parentId)
    },
    selectRoleList() {
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    addseatBtn() {
      this.seatDialog = true
    },
    // 删除已添加
    deleteBtn(index, item) {
      item.splice(index, 1)
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
    // 选择事件
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    selectDown(command) {
      if (command == 'a') {
        this.ccPackageGroupVoList.push({
          groupName: '',
          groupType: 1,
          groupTime: '1', // 次数
          maxOptionalNum: '1', // 最多输入次数
          ccPackageGroupDetailList: []
        })
      } else if (command == 'b') {
        this.ccPackageGroupVoList.push(
          { //添加产品数据
            groupName: '',
            groupType: 2,
            groupTime: '1', // 次数
            ccPackageGroupDetailList: []
          }
        )
      } else {
        this.ccPackageGroupVoList.push({
          groupType: 4,
          groupName: '',
          ccPackageGroupDetailList: []
        })
      }
    },
    // 改变菜单时得到数据
    changeMenu(child, parentId) {
      console.log(child, parentId, 333)
      this.pageModel.topId = parentId
      let param = {
        'parentId': child.id
      }
      getProductById(this.pageModel, param).then(res => {
        this.materials_arr = res.data.data.rows
        console.log(res.data.data.rows, 21)
      })
    },
    // 添加产品
    addProduct(index) {
      this.materials_arr = []
      this.multipleSelection = []
      this.addIndex = index
      productMenu().then(res => {
        this.productList = res.data.data[0]
      })
      this.addProductDialog = true
    },
    // 添加项目
    addProject(index) {
      this.materials_arr = []
      this.multipleSelection = []
      this.addIndex = index
      projectMenu().then(res => {
        this.projectList = res.data.data[0]
      })
      this.addProjectDialog = true
    },
    // 添加代金券
    addVoucher(index) {
      this.materials_arr = []
      this.multipleSelection = []
      this.addIndex = index
      vouMenu().then(res => {
        if (res.data.code == 200) {
          this.menuVoucherList = res.data.data[0]
          this.addVoucherDialog = true
        }
      })
    },
    // 获取赠送菜单
    getgiveNav() {
      giveNav().then(res => {
        if (res.data.code == 200) {
          this.addGivemenuList = res.data.data
        }
        console.log('获取赠送菜单', res, this.menuList)
      })
    },
    // 删除组合
    delGroup(index) {
      this.ccPackageGroupVoList.splice(index, 1)
    },
    CloseBurdenTags(index) {
      this.ccPackageGiveList.splice(index, 1)
    },
    // 确认添加产品
    comformAddproduct() {
      this.ccPackageGroupVoList[this.addIndex].ccPackageGroupDetailList = this.ccPackageGroupVoList[this.addIndex].ccPackageGroupDetailList.concat(this.multipleSelection)
      this.addProductDialog = false
      this.addProjectDialog = false
      this.addVoucherDialog = false
    },
    // 保存
    saveBtn() {
      let param = Object.assign({
        enterpriseId: '001',
        ccPackageGroupVoList: this.ccPackageGroupVoList,
        ccPackageGiveList: this.ccPackageGiveList
      }, this.form)
      if (this.form.packageName == '' || this.form.packagePrice == '' || this.form.arrId == '') {
        this.$message.error('套餐名称、类目和价格不能为空')
      } else if (this.ccPackageGroupVoList.length > 0) {
        let hasName = this.ccPackageGroupVoList.every(item => {
          return item.groupName != ''
        })
        let hasCount = this.ccPackageGroupVoList.every(item => {
          if (item.groupTime != undefined) {
            return item.groupTime != ''
          } else {
            return true
          }
        })
        let hasMaxCount = this.ccPackageGroupVoList.every(item => {
          if (item.maxOptionalNum != undefined) {
            return item.maxOptionalNum != ''
          } else {
            return true
          }
        })
        if (hasName == false) {
          this.$message.error('组合名称不能为空')
        } else if (hasCount == false) {
          this.$message.error('总使用次数不能为空')
        } else if (hasMaxCount == false) {
          this.$message.error('每次最多可选次数次数不能为空')
        } else {
          addPackage(param).then(res => {
            if (res.data.code == 200) {
              this.$router.push('/setMeal')
              this.$message.success('新增成功!')
            } else {
              this.$message.error('新增套餐失败!')
            }
          })
        }
      }
    },
    // 保存修改
    editBtn() {
      let param = Object.assign({
        enterpriseId: '001',
        ccPackageGroupVoList: this.ccPackageGroupVoList,
        ccPackageGiveList: this.ccPackageGiveList
      }, this.form)
      editPackage(param).then(res => {
        console.log('保存修改', res)
        if (res.data.code == 200) {
          this.$router.push('/setMeal')
          this.$message.success('修改成功!')
        } else {
          this.$message.error('新增失败!')
        }
      })
    },
    // 添加赠送方案按钮
    addGiveList() {
      this.$refs.addGiveChild.materials_data = []
      this.$refs.addGiveChild.materials_arr = []
      this.$refs.addGiveChild.checkGoodIds = []
      this.presentDialog = true
    },
    // 监听保存
    saveGive(val) {
      this.ccPackageGiveList = val
      this.presentDialog = false
    },
    // 监听取消保存
    cancelGive() {
      this.presentDialog = false
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
    .el-select {
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
  min-height: 52px;
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
.tableDialog .tabs h3{
  padding: 15px 15px 5px;
  color: #333;
}
</style>
