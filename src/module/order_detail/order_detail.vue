<template>
  <div id="app">
    <!--页面载入-->
    <OrderDetail
      class="router-view main-page "
      :style="{height: height}"
      :class="{'offset-header':false}"
    ></OrderDetail>
    <!--页面固定底栏-->

  </div>
</template>

<script>
  import OrderDetail from '../../components/OrderDetail.vue'
  export default {
    name: 'App',
    components: {
      OrderDetail
    },
    directives: {

    },
    created () {


    },
    data () {
      return {
        height: window.innerHeight + 'px',
        /*height: window.innerHeight - 40 + 'px',*/
        msg: 'Hello World!',
        direction: 'forward',
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
  @import '../../style/base.less';
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
