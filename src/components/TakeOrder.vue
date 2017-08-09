<template>
  <div>
    <div>
      <XImg
        class="ximg-width-base"
        :src="'/static/imgs/demo.jpg'"
      ></XImg>
    </div>

    <div class="y-card flex-wrap">
      <div class="img-wrap">
        <img src="/static/imgs/sender.png" width="50" alt="寄件人">
      </div>
      <div>
        <Divider>
          <x-icon type="ios-loop" size="25"></x-icon>
        </Divider>
      </div>
      <div class="img-wrap">
        <img src="/static/imgs/receiver.png" width="50" alt="寄件人">
      </div>
    </div>
  </div>
</template>

<script>
  import { XImg, Divider } from 'vux'
  export default {
    name: 'TakeOdder',
    components: {
      XImg, Divider
    },
    data () {
      return {
        msg: 'Hello World!'
      }
    }
  }
</script>

<style scoped>
  .ximg-width-base{
    width: 100%;
    height: auto;
  }
  .y-card{
    background-color: white;
    margin: auto 5px;
  }
  .flex-wrap{
    display: flex;
    justify-content: space-around;
    align-items:center;
  }
  .flex-wrap>div{
    flex: 1;
    flex-grow: 1;
  }
  .img-wrap{
    text-align: center;
  }
</style>
