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
                  v-for="tag in tags"
                  :key="tag.name"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                  >
                  {{tag.name}}
                </el-tag>
              </div>
            </div>
          </div>
          <el-button type="primary" size="small" @click="vipinputBtn" v-if="change">确认新增</el-button>
          <template v-else>
            <el-button type="primary" size="small" @click="sureChange" >保　存</el-button>
            <el-button  size="small" @click="cancel">取　消</el-button>
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

    <el-dialog :visible.sync="burdening" title="编辑配料" width="1050px" class="burbox">
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
import { addvipCard, editvipCard, getvipCard, delvipCard, actDescInfo, editactDesc } from '@/api/setting'
import page from '@/components/common/page'
import { clone } from '@/utils/common'
export default {
  name: 'app',
  components: {
    page
  },
  data() {
    return {
      bed: 1,
      input: '',
      burdening: false,
      actDesc: '',
      banner: 'static/img/phone.png',
      change: true,
      materials_data: [],
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
      ccVipGiftList: [],
      tags: [
        {name: '标签一'},
        {name: '标签二'},
        {name: '标签三'},
        {name: '标签四'},
        {name: '标签五'}
      ]
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
        console.log('修改活动说明', res)
        // this.actDesc = res.data.data.actDesc
        // this.$message.success('活动说明保存成功')
      })
    },
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    },
    addpresent() {
      this.burdening = true
    },
    sureBurden() {
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
        let param = Object.assign({
          enterpriseId: '001',
          // hasGift: 1, // 是否有礼品赠送 0是 1否
          // isDelete: 0,
          ccVipGiftList: [
            {
              giftMoney: 222,
              giftName: '白白',
              giftNum: 2
            },
            {
              giftMoney: 333,
              giftName: '小白白',
              giftNum: 3
            }
          ]
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
      console.log(row)
      this.change = false
      this.vipinput = clone(this.vipcardList[index])
      this.vipTypeId = row.vipTypeId
    },
    // 保存修改
    sureChange() {
      if (this.vipinput.vipTypeName == '' || this.vipinput.startingPointSum == '') {
        this.$message.error('会员卡信息不能为空')
      } else {
        let param = Object.assign({
          enterpriseId: '001',
          vipTypeId: this.vipTypeId,
          ccVipGiftList: [
            {
              giftMoney: 222,
              giftName: '白白',
              giftNum: 2
            },
            {
              giftMoney: 333,
              giftName: '小白白',
              giftNum: 3
            }
          ]
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
    cancel() {
      this.change = true
      this.vipinput = clone(this.vipCard)
    },
    getvipList() {
      getvipCard(this.pageModel, {}).then(res => {
        console.log('获取会员卡列表', res)
        this.pageModel.sumCount = res.data.data.total
        this.vipcardList = res.data.data.rows
      })
    },
    selectRoleList() {
      this.getvipList()
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

</style>
