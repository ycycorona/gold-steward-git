<template>
  <div>
    <popup v-model="SelectStationAddressShow" height="100%">
      <div class="popup-full-page">
        <PopupHeader
          left-text="取消"
          right-text="确定"
          title="选择机场\火车站"
          :show-bottom-border="false"
          @on-click-left="$store.commit('toggleSelectStationAddress',false);"
          @on-click-right="confirmInput"></PopupHeader>
        <!--地址预览-->
        <group title="地址/时间预览">
          <cell
            primary="content"
            value="value">
            <div style="text-align: center;color: #000;">
              {{stationInfo.address0  +" "+ address1_name +" "+ stationInfo.address2}}
            </div>
          </cell>
          <cell
            primary="content"
            value="value">
            <div style="text-align: center;color: #000;">
              {{stationInfo.time}}
            </div>
          </cell>
        </group>
        <!--地址选择器-->
        <Group title="选择机场/火车站">
          <PopupPicker
            :data='QDStationList'
            value-text-align="left"
            placeholder="选择机场/火车站"
            show-name
            :popup-style="{zIndex: 10002}"
            ref="stationPicker"
            v-model='stationInfo.address1'
            @on-show="isPickerMaskShow=true"
            @on-hide="isPickerMaskShow=false"></PopupPicker>
        </Group>
        <group title="时间">
          <datetime-view
            v-model="stationInfo.time"
            ref="datetime1"
            format="YYYY-MM-DD HH:mm"></datetime-view>
        </group>
      </div>
    </popup>
    <!--因为popup已经用了一个masker,所以其内部的popuppicker要另加一个masker-->
    <Masker
      :fullscreen="true"
      v-if="isPickerMaskShow"
    >
    </Masker>
  </div>
</template>

<script>
  import {
    Popup, XSwitch, Group, Cell, XInput, PopupHeader,
    Picker, DatetimeView,GroupTitle,PopupPicker, dateFormat,
    Masker
  } from 'vux'
  /*选择器数据初始化*/
  import {QDStationList, QDStationListMap} from '../../data/addressData.js'
  /*获得当前日期*/
  let nowDate = dateFormat(new Date(), 'YYYY-MM-DD HH:mm');
  export default {
    name: 'SelectStationAddress',
    components: {
      Popup, XSwitch, Group, PopupHeader, Picker, Cell, XInput, DatetimeView, GroupTitle,
      PopupPicker,Masker
    },
    data () {
      return {
        msg: 'Hello World!',
        isPickerMaskShow:false,
        stationInfo: {
          address0:"青岛市",
          address1:["0"],
          address2:"",
          time:nowDate
        },
        QDStationList:QDStationList
      }
    },
    computed:{
      SelectStationAddressShow: {
        get(){
          return this.$store.state.SelectStationAddress;
        },
        set(value){
          console.log(1);
          this.$store.commit('toggleSelectStationAddress',value);
        }
      },
      address1_name(){
        return QDStationListMap[this.stationInfo.address1[0]];
      }
    },
    methods:{
      confirmInput(){

        let exportAddress = JSON.parse(JSON.stringify(this.stationInfo));
        exportAddress.address1 = this.address1_name;
        this.$store.commit('inputStationInfo',exportAddress);
        this.$store.commit('toggleSelectStationAddress',false);
      }
    }
  }
</script>

<style>

</style>
