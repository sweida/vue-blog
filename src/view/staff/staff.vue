<template>
  <div >
    <div class="warp">
      <div class="header_title">员工管理<i class="el-icon-info"></i></div>
      <div class="main-content">
        <div class="main-head">
          <div>
            <input type="text" class="search" v-model="search">
            <i class="el-icon-search"></i>
          </div>
          <el-button type="primary" size="small" @click="added">新　增</el-button>
        </div>
        <div class="main_table">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            max-height="600"
            tooltip-effect="dark"
            >
            <el-table-column
              prop="name"
              label="员工">
            </el-table-column>
            <el-table-column
              prop="post"
              label="职位">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="手机号"
              >
            </el-table-column>
            <el-table-column
              prop="club"
              label="会所"
              >
            </el-table-column>
            <el-table-column
              label="修改"
              >
              <template slot-scope="scope">
                <i class="el-icon-edit"></i>
              </template>
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <i class="el-icon-delete"></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <el-dialog title="新增员工" :visible.sync="dialogVisible" width="1000px">
      <div class="rechargeli">
        <div class="top"></div>
        <div class="user-img">
          <img :src="img" alt="">
        </div>
        <el-form ref="form" v-model="newstaff" label-width="90px" >
          <el-form-item label="姓名">
           <el-input v-model="newstaff.name" size="mini" ></el-input>
          </el-form-item>
          <el-form-item label="手机号">
           <el-input v-model="newstaff.phone" size="mini" ></el-input>
          </el-form-item>
          <el-form-item label="职位">
            <el-select v-model="newstaff.post" placeholder="请选择职位" size="mini">
              <el-option label="销售" value="xiaoshou"></el-option>
              <el-option label="前台" value="qiantai"></el-option>
              <el-option label="护士" value="hushi"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会所">
            <el-select v-model="newstaff.organ" placeholder="请选择会所" size="mini">
              <el-option label="王狮传奇南山总店" value="nanshan"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="直接添加">
            <el-radio-group v-model="newstaff.direct">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="登录移动端">
            <el-radio-group v-model="newstaff.moblie">
              <el-radio :label="1">允许</el-radio>
              <el-radio :label="2">不允许</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false" size="small">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>

export default {
  name: 'app',
  data(){
    return{
      search:'',
      dialogVisible:false,
      img:'static/img/phone.png',
      tableData: [{
        name:'小可爱',
        post: '销售',
        club: '王狮传奇南山总店',
        phone:'13798661922',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        name:'小可爱',
        post: '销售',
        club: '王狮传奇南山总店',
        phone:'13798661922',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        name:'小可爱',
        post: '销售',
        club: '王狮传奇南山总店',
        phone:'13798661922',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      newstaff:{
        name:'',
        post: '',
        organ: 'nanshan',
        phone:'',
        direct:1,
        moblie:1,
      }
    }
  },
  methods:{
    added(){
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped lang="scss">

.main-content{
  padding:0 40px;
  .main-head{
    color:#5e6d82;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1000px;
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
  .main_table{
    width: 1000px;
    i{
      cursor: pointer;
      padding:5px 0;
      font-size: 20px;
    }
  }
  .el-input{
    width: 150px;
  }
  .el-select{
    width: 100px;
  }
  .phone_bg{
    width: 400px;
    height: 600px;
    background: url(/static/img/phone_bg.png) no-repeat center top;
    text-align: center;
    img{
      margin-top: 60px;
      height: 425px;
      width: 230px;
    }
  }
  .text_li{
    padding-right: 50px;
    border-right: 1px solid #ddd;
    li{
      color: #3cb4ff;
      font-size: 18px;
      border-left: 3px solid #3cb4ff;
      padding-left: 10px;
      margin: 30px 0;
      line-height: 18px;
    }
    .text_main{
      padding-left: 15px;
      color: #666;
    }
    input{
      color: #666;
      border: 0;
      border-bottom: 1px solid #ddd;
      outline: none;
      line-height: 30px;
      margin: 5px 0 10px;
    }
  }
  .company_table{
    margin: 40px;
    width: 700px;
  }
}
.footer{
  position: absolute;
  height: 55px;
  padding:30px;
  box-sizing: border-box;
  border-top: 1px solid #f2f2f2;
  width: 100%;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.el-icon-delete{
  cursor: pointer;
  padding:5px 0;
  font-size: 20px;
}
</style>
