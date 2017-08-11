<template>
  <div id="app">
    <!--顶部页面切换器-->
    <TabHeader></TabHeader>
    <!--页面路由载入-->
    <keep-alive>
      <router-view class="router-view"></router-view>
    </keep-alive>

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

    },
    data () {
      return {
        msg: 'Hello World!',
        direction: 'forward'
      }
    },
    computed: {

    },
    watch: {

    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import 'style/base.less';
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
