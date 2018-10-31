<template>
  <div class="SlideBar">
    <div class="author">
      <div class="topBar">作者</div>
      <div class="author_msg">
        <div class="author_link">
          <router-link :to="{
              name:'user_info',
              params:{
                name: userInfo.loginname
              }
            }">
            <img :src="userInfo.avatar_url" alt="">
          </router-link>
          <router-link :to="{
              name:'user_info',
              params:{
                name: userInfo.loginname
              }
            }">
            <span class="author_name">{{userInfo.loginname}}</span>
          </router-link>
        </div>
        <div class="author_score">积分：{{userInfo.score}}</div>
      </div>
    </div>
    <div class="recent_topics">
      <div class="topBar">作者其他话题</div>
      <ul class="topics_list">
        <li v-for="list in topicsLimit">
          <router-link :to="{
            name: 'post_content',
            params:{
              id:list.id,
              name:list.author.loginname
            }
          }">
            {{list.title | titleFormat}}
          </router-link>

        </li>
      </ul>
    </div>
    <div class="recent_replies">
      <div class="topBar">作者回复的话题</div>
      <ul class="reply_list">
        <li v-for="list in replyLimit">
          <router-link :to="{
            name: 'post_content',
            params:{
              id:list.id,
              name:list.author.loginname
            }
          }">
            {{list.title | titleFormat}}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SlideBar",
    data() {
      return {
        userInfo: {}
      }
    },
    methods: {
      getUserData() {
        this.$axios.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
          .then((res) => {
            if (res.data.success == true) {
              this.userInfo = res.data.data
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    computed: {
      topicsLimit() {
        if (this.userInfo.recent_topics) {
          return this.userInfo.recent_topics.slice(0, 5)
        }
      },
      replyLimit() {
        if (this.userInfo.recent_replies) {
          return this.userInfo.recent_replies.slice(0, 5)
        }
      }
    },
    beforeMount() {
      this.getUserData()
    },
    watch: {
      '$route'(to, from) {
        this.getUserData()
      }
    }
  }
</script>

<style scoped>
  .topBar {
    font-size: 13px;
    line-height: 20px;
  }

  .author {
    margin-bottom: 13px;
  }

  .author_msg {
    background-color: #fff;
    padding: 10px;
  }

  .author .author_link {
    display: flex;
    align-items: center;
  }

  .author_name {
    color: #778087;
  }

  .author img {
    width: 48px;
    height: 48px;
    margin-right: 6.5px;
    border-radius: 3px;
  }

  .author_score {
    font-size: 14px;
    line-height: 2em;
    color: #333;
  }

  .recent_topics {
    margin-bottom: 13px;
  }

  .reply_list,
  .topics_list {
    background: #fff;
    padding: 10px;
  }

  .reply_list li a,
  .topics_list li a {
    font-size: 14px;
    line-height: 30px;
    color: #778087;
  }


</style>
