<template>
    <div>
        <popup
        v-model="SelectStationAddressShow"
        @on-show="onShow"
        height="100%">
            <div class="popup-full-page">
                <PopupHeader
                    left-text="取消"
                    right-text="确定"
                    title="选择地址"
                    :show-bottom-border="false"
                    @on-click-left="$store.commit('toggleSelectStationAddress',false);"
                    @on-click-right="confirmInput"></PopupHeader>
                <!--地址预览-->
                <group title="地址/时间预览">
                    <cell
                        primary="content"
                        value="value">
                        <div style="text-align: center;color: #000;">
                            {{stationInfo.address0 + " " + address1_name + " " + stationInfo.address2}}
                        </div>
                    </cell>
                    <cell
                        primary="content"
                        value="value">
                        <div
                            :class="{'warn-text': !isTimeValidObj.flag}"
                            style="text-align: center">
                            {{stationInfo.time}}
                        </div>
                        <div class="error-tip" v-show="!isTimeValidObj.flag">{{isTimeValidObj.errorMsg}}</div>
                    </cell>
                </group>
                <!--地址选择器-->
                <Group title="选择区域">
                    <PopupPicker
                        :data='QDdistrictList'
                        value-text-align="left"
                        placeholder="选择区域"
                        show-name
                        :popup-style="{zIndex: 10002}"
                        ref="stationPicker"
                        v-model='stationInfo.address1'
                        @on-show="isPickerMaskShow=true"
                        @on-hide="isPickerMaskShow=false"
                        @on-change="address1OnChange"></PopupPicker>
                </Group>
                <group title="详细地址">
                    <x-input title="" v-model="stationInfo.address2" placeholder="输入详细地址">
                        <x-button slot="right" type="primary" mini @click.native="getPos_1">地图选点</x-button>
                    </x-input>
                </group>
                <group title="时间">
                    <datetime-view
                        :min-hour="16"
                        :max-hour="21"
                        :start-date="nowDate_1"
                        :end-date="nextMonthDate"
                        :minute-list="['00', '30']"
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
        Picker, DatetimeView, GroupTitle, PopupPicker, dateFormat,
        Masker, XButton
    } from 'vux'
    /*选择器数据初始化*/
    import {QDdistrictList, QDdistrictListMap} from '../../data/addressData.js'
    import validateTime from '../../util/validateTime.js'
    /*获得当前日期*/
    let nowDate = dateFormat(new Date(), 'YYYY-MM-DD HH:mm');
    let nowDate_1 = dateFormat(new Date(), 'YYYY-MM-DD');
    let nextDate = dateFormat(new Date(Number(new Date()) + 1000*3600*24), 'YYYY-MM-DD');
    let nextMonthDate = dateFormat(new Date(Number(new Date()) + 1000*3600*24*30), 'YYYY-MM-DD');

    let getLocation; //函数引用
    export default {
        name: 'SelectStationAddress',
        components: {
            Popup, XSwitch, Group, PopupHeader, Picker, Cell, XInput, DatetimeView, GroupTitle,
            PopupPicker, Masker, XButton
        },
        props: {
            //收寄身份
            SRtype: {
                type: String,
                required: true
            }
        },
        data () {
            return {
                msg: 'Hello World!',
                isPickerMaskShow: false,
                stationInfo: {
                    address0: "青岛市",
                    address1: ["0"],
                    address2: "",
                    time: nextDate + '16:00'
                },
                QDdistrictList: QDdistrictList,
                nowDate_1: nowDate_1,
                nextMonthDate: nextMonthDate
            }
        },
        computed: {
            SelectStationAddressShow: {
                get(){
                    return this.$store.state.SelectStationAddress;
                },
                set(value){
                    console.log(1);
                    this.$store.commit('toggleSelectStationAddress', value);
                }
            },
            address1_name(){
                return QDdistrictListMap[this.stationInfo.address1[0]];
            },
            isTimeValidObj() {
                return validateTime(this.SRtype, this.stationInfo.time);
            }
        },
        methods: {
            //区域地址变化时
            address1OnChange(value) {
                this.innInfo.address2 = '';
            },
            confirmInput(){
                if (!this.isTimeValidObj.flag) {
                    this.$vux.toast.show({
                        text: '输入有误',
                        type: 'warn',
                    });
                    return false;
                }
                let exportAddress = JSON.parse(JSON.stringify(this.stationInfo));
                exportAddress.address1 = this.address1_name;
                this.$store.commit('inputStationInfo', exportAddress);
                this.$store.commit('toggleSelectStationAddress', false);
            },
            onShow() {
                //如果总站的数据被清空了
                if(!this.$store.state.stationInfo.time.trim()) {
                    this.stationInfo.time = nextDate + ' 16:00';
                }
            },
            getPos_1() {
                const _this = this;
                this.$vux.confirm.show({
                    title: '请确认',
                    content: `请在${_this.address1_name}区域内选取地址，否则无效`,
                    onCancel () {
                        console.log('用户操作取消');
                    },
                    onConfirm () {
                        _this.showLocationPicker();
                    }
                })
            },
            showLocationPicker() {
/*                let flag = confirm(`请在${this.address1_name}区域内选取地址，否则无效`);
                if (!flag) {
                    return false;
                }*/
                let dom = document.createElement('iframe');
                dom.id = 'getPosition_1';
                dom.frameborder = 0;
                dom.src = 'http://apis.map.qq.com/tools/locpicker?search=1&type=1&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp';
                document.body.appendChild(dom);

                let _thisVue = this;

                getLocation = function(event) {
                    // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
                    let loc = event.data;
                    if (loc && loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
                        _thisVue.passLocationValueToStationInfo(loc);
                        _thisVue.closeLocationPicker();
                    }
                }
                window.addEventListener('message', getLocation, false);
            },
            passLocationValueToStationInfo(loc) {
                console.log(loc);
                let startPos = loc.poiaddress.indexOf(this.address1_name); //区开始的地方
                if (startPos === -1) {
                    this.$vux.toast.show({
                        text: '请选择' + this.address1_name + '的地址',
                        type: 'warn',
                    });
                    return;
                }
                this.stationInfo.address2 = loc.poiaddress.substring(startPos + this.address1_name.length) + loc.poiname;
            },
            closeLocationPicker() {
                document.body.removeChild(document.getElementById('getPosition_1'));
                window.removeEventListener('message', getLocation, false);
            }
        }
    }
</script>

<style scoped>
    .error-tip {
        text-align: center;
        color: red;
    }
    .warn-text {
        color: red;
    }
</style>
