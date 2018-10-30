<template>
  <div id="app">
    <Header></Header>

    <div class="main">
      <div class="slider">
        <router-view name="slideBar"></router-view>
      </div>
      <div class="content">
        <router-view name="main"></router-view>
      </div>

    </div>
  </div>
</template>

<script>
  import Header from './components/Header'
  import PostList from './components/PostList'


  export default {
    name: 'App',
    components: {
      Header,
      PostList
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
  }

  body {
    background-color: #E1E1E1;
  }
  .main{
    width: 90%;
    max-width: 1400px;
    min-width: 960px;
    margin: 15px auto;
    min-height: 400px;
  }
  .slider{
    width: 290px;
    float: right;
  }
  .content{
    margin-right: 305px;
  }
</style>
