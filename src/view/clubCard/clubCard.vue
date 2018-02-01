<template>
  <div >
      <div class="header_title">会员卡<i class="el-icon-info"></i></div>
      <div class="main-content scroll">
        <div class="left_box">
          <h4>会员卡信息</h4>
          <div class="club_box">
            <div class="input_box">
              <li>
                <label for="">会员卡级别</label>
                <el-input size="small" placeholder="请输入会员名称" v-model="vipinput.vipTypeName"></el-input>
              </li>
              <li>
                <label for="">起点金额</label>
                <el-input size="small" v-model="vipinput.startingPointSum"></el-input>
              </li>
              <li>
                <label for="">有效期（月）</label>
                <el-input size="small" v-model="vipinput.vipValidityDate"></el-input>
              </li>
              <li>
                <label for="">项目折扣</label>
                <el-input size="small" v-model="vipinput.discountProduct"></el-input>
              </li>
              <li>
                <label for="">产品折扣</label>
                <el-input size="small" v-model="vipinput.discountProject"></el-input>
              </li>
              <li>
                <label for="">套餐折扣</label>
                <el-input size="small" v-model="vipinput.discountMeal"></el-input>
              </li>
            </div>
            <div class="addpresent">
              <p @click="addpresent">添加赠送+</p>
              <div>
                <el-tag
                  v-for="(item,index) in materials_data"
                  :key="materials_data.givePlanName"
                  closable
                  :disable-transitions="false"
                  @close="handleTagsClose(item)"
                  >
                  {{(item.givePlanName || item.giftName)+'(*'+item.giftNum+')'}}
                </el-tag>
              </div>
            </div>
          </div>
          <el-button type="primary" size="small" @click="vipinputBtn" v-if="change">确认新增</el-button>
          <template v-else>
            <el-button type="primary" size="small" @click="sureChange">保　存</el-button>
            <el-button  size="small" @click="cancelSave">取　消</el-button>
          </template>
          <el-table
            :data="vipcardList"
            stripe
            style="width: 100%"
            max-height="345"
            tooltip-effect="dark"
            >
            <el-table-column
              prop="vipTypeName"
              label="会员卡级别">
            </el-table-column>
            <el-table-column
              prop="startingPointSum"
              label="起点金额">
            </el-table-column>
            <el-table-column
              prop="discountProject"
              label="项目折扣"
              >
            </el-table-column>
            <el-table-column
              prop="discountProduct"
              label="产品折扣"
              >
            </el-table-column>
            <el-table-column
              prop="discountMeal"
              label="套餐折扣"
              >
            </el-table-column>
            <el-table-column
              label="修改">
              <template slot-scope="scope">
                <i class="el-icon-edit" @click="editvipBtn(scope.$index, scope.row)"></i>
              </template>
            </el-table-column>
            <el-table-column
              label="删除">
              <template slot-scope="scope">
                <i class="el-icon-delete" @click="deleteVip(scope.$index, scope.row)"></i>
              </template>
            </el-table-column>
          </el-table>
          <page :pageModel="pageModel" @selectList="selectRoleList" v-if="pageModel.sumCount>10"></page>
        </div>
        <div class="explain">
          <h4>活动说明</h4>
          <textarea name="" id="" cols="30" rows="10" class="scroll" v-model="actDesc"></textarea>
          <el-button type="primary" size="small" @click="subText">提　交</el-button>
        </div>

      </div>

    <el-dialog :visible.sync="burdening" title="添加赠送" width="1050px" class="burbox">
      <div class="tableDialog">
        <div class="tabs">
          <p class="nav-title">
            <span>{{menuList.name}}</span>
          </p>
          <el-menu
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            @select="handleSelect">
            <template v-for="(item, index) in menuList.childMenu" :keys="index">
              <el-menu-item :index="item.url" v-if="item.childMenu==null || item.childMenu==''" @click="changeMenu(item)">
                <template slot="title">
                  <span>{{item.name}}</span>
                </template>
              </el-menu-item>
              <el-submenu :index="item.url"  v-else>
                <template slot="title" >
                  <div @click="changeMenu(item)">
                    <span >{{item.name}}</span>
                  </div>
                </template>
                <template v-for="(child, index1) in item.childMenu" :keys="index1">
                  <el-menu-item :index="child.url" @click="changeMenu(child)">
                    <span>{{child.name}}</span>
                  </el-menu-item>
                </template>
              </el-submenu>
            </template>
          </el-menu>
        </div>
        <div class="burli1">
          <el-table
            ref="goods"
            :data="materials_arr"
            stripe
            style="width:100%"
            max-height='450'
            tooltip-effect="dark"
            @select="selectGoods"
            @select-all="selectAllGoods"
            @selection-change="addtableList"
            @expand-change="getSetMealDetails"
            >
            <el-table-column type="expand">
              <template slot-scope="scope">
              <div v-loading="loading" >
                <div  v-if="!loading">
                  <div class="item-detail">
                    <li>类型</li>
                    <li>名称</li>
                    <li>价值</li>
                    <li>数量</li>
                  </div>
                  <div class="item-detail" v-for="item in scope.row.ccSelectedProjectVos">
                    <li>{{item.coupType == 0 ? projectType[3] : projectType[item.projectType-1]}}</li>
                    <li>{{item.projectName}}</li>
                    <li>{{item.projectPrice}}</li>
                    <li>{{item.projectNum}}</li>
                  </div>
                </div>
              </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="givePlanName"
              label="名称"
              >
            </el-table-column>
            <el-table-column
              prop="effectiveDays"
              label="有效天数">
            </el-table-column>
            <el-table-column
            type="selection"
            label="选择"
            width="80">
            </el-table-column>
          </el-table>
        </div>
        <!-- 默认配料 -->
        <div class="burli2">
          <el-table
            :data="materials_data"
            stripe
            style="width: 400px;margin-bottom:20px;"
            max-height='400'
            tooltip-effect="dark"
          >
            <el-table-column
              label="名称"
              >
              <template slot-scope="scope">
                {{scope.row.givePlanName||scope.row.giftName}}
              </template>
            </el-table-column>
            <el-table-column
              prop="effectiveDays"
              label="有效天数"
              >
            </el-table-column>
            <el-table-column
              prop="giftNum"
              label="数量">
              <template slot-scope="scope" >
                <el-input-number v-model="scope.row.giftNum"  :min='1'></el-input-number>
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
import { addvipCard, editvipCard, getvipCard, delvipCard, actDescInfo, editactDesc, getCardDetail } from '@/api/setting'
import { getgivePlan, givePlanDetail } from '@/api/product'
import { giveNav, delMenu, editMenu, addMenu, ccGetMenu } from '@/api/tree'
import page from '@/components/common/page'
import { parseTime, clone } from '@/utils/common'
export default {
  name: 'app',
  components: {
    page
  },
  data() {
    return {
      loading: false,
      bed: 1,
      input: '',
      burdening: false,
      actDesc: '',
      banner: 'static/img/phone.png',
      change: true,
      menuList: {},
      projectType: ['项目', '产品', '套餐', '优惠券'],
      materials_data: [],
      checkGoodIds: [],
      materials_arr: [],
      pageModel: {
        page: 1,
        rows: 10,
        sumCount: 0
      },
      vipinput: {},
      vipCard: {
        vipTypeName: '',
        startingPointSum: '',
        vipValidityDate: '',
        discountProduct: '',
        discountProject: '',
        discountMeal: ''
      },
      vipTypeId: '',
      vipcardList: [],
      ccVipGiftVoList: []
    }
  },
  created() {
    this.vipinput = clone(this.vipCard)
    this.getvipList()
    this.getactDescList()
    this.getgiveNav()
  },
  methods: {
    // 添加列表
    addtableList(val) {
      // this.materials_data = val
    },
    selectGoods(selection, val) {
      var index = selection.indexOf(val)
      if (index < 0) {
        var sIndex = this.checkGoodIds.indexOf(val.id)
        if (sIndex > -1) {
          this.materials_data.splice(sIndex, 1)
          this.checkGoodIds.splice(sIndex, 1)
        }
      } else {
        this.materials_data.push(val)
        this.checkGoodIds.push(val.id)
      }
    },
    selectAllGoods(val) {
      if (val.length == 0) {
        this.materials_arr.forEach((good) => {
          var index = this.checkGoodIds.indexOf(good.id)
          this.materials_data.splice(index, 1)
          this.checkGoodIds.splice(index, 1)
        })
      } else {
        val.forEach((good) => {
          var index = this.checkGoodIds.indexOf(good.id)
          if (index < 0) {
            this.materials_data.push(good)
            this.checkGoodIds.push(good.id)
          }
        })
      }
    },
    // 删除已选
    delSelect(index) {
      this.materials_data.splice(index, 1)
    },
    subText() {
      let param = {
        actDesc: this.actDesc,
        actType: 1,
        enterpriseId: '001',
        keyId: 1
      }
      editactDesc(param).then(res => {
        console.log('修改活动说明', res)
        // this.actDesc = res.data.data.actDesc
        this.$message.success('活动说明保存成功')
      })
    },
    handleTagsClose(tag) {
      this.materials_data.splice(this.materials_data.indexOf(tag), 1)
    },
    // 弹框
    addpresent() {
      this.burdening = true
    },
    // 获取赠送菜单
    getgiveNav() {
      giveNav().then(res => {
        if (res.data.code == 200) {
          this.menuList = res.data.data[0]
        }
      })
    },
    handleSelect(key, keyPath) {
      console.log('handleSelect', key, keyPath)
    },
    handleOpen(key, keyPath) {
      console.log('handleOpen', key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log('handleOpen', key, keyPath)
    },
    sureBurden() {
      this.burdening = false
    },
    getactDescList() {
      actDescInfo(1).then(res => {
        console.log('获取活动说明', res)
        this.actDesc = res.data.data.actDesc
      })
    },
    // 添加会员卡
    vipinputBtn() {
      if (this.vipinput.vipTypeName == '' || this.vipinput.startingPointSum == '') {
        this.$message.error('会员卡信息不能为空')
      } else {
        console.log(this.materials_data)
        let GiftList = []
        this.materials_data.forEach((item, index) => {
          GiftList[index] = {}
          GiftList[index].giftName = item.givePlanName || item.giftName
          GiftList[index].giftNum = item.giftNum
          GiftList[index].giftId = item.id || item.giftId
        })
        let param = Object.assign({
          enterpriseId: '001',
          // hasGift: 1, // 是否有礼品赠送 0是 1否
          // isDelete: 0,
          ccVipGiftVoList: GiftList
        }, this.vipinput)
        addvipCard(param).then(res => {
          console.log('添加会员卡', param, this.vipCard, res)
          if (res.data.code == 200) {
            this.vipcardList.unshift(param)
            this.getvipList()
            this.$message.success('新增成功!')
          } else {
            this.$message.error('新增失败!')
          }
          this.vipinput = clone(this.vipCard)
        })
      }
    },
    // 删除会员卡等级
    deleteVip(index, row) {
      console.log(row)
      this.$confirm('是否删除该会员卡等级?', '提示', {
        type: 'warning'
      }).then(() => {
        delvipCard(row.vipTypeId).then(res => {
          if (res.data.code == 200) {
            console.log(res)
            this.vipcardList.splice(index, 1)
            this.$message.success('删除成功!')
            this.getvipList()
          } else {
            this.$message.error('删除失败!')
          }
        })
      }).catch(() => {
      })
    },

    // 编辑会员卡 vipTypeId
    editvipBtn(index, row) {
      this.change = false
      this.vipTypeId = row.vipTypeId
      getCardDetail(row.vipTypeId).then(res => {
        console.log(res)
        this.vipinput = res.data.data
        this.materials_data = res.data.data.ccVipGiftVoList
      })
      // this.change = false
      // this.vipinput = clone(this.vipcardList[index])
      // this.vipTypeId = row.vipTypeId
    },
    // 取消保存
    cancelSave() {
      this.change = true
      this.vipinput = clone(this.vipCard)
      this.burdening = false
      this.materials_data = []
      this.checkGoodIds = []
      this.materials_arr = []
    },
    // 保存修改
    sureChange() {
      if (this.vipinput.vipTypeName == '' || this.vipinput.startingPointSum == '') {
        this.$message.error('会员卡信息不能为空')
      } else {
        let GiftList = []
        this.materials_data.forEach((item, index) => {
          GiftList[index] = {}
          GiftList[index].giftName = item.givePlanName || item.giftName
          GiftList[index].giftNum = item.giftNum
          GiftList[index].giftId = item.id || item.giftId
        })
        let param = Object.assign({
          enterpriseId: '001',
          vipTypeId: this.vipTypeId,
          ccVipGiftVoList: GiftList
        }, this.vipinput)
        editvipCard(param).then(res => {
          console.log('编辑会员卡', param, this.vipCard, res)
          if (res.data.code == 200) {
            this.vipcardList.unshift(param)
            this.getvipList()
            this.$message.success('修改成功!')
            this.change = true
            this.vipTypeId = ''
          } else {
            this.$message.error('修改失败!')
          }
          this.vipinput = clone(this.vipCard)
        })
      }
    },
    // 获取会员卡列表
    getvipList() {
      getvipCard(this.pageModel, {}).then(res => {
        this.vipcardList = res.data.data.rows
        this.pageModel.sumCount = res.data.data.total
      })
    },
    selectRoleList() {
      this.getvipList()
    },
    // 改变菜单时得到赠送方案数据
    changeMenu(child) {
      this.MenuParam = {
        parentId: child.id
      }
      this.getgivePlanList()
    },
    // 获取赠送列表
    getgivePlanList() {
      getgivePlan(this.pageModel, this.MenuParam).then(res => {
        this.materials_arr = res.data.data.rows
        console.log(this.materials_arr)
        this.pageModel.sumCount = res.data.data.total
        this.materials_arr.forEach(item => {
          item.createDate = parseTime(item.createDate, '{y}-{m}-{d}')
          item.effectiveDate = parseTime(item.effectiveDate, '{y}-{m}-{d}')
          if (this.checkGoodIds) {
            var index = this.materials_data.findIndex(val => {
              return val.id == item.id
            })
            if (index > -1) {
              setTimeout(() => {
                this.$refs.goods.toggleRowSelection(item)
              }, 1)
            }
          }
        })
      })
    },
    getSetMealDetails(row, allRows) {
      this.loading = true
      givePlanDetail(row.id).then(res => {
        if (res.data.code == 200) {
          this.loading = false
          row.ccSelectedProjectVos = res.data.data.ccSelectedProjectVos
        }
      })
    }
  }
}
</script>

<style>

</style>
<style scoped lang="scss">
.main-content{
  display: flex;
  justify-content: space-between;
  height: calc(100% - 50px);
}
.left_box{
  flex: 1;
  padding-right: 40px;
  border-right: 1px solid #ddd;
  .club_box{
    width: 100%;
    border: 1px solid #C0CCDA;
    .input_box{
      padding-top: 30px;
      display: flex;
      flex-wrap: wrap;
      border-bottom: 1px solid #EBEBEB;
      li{
        display: flex;
        align-items: center;
        width: 300px;
        padding-bottom:30px;
        label{
          width: 100px;
          padding-right: 10px;
          text-align: right;
        }
        .el-input{
          width: 140px;
        }
      }
    }
    .addpresent{
      display: flex;
      align-items: center;
      margin:7px 0;
      p{
        color: #3BB3FF;
        width: 120px;
        text-align: center;
        border-right: 1px solid #ddd;
        line-height: 32px;
        margin: 5px 0;
        cursor: pointer;
      }
      .el-tag{
        margin: 5px 0 5px 20px;
      }
    }
  }
  .el-button{
    margin: 20px 0 30px 20px;
    float: right;
  }
}
.explain{
  width: 400px;
  color:#475669;
  padding: 0;
  padding-left: 40px;
  box-sizing: border-box;
  textarea{
    padding:10px;
    line-height: 26px;
    font-size: 14px;
    resize: none;
    border: 0;
    background: #f7f7f7;
    color: #3a4354;
    width: 100%;
    height: 200px;
    outline: none;
    margin-bottom: 20px;
    box-sizing: border-box;
  }
  .el-button{
    float: right;
  }
}
.el-table{
  margin-bottom: 25px;
}
.item-detail{
  width: 100%;
  line-height: 32px;
  text-align: center;
  display: flex;
  justify-content: space-around;
}
.item-detail:first-child{
  line-height: 36px;
  background: #f4f4f4;
  font-weight:bold;
}
</style>
