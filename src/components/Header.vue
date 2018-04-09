<template>
  <div class="wrap header-wrap">
    <div class="banner"></div>
    <div class="content header">
      <ul class="clearfloat tags">
        <li class="fl" @click="$store.commit('changeTag', '')">
          <router-link :to="'/'">主页</router-link>
        </li>
        <li v-for="tag in tags" :key="tag._id.toString()" class="fl" @click="$store.commit('changeTag', tag._id.toString())">
          <router-link :to="{ path: '/', query: { tag: tag._id.toString() }}">{{ tag.name }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import store from '@/store/store'
export default {
  store,
  data () {
    return {
      tags: []
    }
  },
  computed: {
    nowTag () {
      return this.$store.state.tag
    }
  },
  created () {
    this.axios('/api/tags').then(res => {
      this.tags = res.data.tags
    })
  }
}
</script>

<style scoped>
  .header-wrap{
    background-color: #cecece;
  }
  .banner{
    height: 200px;
  }
</style>
