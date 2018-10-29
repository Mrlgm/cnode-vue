<template>
  <div class="article">
    <!--如果正在加载显示loading-->
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif">
    </div>
    <div v-else>
      <div class="topic_header">
        <div class="topic_title">{{post.title}}</div>
        <ul class="changes">
          <li> • 发布于 {{post.create_at | formatDate}}</li>
          <li> • 作者 {{post.author.loginname}}</li>
          <li> • {{post.visit_count}}次浏览</li>
          <li> • 来自 {{post|fromFormat}}</li>
        </ul>
      </div>
      <div v-html="post.content" class="topic_content"></div>
      <div>
        <div class="topBar">{{post.replies.length}} 回复</div>
        <div class="reply_item" v-for="(reply,index) in post.replies">
          <div class="user_avatar">
            <router-link :to="{name:'user_info'}">
              <img :src="reply.author.avatar_url" alt="">
            </router-link>
            <div class="user_info">
              <router-link :to="{name:'user_info'}">
                <span class="loginname">{{reply.author.loginname}}</span>
              </router-link>
              <span class="reply_time">{{index+1}}楼•{{reply.create_at | formatDate}}</span>
            </div>
          </div>
          <p class="reply_content" v-html="reply.content"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Article",
    data: function () {
      return {
        isLoading: false,//是否正在加载
        post: {}//代表当前文章页的所有内容
      }
    },
    methods: {
      getArticleData() {
        this.$axios.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
          .then((res) => {
            if (res.data.success == true) {
              this.isLoading = false
              this.post = res.data.data
              console.log(res)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    beforeMount() {
      this.isLoading = true
      this.getArticleData()
    }
  }
</script>

<style>
  @import url('../assets/markdown-github.css');

  .topic_header {
    background-color: #FFFFFF;
    padding: 10px;
    border-bottom: 1px solid #E5E5E5;
    border-radius: 3px 3px 0 0;
  }

  .topic_title {
    font-size: 22px;
    font-weight: 700;
    margin: 8px 0;
  }

  .changes {
    display: flex;
    font-size: 12px;
    color: #838383;
  }

  .topic_content {
    background-color: #fff;
    padding: 10px;
    margin-bottom: 13px;
    border-radius: 0 0 3px 3px;
  }

  .topBar {
    padding: 10px;
    background-color: #F6F6F6;
    color: #444;
    font-size: 14px;
    border-radius: 3px 3px 0 0;
  }

  .reply_item {
    background-color: #fff;
    border-top: 1px solid #F0EFF0;
    padding: 10px;
  }

  .user_avatar {
    display: flex;
  }

  .user_avatar img {
    width: 30px;
    height: 30px;
    border-radius: 3px;
  }

  .user_avatar .user_info{
    margin-left: 10px;
  }

  .user_avatar .loginname {
    color: #666;
    font-size: 12px;
    font-weight: 700;
  }

  .user_avatar .loginname:hover {
    color: #385f8a;
  }

  .user_avatar .reply_time {
    font-size: 11px;
    color: #08c;
  }

  .user_avatar .reply_time:hover {
    color: #005580;
    text-decoration: underline;
  }

  .reply_content {
    margin-left: 50px;
    margin-top: -15px;
  }

</style>
