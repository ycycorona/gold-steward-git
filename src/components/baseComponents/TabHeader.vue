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
    props:[
      'value'
    ],
    components: {
      ButtonTab, ButtonTabItem
    },
    data () {
      return {
        currPage:this.value,
        msg: 'Hello World!'
      }
    },
    computed:{

    },
    watch: {
      currPage (val) {
        this.$emit('input', val)
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
