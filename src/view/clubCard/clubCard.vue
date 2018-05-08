<template>
<div>
  <div class="header_title">会员卡<i class="el-icon-info"></i></div>
  <div class="main-content scroll">
    <div class="left_box">
      <h4>会员卡信息</h4>
      <div class="club_box">
        <div class="input_box">
          <li>
            <label for="">会员卡级别</label>
            <el-input size="small" placeholder="请输入会员级别" v-model="vipinput.schemeName"></el-input>
          </li>
          <li>
            <label for="">起点金额</label>
            <el-input size="small" v-model="vipinput.schemePrice"></el-input>
          </li>
          <li>
            <label for="">有效期（月）</label>
            <el-input size="small" v-model="vipinput.vipValidityDate"></el-input>
          </li>
          <li>
            <label for="">项目折扣</label>
            <el-input size="small" v-model="vipinput.projectDiscount"></el-input>
          </li>
          <li>
            <label for="">产品折扣</label>
            <el-input size="small" v-model="vipinput.productDiscount"></el-input>
          </li>
          <li>
            <label for="">套餐折扣</label>
            <el-input size="small" v-model="vipinput.packageDiscount"></el-input>
          </li>
        </div>
        <div class="addpresent">
          <p @click="addpresent">添加赠送+</p>
          <div>
            <el-tag :key="item.id" v-for="(item, index) in ccPackageGiveList" closable :disable-transitions="false" @close="CloseGiveTags(index)">
              {{item.projectName +'（*'+item.projectNum+'）'}}
            </el-tag>
          </div>
        </div>
      </div>
      <el-button type="primary" size="small" @click="vipinputBtn" v-if="change">确认新增</el-button>
      <template v-else>
            <el-button type="primary" size="small" @click="sureChange">保　存</el-button>
            <el-button  size="small" @click="cancelSave">取　消</el-button>
          </template>
      <el-table :data="vipcardList" stripe style="width: 100%" max-height="345" tooltip-effect="dark">
        <el-table-column prop="schemeName" label="会员卡级别" sortable>
        </el-table-column>
        <el-table-column prop="schemePrice" label="起点金额" sortable>
        </el-table-column>
        <el-table-column prop="productDiscount" label="项目折扣">
        </el-table-column>
        <el-table-column prop="projectDiscount" label="产品折扣">
        </el-table-column>
        <el-table-column prop="packageDiscount" label="套餐折扣">
        </el-table-column>
        <el-table-column label="修改">
          <template slot-scope="scope">
                <i class="el-icon-edit" @click="editvipBtn(scope.$index, scope.row)"></i>
              </template>
        </el-table-column>
        <el-table-column label="删除">
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
  <addGive ref="addGiveChild" :burdening="presentDialog" @saveGive="saveGive" @cancelGive="cancelGive"></addGive>
</div>
</template>

<script>
import { addvipCard, editvipCard, getvipCard, delvipCard, actDescInfo, editactDesc, getCardDetail } from '@/api/setting'
import { getVouterDetail, givePlanDetail } from '@/api/product'
import { giveNav, delMenu, editMenu, addMenu, ccGetMenu } from '@/api/tree'
import page from '@/components/common/page'
import { parseTime, clone, discount } from '@/utils/common'
import addGive from '@/components/common/addGive'
export default {
  name: 'app',
  components: {
    page,
    addGive
  },
  data() {
    return {
      loading: false,
      bed: 1,
      input: '',
      presentDialog: false,
      actDesc: '',
      banner: 'static/img/phone.png',
      change: true,
      projectType: ['项目', '产品', '套餐', '优惠券'],
      pageModel: {
        page: 1,
        rows: 10,
        sumCount: 0
      },
      ccPackageGiveList: [], //已选赠送
      vipinput: {},
      vipCard: {
        schemeName: '',
        schemePrice: '',
        vipValidityDate: '',
        projectDiscount: '',
        productDiscount: '',
        packageDiscount: ''
      },
      vipcardList: []
    }
  },
  created() {
    this.vipinput = clone(this.vipCard)
    this.getvipList()
    this.getactDescList()
  },
  methods: {
    subText() {
      let param = {
        actDesc: this.actDesc,
        actType: 1,
        enterpriseId: '001',
        keyId: 1
      }
      editactDesc(param).then(res => {
        this.$message.success('活动说明保存成功')
      })
    },
    // 弹框
    addpresent() {
      this.$refs.addGiveChild.checkGoodIds = []
      this.$refs.addGiveChild.materials_arr = []
      this.$refs.addGiveChild.materials_data = clone(this.ccPackageGiveList)
      this.$refs.addGiveChild.materials_data.forEach(item => {
        this.$refs.addGiveChild.checkGoodIds.push(item.id)
      })
      this.$refs.addGiveChild.checkSelect()
      this.presentDialog = true
    },
    getactDescList() {
      actDescInfo(1).then(res => {
        this.actDesc = res.data.data.actDesc
      })
    },
    // 添加会员卡
    vipinputBtn() {
      if (this.vipinput.schemeName == '' || this.vipinput.schemePrice == '') {
        this.$message.error('会员卡信息不能为空')
      } else if (!discount(this.vipinput.projectDiscount) || !discount(this.vipinput.productDiscount) || !discount(this.vipinput.packageDiscount)) {
        this.$message.error('折扣只能是0~1的数字')
      } else {
        this.vipinput.ccSelectedProjectVoList = this.ccPackageGiveList
        addvipCard(this.vipinput).then(res => {
          if (res.data.code == 200) {
            this.$refs.addGiveChild.checkGoodIds = []
            this.$refs.addGiveChild.materials_arr = []
            this.$refs.addGiveChild.materials_data = []
            this.ccPackageGiveList = []
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
      this.$confirm('是否删除该会员卡等级?', '提示', {
        type: 'warning'
      }).then(() => {
        delvipCard(row.id).then(res => {
          if (res.data.code == 200) {
            this.$message.success('删除成功!')
            this.getvipList()
          } else {
            this.$message.error('删除失败!')
          }
        })
      }).catch(() => {})
    },
    // 删除赠送
    CloseGiveTags(index) {
      this.ccPackageGiveList.splice(index, 1)
    },
    // 编辑会员卡 id
    editvipBtn(index, row) {
      this.change = false
      getCardDetail(row.id).then(res => {
        this.vipinput = res.data.data
        this.ccPackageGiveList = res.data.data.ccSelectedProjectVoList
      })
    },
    // 取消保存
    cancelSave() {
      this.change = true
      this.vipinput = clone(this.vipCard)
      this.presentDialog = false
      this.$refs.addGiveChild.checkGoodIds = []
      this.$refs.addGiveChild.materials_arr = []
      this.$refs.addGiveChild.materials_data = []
      this.ccPackageGiveList = []
    },
    // 保存修改
    sureChange() {
      if (this.vipinput.schemeName == '' || this.vipinput.schemePrice == '') {
        this.$message.error('会员卡信息不能为空')
      } else if (!discount(this.vipinput.projectDiscount) || !discount(this.vipinput.productDiscount) || !discount(this.vipinput.packageDiscount)) {
        this.$message.error('折扣只能是0~1的数字')
      } else {
        let param = Object.assign({
          enterpriseId: '001'
        }, this.vipinput)
        param.ccSelectedProjectVoList = this.ccPackageGiveList
        editvipCard(param).then(res => {
          if (res.data.code == 200) {
            this.getvipList()
            this.$message.success('修改成功!')
            this.$refs.addGiveChild.checkGoodIds = []
            this.$refs.addGiveChild.materials_arr = []
            this.$refs.addGiveChild.materials_data = []
            this.ccPackageGiveList = []
            this.change = true
            this.vipinput = clone(this.vipCard)
          } else {
            this.$message.error(res.data.msg)
          }
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

<style scoped lang="scss">
.main-content {
    display: flex;
    justify-content: space-between;
    height: calc(100% - 50px);
}
.left_box {
    flex: 1;
    padding-right: 40px;
    border-right: 1px solid #ddd;
    .club_box {
        width: 100%;
        border: 1px solid #C0CCDA;
        .input_box {
            padding-top: 30px;
            display: flex;
            flex-wrap: wrap;
            border-bottom: 1px solid #EBEBEB;
            li {
                display: flex;
                align-items: center;
                width: 300px;
                padding-bottom: 30px;
                label {
                    width: 100px;
                    padding-right: 10px;
                    text-align: right;
                }
                .el-input {
                    width: 140px;
                }
            }
        }
        .addpresent {
            display: flex;
            align-items: center;
            margin: 7px 0;
            p {
                color: #3BB3FF;
                width: 120px;
                text-align: center;
                border-right: 1px solid #ddd;
                line-height: 32px;
                margin: 5px 0;
                cursor: pointer;
            }
            .el-tag {
                margin: 5px 0 5px 20px;
            }
        }
    }
    .el-button {
        margin: 20px 0 30px 20px;
        float: right;
    }
}
.explain {
    width: 400px;
    color: #475669;
    padding: 0 0 0 40px;
    box-sizing: border-box;
    textarea {
        padding: 10px;
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
    .el-button {
        float: right;
    }
}
.el-table {
    margin-bottom: 25px;
}
.item-detail {
    width: 100%;
    line-height: 32px;
    text-align: center;
    display: flex;
    justify-content: space-around;
    li {
        flex: 1;
        text-align: center;
    }
    li:nth-of-type(2) {
        flex: 2;
    }
}
.item-detail:first-child {
    line-height: 36px;
    background: #f4f4f4;
    font-weight: bold;
}
</style>
