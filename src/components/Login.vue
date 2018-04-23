<template>
  <div>
    <div class="login-wrap" v-if="isLogin">
      <template v-if="user.isAdmin">
        <p class="username">管理员，<span> {{ user.username }}</span></p>
        <p>进入<el-button type="text"><a href="/admin" target="_blank" class="target">后台管理</a></el-button></p>
        <p><el-button @click="logOut()" size="medium">退出</el-button></p>
      </template>
      <template v-else>
        <p class="username">Hi，<span> {{ user.username }}</span></p>
        <p><el-button @click="logOut()" size="medium">退出</el-button></p>
      </template>
    </div>
    <div class="login-wrap" v-else>
      <div class="login" v-if="login">
        <el-form :model="loginRule" :rules="loginRules" ref="loginRule" label-width="80px" label-position="left">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginRule.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginRule.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loginSubmit('loginRule')">登录</el-button>
            <el-button @click="reset('loginRule')">重置</el-button>
          </el-form-item>
          <el-form-item>
            <p>没有账号？去<el-button type="text" @click="switchLogin()">注册</el-button></p>
          </el-form-item>
        </el-form>
      </div>
      <div class="register" v-else>
        <el-form :model="register" :rules="registerRules" ref="register" label-width="80px"  label-position="left">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="register.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="register.password"></el-input>
          </el-form-item>
          <el-form-item label="" prop="confirmPassword" style="height: 1px;overflow: hidden;margin-bottom: 0;">
            <el-input type="hidden" v-model="register.confirmPassword"></el-input>
          </el-form-item>
          <el-form-item label="" prop="confirmPassword" style="height: 1px;overflow: hidden;margin-bottom: 0">
            <el-input type="hidden" v-model="register.confirmPassword"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input type="password" v-model="register.confirmPassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="registerSubmit('register')">注册</el-button>
            <el-button @click="reset('register')">重置</el-button>
          </el-form-item>
          <el-form-item>
            <p>已有账号？去<el-button type="text" @click="switchLogin()">登录</el-button></p>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="links">
      <ul>
        <li v-for="(link, index) in links" :key="index"><a :href="link.url" target="_blank">{{ link.title }}</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    var confirm = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.register.password) {
        callback(new Error('两次输入的密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      isLogin: false,
      user: {},
      login: true,
      links: [
        { title: '个人简历', url: '/resume' },
        { title: 'github', url: 'https://github.com/nijun008' }
      ],
      loginRule: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度为3~20位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 16, message: '长度为4~16位', trigger: 'blur' }
        ]
      },
      register: {
        username: '',
        password: '',
        confirmPassword: ''
      },
      registerRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度为3~20位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 16, message: '长度为4~16位', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: confirm, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    if (this.$cookie.get('username')) {
      this.loginRule.username = this.$cookie.get('username')
      this.loginRule.password = this.$cookie.get('password')
      this.loginSubmit('loginRule')
    }
  },
  methods: {
    loginSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('/api/user/login', this.loginRule).then(res => {
            if (res.data.code === 200) {
              this.user = res.data.userInfo
              this.isLogin = true
              this.$cookie.set('username', this.loginRule.username, { expires: '3D' })
              this.$cookie.set('password', this.loginRule.password, { expires: '3D' })
              this.$message({
                message: '登录成功,欢迎您',
                type: 'success'
              })
              this.$store.commit('logIn', res.data.userInfo)
            } else {
              this.$message({
                message: res.data.message,
                type: 'error'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    registerSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('/api/user/register', this.register).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '注册成功,请登录',
                type: 'success'
              })
              this.login = true
            } else {
              this.$message({
                message: res.data.message,
                type: 'error'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    reset (formName) {
      this.$refs[formName].resetFields()
    },
    switchLogin () {
      this.login = !this.login
    },
    logOut () {
      this.axios('/api/user/logout').then(res => {
        if (res.data.code === 200) {
          this.$cookie.delete('username')
          this.$cookie.delete('password')
          this.isLogin = false
          this.user = {}
          this.$message({
            message: '退出成功',
            type: 'success'
          })
          this.$store.commit('logOut')
        } else {
          this.$message({
            message: res.data.message,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.login-wrap, .links{
  background-color: #fff;
  padding: 40px 20px 20px 20px;
}
.username span{
  color: #0084ff;
  line-height: 40px;
}
.links{
  margin-top: 20px;
  padding-top: 20px;
}
.links a, .target{
  color: #44a6ff;
  line-height: 24px;
}
</style>
