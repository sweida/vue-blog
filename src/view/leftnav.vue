<template>
<div class="aside scroll">
  <router-link :to="item.url" tag="li" v-for="(item, index) in nav" :key="index" >
    <i class="animate05 i"></i>
    <i class="el-icon-document"></i><span>{{item.name}}</span>
  </router-link>
</div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
export default {
  components: {},
  // computed: {
  //   ...mapGetters(['addRouters'])
  // },
  data() {
    return {
      navindex: 0,
      nav: [
      {
        name: '基础设置',
        url: '/admin/setting'
      },
      {
        name: '博客列表',
        url: '/admin/article'
      },
      {
        name: '会员列表',
        url: '/admin/userlist'
      },
      {
        name: '评论列表',
        url: '/admin/comment'
      },
      {
        name: '留言板',
        url: '/admin/message'
      }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.aside {
    // background: #0785fd;
    width: 260px;
    margin-right: 20px;
    height: 100%;
    position: relative;
    // box-shadow: 2px 2px 10px #b5b4b4;
    padding: 40px 0;
    box-sizing: border-box;
    overflow: auto;
    li {
        line-height: 55px;
        height: 55px;
        color: #333;
        font-size: 16px;
        text-align: right;
        position: relative;
        cursor: pointer;
        .i {
            position: absolute;
            background: #0785fd;
            height: 100%;
            width: 5px;
            border-radius: 0 20px 20px 0;
            top: 0;
            // height: 0;
            left: 0;
            // top: 50%;
        }
        span {
            margin-left: 20px;
            display: inline-block;
            width: 160px;
            text-align: left;
        }
    }
    li.router-link-active {
        background: #0785fd;
        border-radius: 0 6px 6px 0;
        color: #fff;
        .i {
            height: 100%;
            background: #59abff;
            top: 0;
        }
    }
    li:hover{
      background: #0785fd;
      color: #fff;
      border-radius: 0 6px 6px 0;
    }
}
</style>
