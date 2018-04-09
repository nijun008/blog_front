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
html,body,h1,h2,h3,h4,h5,h6,p,div,img,ul,ol,li,header,footer,a,span,em,i{
  margin: 0;
  padding: 0;
}
ul,ol,li{
  list-style-type: none;
}
a{
  text-decoration: none;
  color: #333;
}
.wrap{
  width: 100%;
  min-width: 1200px;
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
