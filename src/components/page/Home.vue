<template>
  <div>
    <v-head></v-head>
    <div class="wrap main-wrap">
      <div class="content">
        <el-row>
          <el-col :span="18">
            <router-view></router-view>
          </el-col>
          <el-col :span="5" :offset="1">
            <v-login></v-login>
          </el-col>
        </el-row>
      </div>
    </div>
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
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>
  .main-wrap{
    background-color: #f6f6f6;
    padding: 20px 0;
  }
</style>
