<template>
  <div >
    <div class="header_title">员工管理<i class="el-icon-info"></i></div>
    <div class="main-content scroll">
      <div class="main-head">
        <div>
          <input type="text" class="search" v-model="search" v-on:keyup.enter="searchBtn">
          <i class="el-icon-search" @click="searchBtn"></i>
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
            prop="organ"
            label="会所"
            >
          </el-table-column>
          <el-table-column
            label="修改"
            >
            <template slot-scope="scope">
              <i class="el-icon-edit" @click="edit(scope.$index)"></i>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <i class="el-icon-delete" @click="deleteBtn(scope.$index)"></i>
            </template>
          </el-table-column>
        </el-table>
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
            <el-select v-model="newstaff.organ_id" placeholder="请选择会所" size="mini">
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
        name:'小可爱1',
        post: '销售',
        organ: '王狮传奇南山总店',
        organ_id:'nanshan',
        phone:'13798661922',
      }, {
        name:'小可爱2',
        post: '销售',
        organ: '王狮传奇南山总店',
        organ_id:'nanshan',
        phone:'13798661922',
      }, {
        name:'小可爱3',
        post: '销售',
        organ: '王狮传奇南山总店',
        organ_id:'nanshan',
        phone:'13798661922',
      }],
      newstaff:{
        name:'',
        post: '',
        organ_id: 'nanshan',
        phone:'',
        direct:1,
        moblie:1,
      }
    }
  },
  methods:{
    added(){
      this.dialogVisible = true
      this.newstaff={
        name: '',
        post: '',
        organ_id: 'nanshan',
        phone: '',
        direct: 1,
        moblie: 1,
      }
    },
    edit(index){
      this.dialogVisible = true
      this.newstaff = this.tableData[index]
    },
    deleteBtn(index){
      this.$confirm('是否删除该员工?', '提示', {
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index,1)
        this.$message.success('删除成功!')
      }).catch(() => {
      });
    },
    //搜素客户
    searchBtn() {
      console.log('搜索')
    },
  }
}
</script>

<style scoped lang="scss">

.main-content{
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
}

</style>
