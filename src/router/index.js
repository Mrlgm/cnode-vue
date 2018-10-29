import router from 'vue-router'
import Vue from "vue"
import Article from '../components/Article'
import PostList from '../components/PostList'

Vue.use(router)

//配置路由
export default new router({
  routes: [
    {
      name:'root',
      path:'/',
      components:{
        main:PostList
      }
    },
    {
      name:'post_content',
      path:'/topic/:id',
      components:{
        main:Article
      }
    },
    {
      name: 'user_info',
      path: '/userinfo/:name'
    }
  ]
})
