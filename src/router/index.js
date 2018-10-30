import router from 'vue-router'
import Vue from "vue"
import Article from '../components/Article'
import PostList from '../components/PostList'
import UserInfo from '../components/UserInfo'
import SlideBar from '../components/SlideBar'

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
      path:'/topic/:id&author=:name',
      components:{
        main:Article,
        slideBar:SlideBar
      }
    },
    {
      name: 'user_info',
      path: '/user/:name',
      components:{
        main:UserInfo
      }
    }
  ]
})
