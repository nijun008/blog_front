<template>
  <div class="wrap">
    <div class="content">
      <h2>{{ content.title }}</h2>
      <p v-if="content.user">{{ content.tag.name }} {{ content.user.username }} {{ content.createTime }} {{ content.views }}</p>
      <p>{{ content.content }}</p>
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
  .content{
    background-color: #eee;
  }
</style>
