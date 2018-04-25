<template>
  <div class="wrap header-wrap">
    <div class="mini-wrap clearfloat hidden-lg-and-up">

      <div class="nav-btn fr" @click="isOpen = !isOpen" :class="{ xbtn: isOpen }">
        <div class="top-line"></div>
        <div class="middle-line"></div>
        <div class="bottom-line"></div>
      </div>
      <transition name="fade">
      <ul class="mini-nav" v-if="isOpen">
        <li @click="switchTag('')">
          <router-link :to="'/'">主页</router-link>
        </li>
        <li v-for="tag in tags" :key="tag._id.toString()" @click="switchTag(tag._id.toString())">
          <router-link :to="{ path: '/', query: { tag: tag._id.toString() }}">{{ tag.name }}</router-link>
        </li>
      </ul>
    </transition>
    </div>

    <div class="banner"></div>

      <ul class="clearfloat nav hidden-md-and-down">
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
      tags: [],
      isOpen: false
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
  },
  methods: {
    switchTag (tag) {
      this.isOpen = false
      this.$store.commit('changeTag', tag)
    }
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
  .mini-wrap{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: rgba(0,0,0,0.5);
    z-index: 999;
  }
  .nav-btn {
    width: 50px;
    margin-right: 10px;
    padding-top: 8px;
  }
  .nav-btn div{
    height: 5px;
    background-color: #409EFF;
    margin-bottom:  10px;
    border-radius: 2.5px;
    transition: all .4s;
  }
  .mini-nav{
    background-color: rgba(0,0,0,0.5);
    width: 100%;
    overflow: hidden;
    line-height: 32px;
    position: absolute;
    top: 50px;
    right: 0;
    font-size: 16px;
    text-align: right;
  }
  .mini-nav a{
    display: block;
    padding-right: 20px;
    color: #fff;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .mini-nav .router-link-exact-active{
    color: #409EFF;
  }
  .openNav{
    width: 36%;
  }
  .xbtn .top-line{
    margin-top: 8px;
    transform: rotate(210deg);
    width: 65%;
    margin-left: 25%
  }
  .xbtn .middle-line{
    display: none;
  }
  .xbtn .bottom-line{
    transform: rotate(-210deg);
    width: 65%;
    margin-top: 0;
    margin-left: 25%;
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .4s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    width: 0;
  }
</style>
