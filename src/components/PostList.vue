<template>
  <div class="postList">
    <!--在数据未返回的时候显示loading-->
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif">
    </div>
    <!--代表帖子列表-->
    <div class="topBar">
      <span>全部</span>
      <span>精华</span>
      <span>分享</span>
      <span>问答</span>
      <span>招聘</span>
      <span>客户端测试</span>
    </div>
    <div>
      <ul>
        <li v-for="post in posts">
          <!--头像-->
          <img :src="post.author.avatar_url" alt="">
          <span class="replyAndVisit">
            <!--回复/浏览-->
            <span class="reply_count">{{post.reply_count}}</span>
            <span class="division">/</span>
            <span class="visit_count">{{post.visit_count}}</span>
          </span>
          <!--帖子的分类-->
          <span :class="[{post_good:post.good,put_top:post.top,topicListTab:(post.good!=true && post.top!=true)}]">{{post | topicFormat}}</span>
          <!--标题-->
          <router-link :to ="{
            name: 'post_content',
            params:{
              id:post.id,
              name:post.author.loginname
            }
            }">
            <span class="topicTitle" href="">{{post.title | formatTitle}}</span>
          </router-link>
          <!--最终回复时间-->
          <span class="lastReply">{{post.last_reply_at|formatDate}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PostList",
    data() {
      return {
        isLoading: false,
        posts: []//代表页面的列表数组
      }
    },
    methods: {
      getData() {
        this.$axios.get('https://cnodejs.org/api/v1/topics', {
          page: 1,
          limit: 20
        })
          .then((res) => {
            this.isLoading = false
            this.posts = res.data.data
          })
          .catch((err) => {
            //处理返回失败后的问题
            console.log(err)
          })
      }
    },
    computed: {},
    beforeMount() {
      this.isLoading = true
      this.getData()
    }
  }
</script>

<style scoped>
  .topBar {
    background-color: #F6F6F6;
    padding: 10px;
    border-radius: 3px 3px 0 0;
    font-size: 14px;
  }

  .topBar > span {
    margin: 0 10px;
    color: #80bd01;

  }

  .topBar > span:first-child {
    background-color: #80bd01;
    color: #fff;
    padding: 1px 4px;
    border-radius: 3px;
  }

  .topBar > span:not(:first-child):hover {
    color: #005580;
  }

  li {
    background: #FFFFFF;
    border-top: 1px solid #F0EFF0;
    padding: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 2em;
  }

  li:hover {
    background: #f5f5f5;
  }

  li > img {
    width: 30px;
    border-radius: 3px;
  }

  .replyAndVisit {
    width: 70px;
    text-align: center;
    height: 100%;
    font-size: 0px;
  }

  .reply_count {
    color: #9e78c0;
    font-size: 14px;
  }

  .division {
    font-size: 10px;
  }

  .visit_count {
    font-size: 10px;
    color: #b4b4b4;
  }

  .post_good, .put_top {
    background: #80bd01;
    border-radius: 3px;
    color: #fff;
    font-size: 12px;
    margin: 2px 4px;
    padding: 3px 4px;
    line-height: 1em;;
  }

  .topicListTab {
    background: #e5e5e5;
    border-radius: 3px;
    color: #999;
    font-size: 12px;
    margin: 2px 4px;
    padding: 3px 4px;
    line-height: 1em;
  }

  span.topicTitle {
    max-width: 70%;
    white-space: nowrap;
    font-size: 16px;
    line-height: 30px;
    color: #333;
  }

  span.topicTitle:visited {
    color: #333;
  }

  span.topicTitle:hover {
    text-decoration: underline;
  }

  .lastReply {
    flex-grow: 1;
    text-align: right;
    min-width: 50px;
    color: #778087;
    font-size: 12px;
  }

</style>
