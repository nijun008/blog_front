<template>
  <div class="wrap main-wrap">
    <div class="content main">
      <div class="list" v-for="item in contents" :key="item._id.toString()">
        <h3><a href="">{{ item.title }}</a></h3>
        <p v-if="item.user">
          <el-tag>{{ item.tag.name }}</el-tag>
          作者：{{ item.user.username }} 发布时间：{{ item.createTime }} 阅读：{{ item.views }}</p>
        <p>{{ item.description }}</p>
        <p>
          <router-link :to="{ path: '/content', query: { id: item._id.toString() }}">
            <el-button size="medium">阅读全文</el-button>
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      contents: [],
      req: {
        tag: '',
        page: 1
      },
      res: {}
    }
  },
  created () {
    this.getContents()
  },
  computed: {
    nowTag () {
      return this.$store.state.tag
    }
  },
  watch: {
    '$store.state.tag': function () {
      this.req.tag = this.$store.state.tag
      this.getContents()
    }
  },
  methods: {
    getContents () {
      this.axios('/api/contents/?tag=' + this.req.tag + '&page=' + this.req.page).then(res => {
        this.contents = res.data.contents
      })
    }
  }
}
</script>

<style scoped>
  .main-wrap{
    background-color: #eee;
  }
</style>
