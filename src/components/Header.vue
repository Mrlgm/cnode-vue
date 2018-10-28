<template>
  <div class="header">
    <div class="title">
      <a href="/">
        <img src="../assets/cnodejs_light.svg" alt="">
      </a>
      <input type="text">
    </div>
    <ul>
      <li><a href="#">首页</a></li>
      <li><a href="#">新手入门</a></li>
      <li><a href="#">API</a></li>
      <li><a href="#">关于</a></li>
      <li><a href="#">注册</a></li>
      <li><a href="#">登陆</a></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Header"
  }
</script>

<style scoped>

  .header {
    display: flex;
    background-color: #444444;
    height: 50px;
    justify-content: space-between;
    align-items: center;
  }

  .title {
    display: flex;
    margin-left: 69px;
    align-items: center;
  }

  .title > a {
    width: 120px;
  }

  input {
    margin-left: 20px;
    height: 26px;
    width: 233px;
    border-radius: 15px;
    border: 0;
    background: url(../assets/search.png) 4px 4px no-repeat #888;
    padding-left: 22px;
    color: #666;
    outline: none;
  }

  input:hover {
    background-color: #fff;
  }

  ul {
    display: flex;
    margin-right: 69px;
    list-style: none;
  }

  ul > li {
    padding: 10px 15px;
  }

  ul > li > a {
    color: #ccc;
    font-size: 13px;
    text-decoration: none;
  }

  ul > li > a:hover {
    color: #fff;
  }
</style>
