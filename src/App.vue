<template>
  <div id="app">
    <!--顶部页面切换器-->
    <TabHeader v-model="currPage"></TabHeader>
    <!--页面路由载入-->
    <router-view class="router-view"></router-view>
  </div>
</template>

<script>
  import { XHeader, ButtonTab, ButtonTabItem } from 'vux'
  import TabHeader from './components/baseComponents/TabHeader'

  export default {
    name: 'App',
    components: {
      XHeader, ButtonTab, ButtonTabItem, TabHeader
    },
    created () {

      /*不同路由时切换顶部的TAB*/
      let currRoputerPath = this.$route.path;
      if(currRoputerPath == "/index"){
        this.currPage = 0;
        this.$store.state.currPage = 0;
        console.log("进入"+currRoputerPath);
      }else if(currRoputerPath == "/order-list"){
        this.currPage = 1;
        this.$store.state.currPage = 0;
        console.log("进入"+currRoputerPath);
      }
    },
    data () {
      return {
        msg: 'Hello World!',
        currPage: 0,
        direction: 'forward'
      }
    },
    watch: {
      currPage (val) {
        /*监听currPage变动，载入页面*/
        if (val === 0) {
          this.$router.push('/index')
        } else if (val === 1) {
          this.$router.push('/order-list')
        }
      }
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

  body {
    background-color: #fbf9fe;
  }

</style>
<style scoped>
  .flex-wrap{
    display: flex;
    justify-content: space-around;
  }
  .flex-wrap>div{
    flex-grow: 1;
  }
  .tab-header>h1.vux-header-title{
    width: 100%;
    margin: 0;
  }
  /*切换路由动画*/

</style>
