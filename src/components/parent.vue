<template>
  <div>
    <span>我是父组件</span>----{{fromSonMessage}} <br>
    我是父组件中拿到的全局状态：{{getCount}}
    <button @click="pAdd">父组件--改变状态</button>
    <button @click="pAddAction">父组件--改变状态(action)</button>
    <hr>
    <son :msg="toSonMsg" @hander="getMessageFromSon"></son>
  </div>
</template>

<script>
  import son from './son'

  export default {
    name: "parent",
    data: function () {
      return {
        toSonMsg: '我是你的父亲',
        fromSonMessage: ''
      }
    },
    components: {
      son
    },
    methods: {
      getMessageFromSon: function (value) {
        this.fromSonMessage = value
      },
      pAdd(){
        this.$store.commit('increase')
      },
      pAddAction(){
        this.$store.dispatch('decreaseAction')
      }
    },
    computed: {
      getCount: function () {
        //return this.$store.state.num
        return this.$store.getters.getNum
      }
    }
  }
</script>

<style scoped>

</style>
