<template>
  <div class="wrap header-wrap">
    <div class="banner"></div>

      <ul class="clearfloat nav">
        <li @click="$store.commit('changeTag', '')">
          <router-link :to="'/'">主页</router-link>
        </li>
        <li v-for="tag in tags" :key="tag._id.toString()" @click="$store.commit('changeTag', tag._id.toString())">
          <router-link :to="{ path: '/', query: { tag: tag._id.toString() }}">{{ tag.name }}</router-link>
        </li>
      </ul>

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
    position: relative;
    background-image: url(../assets/imgs/banner03.jpg);
    background-size: cover;
    background-position: center;
  }
  .banner{
    height: 300px;
  }
  a{
    color: #000;
  }
  .router-link-exact-active{
    color: #fff;
  }
  .nav{
    line-height: 34px;
    font-size: 16px;
    text-align: center;
    position: absolute;
    width: 100%;
    bottom: 0;
  }
  .nav li{
    margin: 0 5px;
    display: inline-block;
  }
  .nav li a{
    display: block;
    padding: 0 8px;
  }
</style>
