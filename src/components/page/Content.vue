<template>
  <div class="wrap content-wrap">
    <div class="content">
      <h2 class="title">{{ content.title }}</h2>
      <p class="content-info clearfloat">
        <span v-if="content.tag" class="tag-info"><el-tag size="medium">{{ content.tag.name }}</el-tag></span>
        <span v-if="content.user" class="user-info"><i class="el-icon-edit"></i>{{ content.user.username }}</span>
        <span v-else class="user-info"><i class="el-icon-edit"></i>佚名</span>
        <span v-if="content.createTime" class="time-info"><i class="el-icon-time"></i>{{ content.createTime }}</span>
        <span v-if="content.views >= 0" class="view-info"><i class="el-icon-view"></i>{{ content.views }}</span>
      </p>
      <p class="txt">{{ content.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: '',
      content: {}
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getContent()
  },
  methods: {
    getContent () {
      this.axios('/api/content?id=' + this.id).then(res => {
        this.content = res.data.content
      })
    }
  }
}
</script>

<style scoped>
  .content-wrap{
    background-color: #f6f6f6;
    padding: 20px 0;
  }
  .content{
    padding: 20px;
    background-color: #fff;
    margin-bottom: 16px;
    border-radius: 5px;
    box-shadow: 0px 2px 2px #ddd;
  }
  .title{
    line-height: 36px;
    text-align: center;
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
</style>
