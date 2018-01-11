<template>
  <div >
    <div class="warp">
      <div class="header_title">会员卡<i class="el-icon-info"></i></div>
      <div class="main-content">
        <div class="left_box">
          <h4>会员卡信息</h4>
          <div class="club_box">
            <div class="input_box">
              <li>
                <label for="">会员卡级别</label>
                <el-input size="small" placeholder="请输出会员名称"></el-input>
              </li>
              <li>
                <label for="">起点金额</label>
                <el-input size="small"></el-input>
              </li>
              <li>
                <label for="">有效期（天）</label>
                <el-input size="small"></el-input>
              </li>
              <li>
                <label for="">项目折扣</label>
                <el-input size="small"></el-input>
              </li>
              <li>
                <label for="">产品折扣</label>
                <el-input size="small"></el-input>
              </li>
              <li>
                <label for="">套餐折扣</label>
                <el-input size="small"></el-input>
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
          <el-button type="primary" size="small" @click="sureAdd">确认新增</el-button>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            max-height="600"
            tooltip-effect="dark"
            >
            <el-table-column
              prop="name"
              label="会员卡级别">
            </el-table-column>
            <el-table-column
              prop="room"
              label="起点金额">
            </el-table-column>
            <el-table-column
              prop="bed"
              label="项目折扣"
              >
            </el-table-column>
            <el-table-column
              prop="bed"
              label="产品折扣"
              >
            </el-table-column>
            <el-table-column
              prop="bed"
              label="套餐折扣"
              >
            </el-table-column>
            <el-table-column
              label="修改">
              <template slot-scope="scope">
                <i class="el-icon-edit"></i>
              </template>
            </el-table-column>
            <el-table-column
              label="删除">
              <template slot-scope="scope">
                <i class="el-icon-delete"></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="explain">
          <h4>活动说明</h4>
          <textarea name="" id="" cols="30" rows="10" class="scroll" v-model="textarea"></textarea>
          <el-button type="primary" size="small" @click="subText">提　交</el-button>
        </div>

      </div>
    </div>

    <el-dialog title="添加赠送" :visible.sync="dialogVisible" width="1000px">

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
      bed:1,
      input:'',
      dialogVisible:false,
      textarea:'这是说明',
      banner:'static/img/phone.png',
      tableData: [{
        date: '2016-05-02',
        name: '王狮传奇南山总店',
        phone:'13798661922',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王狮传奇南山总店',
        phone:'13798661922',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      tags: [
        { name: '标签一',},
        { name: '标签二',},
        { name: '标签三',},
        { name: '标签四',},
        { name: '标签五',}
      ]
    }
  },
  methods:{
    subText(){
      this.$message.success('活动说明保存成功')
    },
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    addpresent(){
      this.dialogVisible = true
    },
    sureAdd(){
      this.$message.success('会员卡添加成功')
    }
  }
}
</script>

<style scoped lang="scss">
.main-content{
  display: flex;
  justify-content: space-between;
}
.left_box{
  width: 960px;
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
    margin: 20px 0 30px;
    float: right;
  }
}
.explain{
  width: 420px;
  color:#475669;
  padding: 0;
  border-left: 1px solid #ddd;
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
  margin-bottom: 30px;
}
.el-icon-delete{
  cursor: pointer;
  padding:5px 0;
  font-size: 20px;
}
</style>
