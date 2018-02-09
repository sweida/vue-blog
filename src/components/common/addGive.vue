<template>
  <el-dialog :visible.sync="burdening" title="添加赠送" width="1050px" class="burbox" :show-close="false" :close-on-click-modal="false">
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
              <div>
                <div class="item-details" style="width: 100%;height: 50px;line-height: 50px;text-align: center;background: #f4f4f4;font-weight:bold">
                  <div style="width: 10%;display: inline-block">类型</div>
                  <div style="width: 40%;display: inline-block">名称</div>
                  <div style="width: 20%;display: inline-block">价值</div>
                  <div style="width: 10%;display: inline-block">数量</div>
                </div>
                <div class="item-details" v-for="item in scope.row.ccSelectedProjectVos" style="width: 100%;height: 30px;line-height: 30px;text-align: center">
                  <div style="width: 10%;display: inline-block">{{item.coupType == 0 ? projectType[3] : projectType[item.projectType-1]}}</div>
                  <div style="width: 40%;display: inline-block">{{item.projectName}}</div>
                  <div style="width: 20%;display: inline-block">{{item.projectPrice}}</div>
                  <div style="width: 10%;display: inline-block">{{item.projectNum}}</div>
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
          @expand-change="getSetMealDetails"
          >
          <el-table-column type="expand">
            <template slot-scope="scope">
            <div v-loading="loading" >
              <div>
                <div class="item-details" style="width: 100%;height:100%;height: 50px;line-height: 50px;text-align: center;background: #f4f4f4;font-weight:bold">
                  <div style="width: 10%;display: inline-block">类型</div>
                  <div style="width: 40%;display: inline-block">名称</div>
                  <div style="width: 20%;display: inline-block">价值</div>
                  <div style="width: 10%;display: inline-block">数量</div>
                </div>
                <div class="item-details" v-for="item in scope.row.ccSelectedProjectVos" style="width: 100%;height:100%;height: 30px;line-height: 30px;text-align: center">
                  <div style="width: 10%;display: inline-block">{{item.coupType == 0 ? projectType[3] : projectType[item.projectType-1]}}</div>
                  <div style="width: 40%;display: inline-block">{{item.projectName}}</div>
                  <div style="width: 20%;display: inline-block">{{item.projectPrice}}</div>
                  <div style="width: 10%;display: inline-block">{{item.projectNum}}</div>
                </div>
              </div>
            </div>
            </template>
          </el-table-column>
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
      <el-button @click="cancelSave" size="small">取 消</el-button>
      <el-button type="primary" @click="sureBurden" size="small">确认选择</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { giveNav } from '@/api/tree'
import { getgivePlan, givePlanDetail } from '@/api/product'
import { parseTime, clone } from '@/utils/common'
export default {
  data() {
    return {
      pageModel: {
        page: 1,
        rows: 10,
        sumCount: 0
      },
      loading: false,
      menuList: {},
      projectType: ['项目', '产品', '套餐', '优惠券'],
      materials_data: [],
      checkGoodIds: [],
      materials_arr: []
    }
  },
  props: ['burdening'],
  methods: {
    // 改变菜单时得到赠送方案数据
    changeMenu(child) {
      console.log('changeMenu', child.id)
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
    // 获取赠送菜单
    getgiveNav() {
      giveNav().then(res => {
        if (res.data.code == 200) {
          this.menuList = res.data.data[0]
        }
      })
    },
    getSetMealDetails(row, allRows) {
      this.loading = true
      givePlanDetail(row.id).then(res => {
        if (res.data.code == 200) {
          this.loading = false
          row.ccSelectedProjectVos = res.data.data.ccSelectedProjectVos
          console.log(this.materials_arr, res.data.data.ccSelectedProjectVos)
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
    cancelSave() {
      this.$emit('cancelGive')
    },
    // 保存赠送
    sureBurden() {
      if (this.materials_data.length == 0) {
        this.$message.error('还未选择任何方案！')
      } else {
        this.$emit('saveGive', this.materials_data)
      }
    }
  },
  created() {
    this.getgiveNav()
  }
}
</script>

<style lang="css">
</style>
