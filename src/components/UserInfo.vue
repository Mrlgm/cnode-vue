<template>
  <div class="UserInfo">
    <!--如果正在加载显示loading-->
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif">
    </div>
    <div class="userInformation">
      <div class="user">
        <div class="topBar"><a href="/">主页</a> <span>/</span></div>
        <section>
          <div class="userInfo">
            <img :src="userInfo.avatar_url" alt="">
            <span>{{userInfo.loginname}}</span>
          </div>
          <p class="score">
            {{userInfo.score}} 积分
          </p>
          <p class="create_at">注册时间：{{userInfo.create_at|formatDate}}</p>
        </section>
      </div>
      <div class="createTopics">
        <div class="topBar">最近创建的话题</div>
        <ul class="topics_list">
          <li v-for="item in topicsLimit">
            <router-link :to="{
              name:'post_content',
              params:{
                id:item.id
              }
            }">
              <span>{{item.title}}</span>
            </router-link>
            <div class="reply_at">{{item.last_reply_at|formatDate}}</div>
          </li>
        </ul>
      </div>
      <div class="replies">
        <div class="topBar">最近参与的话题</div>
        <ul class="reply_list">
          <li v-for="item in replyLimit">
            <router-link :to="{
              name:'post_content',
              params:{
                id:item.id,
                name:item.author.loginname
              }
            }">
              <span>{{item.title}}</span>
            </router-link>
            <div class="reply_at">{{item.last_reply_at|formatDate}}</div>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "UserInfo",
    data() {
      return {
        isLoading: false,
        userInfo: {}
      }
    },
    methods: {
      getUserData() {
        this.$axios.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
          .then((res) => {
            if (res.data.success == true) {
              this.isLoading = false
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
      this.isLoading = true
      this.getUserData()
    }
  }
</script>

<style scoped>
  .topBar {
    padding: 10px;
    background-color: #F6F6F6;
    color: #444;
    font-size: 14px;
    border-radius: 3px 3px 0 0;
  }

  .createTopics,
  .user {
    margin-bottom: 13px;
  }

  .user section {
    background-color: #fff;
    padding: 10px;

  }

  .userInfo {
    display: flex;
  }

  .userInfo img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 3px;
  }

  .userInfo span {
    color: #778087;
  }

  .score {
    margin-top: 15px;
    margin-bottom: 10px;
  }

  .create_at {
    color: #ababab;
    margin-bottom: 10px;
  }

  .reply_list,
  .topics_list {
    background-color: #fff;
  }

  .reply_list li,
  .topics_list li {
    border-top: 1px solid #F0EFF0;
    padding: 10px;
    height: 50px;
    display: flex;
    align-items: center;
  }

  .reply_list li span,
  .topics_list li span {
    max-width: 70%;
    white-space: nowrap;
    font-size: 16px;
    line-height: 30px;
    color: #08c;
  }

  .reply_list li span:hover,
  .topics_list li span:hover {
    text-decoration: underline;
  }

  .reply_at {
    flex-grow: 1;
    text-align: right;
    min-width: 50px;
    color: #778087;
    font-size: 12px;
  }
</style>
