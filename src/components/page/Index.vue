<template>
  <div class="main">
    <div class="list" v-for="item in contents" :key="item._id.toString()" v-if="contents.length>0">
      <h3 class="title">{{ item.title }}</h3>
      <p class="content-info clearfloat">
        <span v-if="item.tag" class="tag-info"><el-tag size="medium">{{ item.tag.name }}</el-tag></span>
        <span v-if="item.user" class="user-info"><i class="el-icon-edit"></i>{{ item.user.username }}</span>
        <span v-else class="user-info"><i class="el-icon-edit"></i>佚名</span>
        <span v-if="item.createTime" class="time-info"><i class="el-icon-time"></i>{{ item.createTime | formatDate }}</span>
        <span v-if="item.views >= 0" class="view-info"><i class="el-icon-view"></i>{{ item.views }}</span>
      </p>
      <p class="description">{{ item.description }}</p>
      <p class="read">
        <router-link :to="{ path: '/content', query: { id: item._id.toString() }}">
          <el-button size="medium">阅读全文</el-button>
        </router-link>
      </p>
    </div>
    <div class="list" v-if="contents.length==0">
      <i class="el-icon-warning" style="margin-right:6px;color: red;"></i>没有找到文章
    </div>
    <el-pagination
      v-if="pages>1"
      background
      layout="prev, pager, next"
      :total="count"
      :page-size="5"
      @current-change="changePage">
    </el-pagination>
  </div>
</template>

<script>
import { formatDate } from '../../assets/js/date.js'
export default {
  data () {
    return {
      contents: [],
      tag: '',
      pages: 1,
      page: 1,
      count: 5
    }
  },
  created () {
    if (this.$route.query.tag) {
      this.tag = this.$route.query.tag
    }
    this.getContents()
  },
  computed: {
    nowTag () {
      return this.$store.state.tag
    }
  },
  watch: {
    '$store.state.tag': function () {
      this.tag = this.$store.state.tag
      this.page = 1
      this.getContents()
    }
  },
  methods: {
    getContents () {
      this.axios('/api/contents/?tag=' + this.tag + '&page=' + this.page).then(res => {
        this.contents = res.data.contents
        this.pages = res.data.pages
        this.count = res.data.count
      })
    },
    changePage (page) {
      this.page = page
      this.getContents()
    }
  },
  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  }
}
</script>

<style scoped>
  .main-wrap{
    background-color: #f6f6f6;
    padding: 20px 0;
  }
  .list{
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
  .description{
    color: #6d6d6d;
    margin: 14px 0;
    line-height: 22px;
  }
</style>
