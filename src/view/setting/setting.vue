<template>
  <div >
      <div class="header_title">设置<i class="el-icon-info"></i></div>
      <div class="main-content scroll">

        <div class="rechargeli">
          <div class="top"></div>
          <p class="title">营业设定</p>
          <div class="user-img">
            <img :src="img" alt="">
          </div>
          <el-form ref="form" v-model="setting" label-width="130px" >
            <el-form-item label="营业开始时间">
              <el-time-select size="small" v-model="setting.startTime" :picker-options="{start:'08:00', step: '00:30', end:'24:00' }" placeholder="选择时间"> </el-time-select>
            </el-form-item>
            <el-form-item label="营业结束时间">
              <el-time-select size="small" v-model="setting.endTime" :picker-options="{start:'08:00', step: '00:30', end:'24:00', minTime: setting.startTime }" placeholder="选择时间"> </el-time-select>
            </el-form-item>
            <el-form-item label="预定默认保留时间">
              <el-select v-model="setting.retainTime" size="small">
                <el-option
                  v-for="item in 12"
                  :key="item.value"
                  :label="item*10+'分钟'"
                  :value="item*10">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="客户预约开关">
              <el-switch
                v-model="setting.appointment">
              </el-switch>
            </el-form-item>
          </el-form>
        </div>
        <div class="rechargeli rechargeli2">
          <div class="top"></div>
          <p class="title">其它</p>
          <div class="user-img">
            <img :src="img" alt="">
          </div>
          <el-form ref="form" v-model="setting" label-width="130px">
            <el-form-item label="打印规格" label-width="80px">
              <el-radio-group v-model="setting.print">
                <el-radio :label="1">热敏打印</el-radio>
                <el-radio :label="2">A4打印</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="客户号码显示开关">
              <el-switch
                v-model="setting.phone">
              </el-switch>
            </el-form-item>
            <el-form-item label="耗卡价格显示开关">
              <el-switch
                v-model="setting.phone">
              </el-switch>
            </el-form-item>
            <el-form-item label="跨行业开关">
              <el-switch
                v-model="setting.phone">
              </el-switch>
            </el-form-item>
          </el-form>
        </div>
        <div class="rechargeli rechargeli3">
          <div class="top"></div>
          <p class="title">微信</p>
          <div class="user-img">
            <img :src="img" alt="">
          </div>
          <el-form ref="form" v-model="setting" label-width="120px">
            <el-form-item label="微信公众号ID">
             <el-input v-model="setting.name" size="mini" ></el-input>
            </el-form-item>
            <el-form-item label="微信公众号秘钥">
             <el-input v-model="setting.phone" size="mini" ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="footer">
        <el-button type="primary" size="small">保　存</el-button>
      </div>

  </div>
</template>

<script>


export default {
  name: 'app',
  data(){
    return{
      bed:1,
      input:'',
      img:'static/img/phone.png',
      setting:{
        startTime:'',
        endTime:'',
        retainTime:'30分钟',
        appointment:''
      },
      // setting:{
      //   name:'',
      //   post: '',
      //   organ: 'nanshan',
      //   phone:'',
      //   direct:1,
      //   moblie:1,
      // }
    }
  }
}
</script>

<style>
.rechargeli .el-input--suffix .el-input__inner {
  padding-right: 10px;
}
.rechargeli2 .el-radio+.el-radio {
  margin-left: 12px;
}
.rechargeli2 .el-radio__label {
  padding-left: 6px;
}
.rechargeli2 .el-form-item__label{
  text-align: left;
}
</style>

<style scoped lang="scss">
.main-content{
  display: flex;
  align-items: center;
  padding: 50px 0;
  .main-head{
    color:#5e6d82;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 800px;
    span{
      padding-left: 10px;
      color:#99a9c0;
    }
  }
  .el-input{
    width: 100px;
  }
  .el-select{
    width: 100px;
  }
}
.user-img{
  margin:15px 0 60px;
}
.el-switch{
  margin-left: 60px;
}
</style>
