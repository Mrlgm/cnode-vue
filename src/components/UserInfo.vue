<template>
  <div class="UserInfo">
    <!--如果正在加载显示loading-->
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif">
    </div>
    <div class="userInformation">
      <section>
        <img :src="userInfo.avatar_url" alt="">
        <span>{{userInfo.loginname}}</span>
        <p>
          {{userInfo.score}}
        </p>
        <p>注册时间：{{userInfo.create_at| formatDate}}</p>
      </section>
      <div class="createTopics">
        <div>最近创建的话题</div>
      </div>
      <div class="replies">
        <p>最近参与的话题</p>
        <ul>
          <li v-for="item in userInfo.recent_replies">
            <router-link :to="{
              name:'post_content',
              params:{
                id:item.id
              }
            }">
              {{item.title}}
            </router-link>
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
      this.getUserData()
    }
  }
</script>

<style scoped>

</style>
