<template>
  <div id="app">
    <!--顶部页面切换器-->
    <keep-alive>
      <TabHeader
        v-if="hasHeader"
      ></TabHeader>
    </keep-alive>
    <!--页面路由载入-->
    <div style="">
      <keep-alive>
        <router-view
        name="mainPage"
        class="router-view main-page "
        :style="{height: `${height}px`}"
        :class="{'offset-header':hasHeader}"></router-view>
      </keep-alive>
    </div>
    <!--页面固定底栏-->
    <keep-alive>
      <router-view name="bottomTab" class="router-view">

      </router-view>
    </keep-alive>
  </div>
</template>

<script>
  import { TransferDom, XHeader, ButtonTab, ButtonTabItem, Popup } from 'vux'
  import TabHeader from './components/baseComponents/TabHeader'
  import SubmitOrderTab from './components/baseComponents/SubmitOrderTab'
  export default {
    name: 'App',
    components: {
      XHeader, ButtonTab, ButtonTabItem, TabHeader, Popup, SubmitOrderTab
    },
    directives: {
      TransferDom
    },
    created () {
      console.log(this.$route.path);

    },
    data () {
      return {
        height: window.innerHeight - 40 - 50,
        msg: 'Hello World!',
        direction: 'forward',

      }
    },
    computed: {
      hasHeader(){
        return this.$route.fullPath == '/index' || this.$route.fullPath == '/order-list';
      }
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
  .router-view.main-page{
    overflow: auto;
    -webkit-overflow-scrolling: touch;

    /*box-sizing: border-box;*/
  }
  .offset-header{
    padding-top: 40px;
  }
</style>
