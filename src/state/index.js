import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

//创建状态仓库，注意Store，state
export default new Vuex.Store({
  state: {
    num: 88
  },
  mutations: {
    //定义我们的状态改变函数
    increase: function (state) {
      state.num++
    },
    decrease(state) {
      state.num = state.num - 20
    }
  },
  actions: {
    //context为上下文对象
    decreaseAction: function (context) {
      //actions中只能对mutation进行操作，可以进行异步操作
      context.commit('decrease')
    }
  },
  getters: {
    getNum(state) {
      return state.num > 0 ? state.num : 0
    }
  }
})
