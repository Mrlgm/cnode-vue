<template>
  <div>
    我是outter组件拿到的全局状态{{getOutterNum}} <br>
    <button @click="oAdd">out组件--改变状态</button>
    <button @click="oAddAction">out组件--改变状态(action)</button>
  </div>
</template>

<script>
  export default {
    name: "outter",
    methods: {
      oAdd() {
        this.$store.commit('increase')
      },
      oAddAction(){
        this.$store.dispatch('decreaseAction')
      }
    },
    computed: {
      getOutterNum: function () {
        return this.$store.state.num
      }
    }
  }
</script>

<style scoped>

</style>
