<template>
  <div id="app">
    <!--顶部页面切换器-->
    <TabHeader v-model="currPage"></TabHeader>
    <!--页面路由载入-->
    <router-view></router-view>
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
    data () {
      return {
        msg: 'Hello World!',
        currPage: 0
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
</style>
