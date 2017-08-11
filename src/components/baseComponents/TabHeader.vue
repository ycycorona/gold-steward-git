<template>
  <div class="my-tab-header">
    <!--父组件通过v-model绑定的data属性可以通过this.$emit('input', val)来变更-->
    <button-tab v-model="currPage" :height="35">
      <button-tab-item >order</button-tab-item>
      <button-tab-item >order list</button-tab-item>
    </button-tab>
  </div>
</template>

<script>
  import { ButtonTab, ButtonTabItem } from 'vux'
  export default {
    name: '',
    components: {
      ButtonTab, ButtonTabItem
    },
    created(){
      /*页面初始化时，根据不同路由切换顶部的TAB*/
      let currRoputerPath = this.$route.path;
      if(currRoputerPath == "/index"){
        this.$store.commit('changeCurrPage',0)
        console.log("进入"+currRoputerPath);
      }else if(currRoputerPath == "/order-list"){
        this.$store.commit('changeCurrPage',1)
        console.log("进入"+currRoputerPath);
      }
    },
    data () {
      return {
        msg: 'Hello World!'
      }
    },
    computed:{
      currPage:{
        get(){
          return this.$store.state.currPage;
        },
        set(val){
          this.$store.commit('changeCurrPage',val)
        }
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

<style scoped>
  .vux-button-group{
    background-color: #f10215;
  }
  .vux-button-group>a{
    border-radius: 0 !important;
    background-color: transparent !important;
    color: #FFF !important;
  }
  .vux-button-group > a:after{
    border-radius: 0 !important;
    border: 1px solid #f10215 !important;
    color: #f10215 !important;
  }
  .vux-button-group > a.vux-button-group-current{
    background: #f10215 !important;
    border-bottom: white 5px solid;
  }
</style>
