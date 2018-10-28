<template>
  <div class="hello">
    我是传递过来的参数：
    <h3>{{$route.params.worldmsg}}</h3>
    <h3>axios，用来发送请求和拦截响应</h3>
    <button @click="getData()">发送请求</button>
    <ul>
      <li v-for="item in items">{{item.title}}</li>
    </ul>
    <parent/>
    <hr>
    <out/>
  </div>
</template>

<script>
  Vue.prototype.$axios = axios
  import axios from 'axios'
  import Vue from 'vue'
  import qs from 'qs'
  import parent from './parent'
  import out from './outter'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        items: []
      }
    },
    components:{
      parent,
      out
    },
    methods: {
      getData() {
        this.$axios.get('https://cnodejs.org/api/v1/topics',{
          params:{
            page:1,
            limit:10
          }
        })
          .then((res)=>{
            this.items = res.data.data
            console.log(res)
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      postData(){
        this.$axios.post('https://cnodejs.org/api/v1/topics',qs.stringify({
          params:{
            page:1,
            limit:10
          }
        }))
          .then((res)=>{
            console.log(res)
          })
          .catch(function (err) {
            console.log(err)
          })
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
