<template>
  <div>
    <v-head></v-head>
    <div class="wrap main-wrap">
      <div class="content">
        <el-row>
          <el-col :lg="17" :md="24">
            <router-view></router-view>
          </el-col>
          <el-col :lg="6" :offset="1" class="hidden-md-and-down">
            <v-login></v-login>
          </el-col>
        </el-row>
      </div>
    </div>
    <footer>
      <a href="http://www.miitbeian.gov.cn">蜀ICP备18029939号</a>
    </footer>
  </div>
</template>

<script>
import vHead from '../Header.vue'
import vLogin from '../Login.vue'
export default {
  components: {
    vHead,
    vLogin
  },
  data () {
    return {
      msg: '欢迎访问我的博客'
    }
  }
}
</script>

<style scoped>
.main-wrap {
  background-color: #f6f6f6;
  padding: 20px 0;
}
footer {
  color: #8d8d8d;
  font-size: 12px;
  text-align: center;
}
</style>
