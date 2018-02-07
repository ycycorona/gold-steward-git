<template>
    <div>
        <popup
            v-model="SelectInnAddressShow"
            @on-show="onShow"
            height="100%">
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
                            {{innInfo.address0 + " " + address1_name + " " + innInfo.address2}}
                        </div>
                    </cell>
                    <cell
                        primary="content"
                        value="value">
                        <div
                            :class="{'warn-text': !isTimeValidObj.flag}"
                            style="text-align: center">
                            {{innInfo.time}}
                        </div>
                        <div class="error-tip" v-show="!isTimeValidObj.flag">{{isTimeValidObj.errorMsg}}</div>
                    </cell>
                </group>
                <!--地址选择器-->
                <Group title="选择区">
                    <PopupPicker
                        :data='QDdistrictList'
                        value-text-align="left"
                        placeholder="选择区"
                        show-name
                        :popup-style="{zIndex: 10002}"
                        ref="innPicker"
                        v-model='innInfo.address1'
                        @on-show="isPickerMaskShow=true"
                        @on-hide="isPickerMaskShow=false"></PopupPicker>
                </Group>
                <group title="详细地址">
                    <x-input title="" v-model="innInfo.address2" placeholder="输入酒店详细地址"></x-input>
                </group>
                <group title="时间">
                    <datetime-view
                        v-model="innInfo.time"
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
        Masker
    } from 'vux'
    import validateTime from '../../util/validateTime.js'
    /*选择器数据初始化*/
    import {QDdistrictList, QDdistrictListMap} from '../../data/addressData.js'
    /*获得当前日期*/
    let nowDate = dateFormat(new Date(), 'YYYY-MM-DD HH:mm');
    export default {
        name: 'SelectAddress',
        components: {
            Popup, XSwitch, Group, PopupHeader, Picker, Cell, XInput, DatetimeView, GroupTitle,
            PopupPicker, Masker
        },
        mounted(){


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
                innInfo: {
                    address0: "青岛市",
                    address1: ["370202"],
                    address2: "",
                    time: nowDate
                },
                QDdistrictList: QDdistrictList
            }
        },
        computed: {
            SelectInnAddressShow: {
                get(){
                    return this.$store.state.SelectInnAddress;
                },
                set(value){
                    this.$store.commit('toggleSelectInnAddress', value);
                }
            },
            address1_name(){
                return QDdistrictListMap[this.innInfo.address1[0]];
            },
            isTimeValidObj() {
                return validateTime(this.SRtype, this.innInfo.time);
            }
        },
        methods: {
            confirmInput(){
                if (!this.isTimeValidObj.flag) {
                    this.$vux.toast.show({
                        text: '输入有误',
                        type: 'warn',
                    });
                    return false;
                }
                let exportAddress = JSON.parse(JSON.stringify(this.innInfo));
                exportAddress.address1 = this.address1_name;

                this.$store.commit('inputInnInfo', exportAddress);
                this.$store.commit('toggleSelectInnAddress', false);
            },
            //当前popup显示之后的回调函数
            onShow() {
                //如果总站的数据被清空了
                //console.log(Boolean(this.$store.state.innInfo.time.trim()));
                if(!this.$store.state.innInfo.time.trim()) {
                    this.innInfo.time = nowDate;
                }
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
