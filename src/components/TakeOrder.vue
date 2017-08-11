<template>
  <div>
    <div>
      <XImg
        class="ximg-width-base"
        :src="'/static/imgs/demo.jpg'"
      ></XImg>
    </div>

    <div class="y-card flex-wrap">
      <div class="img-wrap" @click="activeInnAddSelector">
        <img src="/static/imgs/sender.png" width="50" alt="寄件人">
      </div>
      <div>
        <Divider>
          <x-icon type="ios-loop" size="25"></x-icon>
        </Divider>
      </div>
      <div class="img-wrap" @click="activeStationAddSelector">
        <img src="/static/imgs/receiver.png" width="50" alt="寄件人">
      </div>
    </div>
    <SelectInnAddress></SelectInnAddress>
    <SelectStationAddress></SelectStationAddress>
  </div>
</template>

<script>
  import { XImg, Divider } from 'vux'
  import SelectInnAddress from './TakeOrderChildCom/SelectInnAddress'
  import SelectStationAddress from './TakeOrderChildCom/SelectStationAddress'
  export default {
    name: 'TakeOdder',
    components: {
      XImg, Divider, SelectInnAddress, SelectStationAddress
    },
    data () {
      return {
        msg: 'Hello World!'
      }
    },
    methods:{
      activeInnAddSelector(){
        this.$store.commit('toggleSelectInnAddress',!this.$store.state.SelectInnAddress);
      },
      activeStationAddSelector(){
        this.$store.commit('toggleSelectStationAddress',!this.$store.state.SelectStationAddress);
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
