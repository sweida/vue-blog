<template>
  <div id="page">
    <el-pagination class="page"
                   @size-change="handleSizeChange"
                   @current-change="pageChange"
                   :current-page="pageModel.page"
                   :page-sizes="[5,10,15,20]"
                   :page-size="pageModel.rows"
                   background
                   small
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="pageModel.sumCount">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    name: 'page',
    props: {pageModel: {}},
    methods: {
      //每页条数变化事件dd
      handleSizeChange(val) {
        this.pageModel.rows = val
        this.$emit("selectList");
      },
      //页数变化事件
      pageChange(val) {
        this.pageModel.page = val
        this.$emit("selectList")
      }
    }
  }
</script>
<style>
  #page {
    text-align: center;
    margin-top: 20px;
  }
</style>
