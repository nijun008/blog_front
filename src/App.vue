<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body{
  font-family: 'Microsoft YaHei';
  font-size: 14px;
}
.wrap{
  width: 100%;
}
.content{
  width: 1200px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
}
.fl{
  float: left;
}
.fr{
  float: right;
}
.clearfloat:after{
  display: block;
  content: "";
  height: 0;
  visibility: hidden;
  zoom: 1;
  clear: both;
}
</style>
