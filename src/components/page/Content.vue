<template>
  <div>

    <div class="content-box">
      <h2 class="title">{{ content.title }}</h2>
      <p class="content-info clearfloat">
        <span v-if="content.tag" class="tag-info"><el-tag size="medium">{{ content.tag.name }}</el-tag></span>
        <span v-if="content.user" class="user-info"><i class="el-icon-edit"></i>{{ content.user.username }}</span>
        <span v-else class="user-info"><i class="el-icon-edit"></i>佚名</span>
        <span v-if="content.createTime" class="time-info"><i class="el-icon-time"></i>{{ content.createTime | formatDate }}</span>
        <span v-if="content.views >= 0" class="view-info"><i class="el-icon-view"></i>{{ content.views }}</span>
      </p>
      <div class="txt" v-html="content.content"></div>
    </div>

    <div class="comments-box">
      <el-form  label-width="70px" :model="commentForm" :rules="rules" ref="commentForm" v-if="loginState">
        <el-form-item label="评论" prop="txt">
          <el-input type="textarea" v-model="commentForm.txt"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitComment('commentForm')">发表评论</el-button>
        </el-form-item>
      </el-form>
      <div v-else class="warn">
        <p><i class="el-icon-warning"></i>登录后才能发表评论!</p>
      </div>
      <div class="comment-list">
        <h4 class="title">评论列表</h4>
        <p v-if="comments.length === 0" class="info">还没有评论</p>
        <div v-else v-for="comment in comments" :key="comment._id.toString()">
          <el-row type="flex" justify="space-between" class="info">
            <el-col class="user"><span>{{ comment.user.username }}</span> 说：</el-col>
            <el-col class="time">{{ comment.createTime | formatDate }}</el-col>
          </el-row>
          <p class="text">{{ comment.txt }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { formatDate } from '../../assets/js/date.js'
export default {
  data () {
    return {
      id: '',
      content: {},
      comments: [],
      commentForm: {
        contentId: '',
        txt: ''
      },
      rules: {
        txt: [
          { required: true, message: '请输入评论内容', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.id = this.$route.query.id
    this.commentForm.contentId = this.$route.query.id
    this.getContent()
  },
  methods: {
    getContent () {
      this.axios('/api/content?id=' + this.id).then(res => {
        this.content = res.data.content
        if (res.data.comments instanceof Array) {
          this.comments = res.data.comments
        } else {
          this.comments = []
        }
      })
    },
    submitComment (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('/api/comment/post', this.commentForm).then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '评论成功'
              })
              this.commentForm.txt = ''
              this.getContent()
            } else {
              this.$message({
                type: 'danger',
                message: '评论失败'
              })
            }
          })
        } else {
          return false
        }
      })
    }
  },
  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  computed: {
    loginState () {
      return this.$store.state.isLogin
    },
    userInfo () {
      return this.$store.state.user
    }
  }
}
</script>

<style scoped>
  .content-box, .comments-box{
    padding: 20px;
    background-color: #fff;
    margin-bottom: 16px;
    border-radius: 5px;
    box-shadow: 0px 2px 2px #ddd;
  }
  .content-box .title{
    line-height: 60px;
    text-align: center;
    margin-bottom: 20px;
  }
  .content-info{
    line-height: 36px;
    color: #8590a6;
  }
  .content-info span{
    display: block;
    float: left;
    margin-right: 20px;
  }
  .content-info i{
    font-size: 18px;
    margin-right: 6px;
  }
  .tag-info{
    width: 100px;
  }
  .user-info{
    width: 120px;
  }
  .user-info i{
    color: #333;
  }
  .time-info{
    width: 210px;
  }
  .time-info i{
    color: #90e2fe;
  }
  .view-info{
    width: 80px;
  }
  .view-info i{
    color: #43d480;
  }
  .txt{
    padding: 30px 0;
  }
  .comments-box .warn{
    text-align: center;
    line-height: 60px;
    color: #6d6d6d;
  }
  .comments-box .warn i{
    color: #df8316;
    margin-right: 5px;
  }
  .comment-list .title{
    text-align: left;
    margin-bottom: 12px;
    font-size: 16px;
    color: #666;
  }
  .comment-list>div{
    margin-bottom: 20px;
  }
  .comment-list .info{
    color: #8590a6;
    line-height: 28px;
  }
  .comment-list .user span{
    color: #00a6cc;
  }
  .comment-list .time{
    text-align: right;
    color: #8590a6;
  }
  .comment-list .text{
    color: #666;
    line-height: 22px;
  }
</style>
