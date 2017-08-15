<template>
  <div>
    <div style="background-color:cornflowerblue;height: 1000px">asdfasdf</div>
    <!--价格预览以及下单按钮-->
    <div v-transfer-dom>
      <popup v-model="show1" max-height="50%">
        <div class="popup1">
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
          <p>asdfasdfasdfasdf</p>
        </div>
      </popup>
    </div>

  </div>
</template>

<script>
  import { TransferDom, XImg, Divider, Flexbox, FlexboxItem, CellFormPreview,
    Group, Cell, Tabbar, TabbarItem, Popup} from 'vux'
  import SelectInnAddress from './TakeOrderChildCom/SelectInnAddress'
  import SelectStationAddress from './TakeOrderChildCom/SelectStationAddress'
  import SubmitOrderTab from './baseComponents/SubmitOrderTab'
  export default {
    name: 'TakeOdder',
    components: {
      XImg, Divider, SelectInnAddress, SelectStationAddress, Flexbox, FlexboxItem,
      CellFormPreview, Group, Cell, Tabbar, TabbarItem, SubmitOrderTab, Popup
    },
    directives: {
      TransferDom
    },
    data () {
      return {
        show1:true,
        msg: 'Hello World!',
        list: [{
          label: 'Apple',
          value: '3.29'
        }, {
          label: 'Banana',
          value: '1.04'
        }, {
          label: 'Fish',
          value: '8.00'
        }]
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
  .y-card-noback{
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
