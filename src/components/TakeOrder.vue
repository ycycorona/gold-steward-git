<template>
  <div class="take-order">
    <div>
<!--      <XImg
        class="ximg-width-base"
        :src="'/static/imgs/demo.jpg'"
      ></XImg>-->
    </div>
    <div class="y-card flex-wrap">
      <div class="img-wrap" @click="activeSelector($event)" data-picker-role="sender">
        <img src="/static/imgs/sender.png" width="50" alt="寄出">
        <div>
          <x-icon v-if="!senderPickerTypeIsActiveInnAddSelector" type="android-train" size="25"></x-icon>
          <x-icon v-if="!senderPickerTypeIsActiveInnAddSelector" type="android-plane" size="25"></x-icon>
          <x-icon v-if="senderPickerTypeIsActiveInnAddSelector" type="ios-home" size="25"></x-icon>
        </div>
      </div>
      <div>
        <Divider @click.native="exchangePickerType">
          <x-icon type="ios-loop" size="25"></x-icon>
        </Divider>
      </div>
      <div class="img-wrap" @click="activeSelector($event)" data-picker-role="receiver">
        <img src="/static/imgs/receiver.png" width="50" alt="领回">
        <div >
          <x-icon v-if="!receiverPickerTypeTypeIsActiveInnAddSelector" type="android-train" size="25"></x-icon>
          <x-icon v-if="!receiverPickerTypeTypeIsActiveInnAddSelector" type="android-plane" size="25"></x-icon>
          <x-icon v-if="receiverPickerTypeTypeIsActiveInnAddSelector" type="ios-home" size="25"></x-icon>
        </div>
      </div>
    </div>
    <!--发送收取地址时间预览-->
    <div class="y-card-noback">
      <flexbox>
        <flexbox-item>
          <div class="sender-info-pre">
            <group :gutter="5">
              <cell title="寄出地址/时间" value=""></cell>
              <cell>
                <div slot="title" style="min-height:120px ">
                  <div>{{"" + senderInfo.address0 + senderInfo.address1 + senderInfo.address2}}</div>
                  <div>{{"" + senderInfo.time}}</div>
                </div>
              </cell>
            </group>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="receiver-info-pre">
            <group :gutter="5">
              <cell title="领回地址/时间" value=""></cell>
              <cell>
                <div slot="title" style="min-height:120px ">
                  {{"" + receiverInfo.address0 + receiverInfo.address1 + receiverInfo.address2}}
                  <div>{{"" + receiverInfo.time}}</div>
                </div>
              </cell>
            </group>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
    <!--件数保价等-->
    <Group>
      <!--行李件数-->
      <Cell
        title="行李件数  ￥39/件"
        inline-desc="上限为XXXXX">
        <InlineXNumber v-model="bagInfo.bagNum" style="display:block;" :min="0" width="50px" button-style="round"></InlineXNumber>
      </Cell>
      <!--行李保价-->
      <Cell
        primary="content"
        title=""
        class="check-cell">
        <div slot="child" style="position: relative;width: 100%">
          <div style="padding-bottom: 10px">行李保价</div>
          <checker
            v-model="bagInfo.insurance"
            default-item-class="demo5-item"
            selected-item-class="demo5-item-selected"
          >
            <checker-item :value="0">
              <div class="value-big">0元</div>
              <div class="value-little">保价300元/件</div>
            </checker-item>
            <checker-item :value="5">
              <div class="value-big">5元</div>
              <div class="value-little">保价500元/件</div>
            </checker-item>
            <checker-item :value="10">
              <div class="value-big">10元</div>
              <div class="value-little">保价1000元/件</div>
            </checker-item>
          </checker>
        </div>
      </Cell>
      <!--联系方式-->
      <XInput title="联系电话" v-model="bagInfo.phone" placeholder="请输入电话号码">
        <!--<x-button slot="right" type="primary" mini></x-button>-->
      </XInput>
      <!--行李图片-->
      <Cell
      primary="content"
      title="">
      </Cell>
      <UpLoadFile></UpLoadFile>
    </Group>
    <!--<div style="background-color:cornflowerblue;height: 1000px;position: relative">
      asdfa
      sdf
      <div style="position: absolute;bottom: 0">最底部测试</div>
    </div>-->
    <!--价格预览以及下单按钮-->

    <!--地址时间选择器-->
    <div v-transfer-dom>
      <SelectInnAddress ></SelectInnAddress>
    </div>
    <div v-transfer-dom>
      <SelectStationAddress></SelectStationAddress>
    </div>


  </div>
</template>

<script>
  import { TransferDom, XImg, Divider, Flexbox, FlexboxItem, CellFormPreview,
    Group, Cell, Tabbar, TabbarItem, Popup, InlineXNumber, Checker, CheckerItem,
    XInput,XButton} from 'vux'
  import SelectInnAddress from './TakeOrderChildCom/SelectInnAddress'
  import SelectStationAddress from './TakeOrderChildCom/SelectStationAddress'
  import SubmitOrderTab from './baseComponents/SubmitOrderTab'
  import UpLoadFile from './baseComponents/UpLoadFile'
  export default {
    name: 'TakeOdder',
    components: {
      XImg, Divider, SelectInnAddress, SelectStationAddress, Flexbox, FlexboxItem,
      CellFormPreview, Group, Cell, Tabbar, TabbarItem, SubmitOrderTab, Popup, InlineXNumber,
      Checker, CheckerItem, XInput, UpLoadFile, XButton
    },
    directives: {
      TransferDom
    },
    data () {
      return {
        show1:true,
        senderPickerType:"activeInnAddSelector",
        receiverPickerType:"activeStationAddSelector",
        msg: 'Hello World!',
        bagInfo:{
          bagNum:0,
          insurance:5,
          phone:""
        },
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
    computed:{
      costObj(){
        let obj = {
          sendCost: this.bagInfo.bagNum * 39,
          insuranceCost: this.bagInfo.insurance * this.bagInfo.bagNum,
          discounts: 0,
        };
        obj.sumCost = Number(obj.sendCost) + Number(obj.insuranceCost) - Number(obj.discounts);
        return obj;

      },
      senderPickerTypeIsActiveInnAddSelector(){
        return this.senderPickerType == "activeInnAddSelector"
      },
      receiverPickerTypeTypeIsActiveInnAddSelector(){
        return this.receiverPickerType == "activeInnAddSelector"
      },
      senderInfo(){
        if(this.senderPickerType == "activeInnAddSelector"){
          return this.$store.state.innInfo;
        }else{
          return this.$store.state.stationInfo;
        }
      },
      receiverInfo(){
        if(this.receiverPickerType == "activeInnAddSelector"){
          return this.$store.state.innInfo;
        }else{
          return this.$store.state.stationInfo;
        }
      }
    },
    methods:{
      exchangePickerType(){
        let tmp = this.senderPickerType;
        this.senderPickerType = this.receiverPickerType;
        this.receiverPickerType = tmp;
      },
      activeSelector(e){
        let flag = e.currentTarget.dataset.pickerRole;
        if(flag == "sender"){
          this[this.senderPickerType]();
        }else if(flag == "receiver"){
          this[this.receiverPickerType]();
        }
      },
      activeInnAddSelector(){
        this.$store.commit('toggleSelectInnAddress',!this.$store.state.SelectInnAddress);
      },
      activeStationAddSelector(){
        this.$store.commit('toggleSelectStationAddress',!this.$store.state.SelectStationAddress);
      },


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
  /*单选框*/
  .vux-checker-box{
    text-align: center;
  }
  .demo5-item {
    width: 90px;
    height: 32px;
    /*line-height: 26px;*/
    text-align: center;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: #fff;
    margin-right: 6px;
  }
  .demo5-item .value-big{
    font-size: 12px;
    font-weight: 600;
  }
  .demo5-item .value-little{
    font-size: 12px;
  }
  .demo5-item-selected {
    background: #ffffff url(../assets/checker/active.png) no-repeat right bottom;
    border-color: #ff4a00;
  }

</style>
<style>
  .check-cell .weui-cell__ft.vux-cell-primary{
    flex-grow: 0;
  }
  .left-align{
    text-align: left;
  }
  .no-title-cell{
    flex-grow: 0;
  }
</style>
