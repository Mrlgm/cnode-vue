<template>
  <div>
    <span>我是子组件</span>---{{msg}} <br>
    我是子组件拿到的全局状态：{{getNum}} <br>
    <button @click="sendMessage">子传父</button>
    <button @click="sAdd">子组件--改变状态</button>
    <button @click="sAddAction">子组件--改变状态(action)</button>
  </div>
</template>

<script>
  export default {
    name: "son",
    data: function () {
      return {
        toFatherMessage: '我是你的子组件'
      }

    },
    props: {
      msg: {
        type: String,
        default: ''
      }
    },
    methods: {
      sendMessage: function () {
        this.$emit('hander', this.toFatherMessage)
      },
      sAdd() {
        this.$store.commit('increase')
      },
      sAddAction(){
        this.$store.dispatch('decreaseAction')
      }
    },
    computed: {
      getNum: function () {
       //return this.$store.state.num
        return this.$store.getters.getNum
      }
    }
  }
</script>

<style scoped>

</style>
