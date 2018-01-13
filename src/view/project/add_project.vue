<template>
  <div >
      <div class="header_title"><span><router-link to="/project">项目</router-link> <i class="el-icon-arrow-right"></i> 添加项目</span><i class="el-icon-info"></i></div>
      <div class="main-content scroll">
        <div class="form_box">
          <h4>基础信息</h4>
          <el-form ref="form" :model="form" label-width="120px" label-position='left'>
            <el-form-item label="宝贝编号">
              <span>23532423453453422346364W</span>
            </el-form-item>
            <el-form-item label="宝贝名称">
              <el-input size="medium" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="价格">
              <el-input size="medium" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="有效天数">
              <el-input size="medium" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="耗时(分钟)">
              <el-input size="medium" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="所属类目">
              <el-input size="medium" v-model="form.desc"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="form_box">
          <h4>适合肤质</h4>
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
        </div>
        <div class="form_box">
          <h4>配料</h4>
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
        </div>
        <div class="form_box">
          <h4>功效</h4>
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
        </div>
        <div class="form_box">
          <h4>添加赠送+</h4>
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
        </div>
        <div class="form_box">
          <h4>其它信息</h4>
          <el-form ref="form" :model="form" label-width="150px" label-position='left'>
            <el-form-item label="折扣信息">
              <el-radio-group v-model="form.type">
                <el-radio :label="1">参与会员折扣</el-radio>
                <el-radio :label="2">不参与会员折扣</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否支持上面服务">
              <el-radio-group v-model="form.type">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="2">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否销售">
              <el-radio-group v-model="form.type">
                <el-radio :label="1">否</el-radio>
                <el-radio :label="2">是</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="在ipad上显示">
              <el-radio-group v-model="form.type">
                <el-radio :label="1">否</el-radio>
                <el-radio :label="2">是</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="作为ipad推荐项目">
              <el-radio-group v-model="form.type">
                <el-radio :label="1">否</el-radio>
                <el-radio :label="2">是</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="消耗提成类型">
              <el-radio-group v-model="form.type">
                <el-radio :label="1">消耗固定提成</el-radio>
                <el-radio :label="2">消耗百分比提成</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="提成金额">
              <el-input size="medium" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="百分比例">
              <el-input size="medium" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="销售提成类型">
              <el-radio-group v-model="form.type">
                <el-radio :label="1">消耗固定提成</el-radio>
                <el-radio :label="2">消耗百分比提成</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="提成金额">
              <el-input size="medium" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="百分比例">
              <el-input size="medium" v-model="form.desc"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <el-dialog title="新增代金券" :visible.sync="voucherDialog" width="1000px">
        <div class="form_box">
          <h4>选择</h4>
          <el-form ref="form" :model="form" label-width="120px" label-position='left'>
            <el-form-item label="类型">
              <el-radio-group v-model="form.type">
                <el-radio :label="1">代金券</el-radio>
                <el-radio :label="2">现金券</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否专项">
              <el-radio-group v-model="form.exclusive">
                <el-radio :label="1">通用</el-radio>
                <el-radio :label="2">专项</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
        <div class="form_box">
          <h4>设置</h4>
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
      </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      search: '',
      bed: 1,
      input: '',
      voucherDialog: false,
      banner: 'static/img/phone.png',
      form: {
        type: 1,
        exclusive: 1,
        region: '',
        desc: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王狮传奇南山总店',
        phone: '13798661922',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05  -04',
        name: '王狮传奇南山总店',
        phone: '13798661922',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王狮传奇南山总店',
        phone: '13798661922',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王狮传奇南山总店',
        phone: '13798661922',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      tags: [
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
    }
  }
}
</script>

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
  h4{
    width: 200px;
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
}
.form_box:first-child .el-form-item {
  margin-bottom: 10px;
}
.li_box{
  width: 800px;
  border:1px solid #ddd;
  height: 200px;
  .el-tag{
    margin: 5px 0 5px 20px;
  }
}

</style>
