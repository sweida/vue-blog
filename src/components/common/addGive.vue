<template>
<el-dialog :visible="burdening" title="添加赠送" width="1050px" class="burbox" @close="cancelSave">
  <div class="tableDialog">
    <div class="tabs">
      <p class="nav-title">
        <span>{{menuList.name}}</span>
      </p>
      <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="handleSelect">
        <template v-for="(item, index) in menuList.childMenu" :keys="index">
            <el-menu-item :index="item.url" v-if="item.childMenu==null || item.childMenu==''" @click="changeMenu(item)">
              <template slot="title">
                <span>{{item.name}}</span>
              </template>
        </el-menu-item>
        <el-submenu :index="item.url" v-else>
          <template slot="title">
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
      <el-table ref="goods" :data="materials_arr" stripe style="width:100%" max-height='450' tooltip-effect="dark" @select="selectGoods" @select-all="selectAllGoods" @selection-change="addtableList" @expand-change="getSetMealDetails">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div v-loading="loading" >
              <div>
                <div class="item-details" style="width: 100%;height: 50px;line-height: 50px;text-align: center;background: #f4f4f4;font-weight:bold">
                  <div style="width: 20%;display: inline-block">类型</div>
                  <div style="width: 40%;display: inline-block">名称</div>
                  <div style="width: 20%;display: inline-block">价值</div>
                  <div style="width: 10%;display: inline-block">数量</div>
                </div>
                <div class="item-details" v-for="item in scope.row.ccSelectedProjectVos" style="width: 100%;height: 30px;line-height: 30px;text-align: center">
                  <div style="width: 20%;display: inline-block">{{item.coupType == 0 ? projectType[3] : projectType[item.projectType-1]}}</div>
                  <div style="width: 40%;display: inline-block">{{item.projectName}}</div>
                  <div style="width: 20%;display: inline-block">{{item.projectPrice}}</div>
                  <div style="width: 10%;display: inline-block">{{item.projectNum}}</div>
                </div>
              </div>
            </div>
            </template>
        </el-table-column>
        <el-table-column prop="projectName" label="名称">
        </el-table-column>
        <el-table-column prop="effectiveDays" label="有效天数">
        </el-table-column>
        <el-table-column type="selection" label="选择" width="80">
        </el-table-column>
      </el-table>
    </div>
    <!-- 默认选择 -->
    <div class="burli2">
      <el-table ref="hasCheck" :data="materials_data" stripe style="width: 400px;margin-bottom:20px;" max-height='400' @expand-change="getSetMealDetails" @select="checkSelectGoods" @select-all="checkSelectAllGoods">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div v-loading="loading" >
              <div>
                <div class="item-details" style="width: 100%;height:100%;height: 50px;line-height: 50px;text-align: center;background: #f4f4f4;font-weight:bold">
                  <div style="width: 20%;display: inline-block">类型</div>
                  <div style="width: 40%;display: inline-block">名称</div>
                  <div style="width: 20%;display: inline-block">价值</div>
                  <div style="width: 10%;display: inline-block">数量</div>
                </div>
                <div class="item-details" v-for="item in scope.row.ccSelectedProjectVos" style="width: 100%;height:100%;height: 30px;line-height: 30px;text-align: center">
                  <div style="width: 20%;display: inline-block">{{item.coupType == 0 ? projectType[3] : projectType[item.projectType-1]}}</div>
                  <div style="width: 40%;display: inline-block">{{item.projectName}}</div>
                  <div style="width: 20%;display: inline-block">{{item.projectPrice}}</div>
                  <div style="width: 10%;display: inline-block">{{item.projectNum}}</div>
                </div>
              </div>
            </div>
            </template>
        </el-table-column>
        <el-table-column prop="projectName" label="名称">
        </el-table-column>
        <el-table-column prop="effectiveDays" label="有效天数">
        </el-table-column>
        <el-table-column prop="projectNum" label="数量">
          <template slot-scope="scope">
              <el-input-number v-model="scope.row.projectNum"  :min='1'></el-input-number>
            </template>
        </el-table-column>
        <el-table-column type="selection" label="选择" width="50">
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
import { getVouterDetail, givePlanDetail } from '@/api/product'
import { parseTime, clone } from '@/utils/common'
export default {
  data() {
    return {
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
      getVouterDetail(5, child.id).then(res => {
        this.materials_arr = res.data.data
        this.materials_arr.forEach(item => {
          if (this.checkGoodIds.length != 0) {
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
    //已选择表格打钩事件
    checkSelect(val) {
      if (val == null) {
        this.materials_data.forEach(item => {
          setTimeout(() => {
            this.$refs.hasCheck.toggleRowSelection(item)
          }, 0)
        })
      } else if (Object.prototype.toString.call(val) == '[object Array]') {
        return false
      } else {
        this.materials_data.forEach(item => {
          if (item.id == val.id) {
            this.$refs.hasCheck.toggleRowSelection(item)
          }
        })
      }
    },
    // 已选打钩时更新待选择表格的勾
    waitSelect(val) {
      if (Object.prototype.toString.call(val) == '[object Array]') {
        val.forEach(child => {
          this.materials_arr.forEach(item => {
            if (child.id == item.id) {
              this.$refs.goods.toggleRowSelection(item)
            }
          })
        })
      } else {
        this.materials_arr.forEach(item => {
          if (val.id == item.id) {
            this.$refs.goods.toggleRowSelection(item)
          }
        })
      }
    },
    // 单选共用方法
    oneCommon(selection, val) {
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
    // 待选列表多选
    allCommon(val) {
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
            this.$refs.hasCheck.toggleRowSelection(good)
            this.checkGoodIds.push(good.id)
          }
        })
      }
    },
    selectGoods(selection, val) {
      this.oneCommon(selection, val)
      this.checkSelect(val)
    },
    selectAllGoods(val) {
      this.allCommon(val)
      this.checkSelect(val)
    },
    checkSelectGoods(selection, val) {
      this.waitSelect(val)
      this.oneCommon(selection, val)
    },
    checkSelectAllGoods(val) {
      if (this.materials_data.length != 0) {
        this.waitSelect(this.materials_data)
        this.materials_data = []
        this.checkGoodIds = []
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
