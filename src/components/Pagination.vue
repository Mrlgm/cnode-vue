<template>
  <div class="Pagination">
    <span class="button">
      <button class="home" @click="changeBtn">首页</button>
      <button class="prev" @click="changeBtn">上一页</button>
      <button v-if="ellipsis">...</button>
      <button :class="[{currentPage:btn == currentPage},'pageBtn']"
              v-for="btn in pageBtns"
              @click="changeBtn(btn)">
        {{btn}}
      </button>
      <button class="next" @click="changeBtn">下一页</button>
    </span>
  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    name: "Pagination",
    data() {
      return {
        pageBtns: [1, 2, 3, 4, 5, '...'],
        currentPage: 1,
        ellipsis: false
      }
    },
    methods: {
      changeBtn(page) {
        console.log(page.target)
        //点击上一页下一页
        if (typeof page != "number") {
          if (page == '...') {
            return
          } else {
            switch (page.target.innerText) {
              case '上一页':
                $('button.currentPage').prev().click()
                break
              case '下一页':
                $('button.currentPage').next().click()
                break
              case '首页':
                this.pageBtns = [1, 2, 3, 4, 5, '...']
                this.changeBtn(1)
                break
              default:
                break
            }
          }
          return
        }
        this.currentPage = page
        if (page > 3) {
          this.ellipsis = true
        } else {
          this.ellipsis = false
        }
        if (page >= this.pageBtns[3]) {
          this.pageBtns.shift();//移除第一个元素
          this.pageBtns.splice(4, 0, this.pageBtns[3] + 1)
        } else if (page == this.pageBtns[0] && page != 1) {
          this.pageBtns.unshift(this.pageBtns[0] - 1)
          this.pageBtns.splice(5, 1)
        }
        this.$emit('handleList', this.currentPage)
      }
    }
  }
</script>

<style scoped>
  .Pagination {
    padding: 10px;
    background-color: #fff;
  }

  .button {
    border-radius: 3px;
    font-size: 0;
    display: inline-block;
  }

  .button button {
    padding: 4px 12px;
    color: #999;
    box-shadow: none;
    border: 0px;
    border-right: 1px solid #ddd;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
    outline: none;
    line-height: 20px;
  }

  .button button:hover {
    background-color: #f5f5f5;
  }

  .button .home {
    border-left: 1px solid #ddd;
    border-bottom-left-radius: 3px;
    border-top-left-radius: 3px;
  }

  .next {
    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
  }

  .button .currentPage {
    color: #80bd01;
  }
</style>
