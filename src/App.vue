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
  width: 100%;
  min-height: 100%;
  overflow-x: hidden;
  background-color: #f6f6f6;
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
 /* min-width: 1200px;*/
}
.content{
  max-width: 1200px;
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

/*富文本文章样式*/
.txt a{
  color: #337ab7;
}
.txt a:hover{
  text-decoration: underline;
  color: #23527c;
}
.txt table{
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
.txt table th{
  border-bottom: 2px solid #ccc;
  text-align: center;
  border-right: 1px solid #ccc;
  padding: 3px 5px;
}
.txt table td{
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  padding: 3px 5px;
}
.txt pre{
  display: block;
  padding: 9.5px;
  margin: 0 0 10px;
  font-size: 13px;
  line-height: 1.42857143;
  color: #333;
  word-break: break-all;
  word-wrap: break-word;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.txt p, .txt h1, .txt h2, .txt h3, .txt h4, .txt h5, .txt table, .txt pre{
  margin: 10px 0;
  line-height: 1.5;
}
.txt blockquote{
  display: block;
  border-left: 8px solid #d0e5f2;
  padding: 5px 10px;
  margin: 10px 0;
  line-height: 1.4;
  font-size: 100%;
  background-color: #f1f1f1;
}
.txt ul,.txt ol{
  margin: 10px 0 10px 20px;
}
.txt ul li{
  list-style-type: disc;
}
.txt ol li{
  list-style-type: decimal;
}
.txt pre, .txt code{
  white-space: pre-wrap; /* css-3 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
}
</style>
