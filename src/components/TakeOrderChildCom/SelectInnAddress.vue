<template>
  <div>
    <popup v-model="SelectInnAddressShow" height="100%">
      <div class="popup-full-page">
        <PopupHeader
          left-text="取消"
          right-text="确定"
          title="选择酒店地址"
          :show-bottom-border="false"
          @on-click-left="$store.commit('toggleSelectInnAddress',false);"
          @on-click-right="confirmInput"></PopupHeader>
        <!--地址预览-->
        <group title="地址/时间预览">
          <cell
            primary="content"
            value="value">
            <div style="text-align: center;color: #000;">
              {{innInfo.address0  +" "+ address1_name +" "+ innInfo.address2}}
            </div>
          </cell>
          <cell
            primary="content"
            value="value">
            <div style="text-align: center;color: #000;">
              {{innInfo.time}}
            </div>
          </cell>
        </group>
        <!--地址选择器-->
        <Group title="选择区">
          <PopupPicker
            :data='QDdistrictList'
            value-text-align="left"
            placeholder="选择区"
            show-name
            ref="innPicker"
            v-model='innInfo.address1'></PopupPicker>
        </Group>
        <group title="详细地址">
          <x-input title="" v-model="innInfo.address2" placeholder="输入酒店详细地址"></x-input>
        </group>
        <group title="取货时间">
          <datetime-view
          v-model="innInfo.time"
          ref="datetime1"
          format="YYYY-MM-DD HH:mm"></datetime-view>
        </group>
      </div>
    </popup>
  </div>
</template>

<script>
  import {
    Popup, XSwitch, Group, Cell, XInput, PopupHeader,
    Picker, DatetimeView,GroupTitle,PopupPicker, dateFormat
  } from 'vux'
  /*选择器数据初始化*/
  let QDdistrictList=[
    [
      {
        name: "市南区",
        value: "370202"
      },
      {
        name: "市北区",
        value: "370203"
      },
      {
        name: "黄岛区",
        value: "370211"
      },
      {
        name: "崂山区",
        value: "370212"
      },
      {
        name: "李沧区",
        value: "370213"
      },
      {
        name: "城阳区",
        value: "370214"
      },
      {
        name: "胶州市",
        value: "370281"
      },
      {
        name: "即墨市",
        value: "370282"
      },
      {
        name: "平度市",
        value: "370283"
      },
      {
        name: "莱西市",
        value: "370285"
      }
    ]
  ];
  let QDdistrictListMap={
    "370202": "市南区",
    "370203": "市北区",
    "370211": "黄岛区",
    "370212": "崂山区",
    "370213": "李沧区",
    "370214": "城阳区",
    "370281": "胶州市",
    "370282": "即墨市",
    "370283": "平度市",
    "370285": "莱西市"
  }
  /*获得当前日期*/
  let nowDate = dateFormat(new Date(), 'YYYY-MM-DD HH:mm');
  export default {
    name: 'SelectInnAddress',
    components: {
      Popup, XSwitch, Group, PopupHeader, Picker, Cell, XInput, DatetimeView, GroupTitle,
      PopupPicker
    },
    mounted(){
console.log();

    },
    data () {
      return {
        msg: 'Hello World!',
        innInfo: {
          address0:"青岛市",
          address1:["370202"],
          address2:"",
          time:nowDate
        },
        QDdistrictList:QDdistrictList
      }
    },
    computed:{
      SelectInnAddressShow: {
        get(){
          return this.$store.state.SelectInnAddress;
        },
        set(value){
          this.$store.commit('toggleSelectInnAddress',value);
        }
      },
      address1_name(){
        return QDdistrictListMap[this.innInfo.address1[0]];
      }
    },
    methods:{
      confirmInput(){

        let exportAddress = this.innInfo.clone();
        exportAddress.address1 = this.address1_name;

        this.$store.commit('inputInnInfo',exportAddress);
        this.$store.commit('toggleSelectInnAddress',false);
      }
    }
  }
</script>

<style>

</style>
