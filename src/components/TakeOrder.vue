<template>
    <div class="take-order">
        <div>
            <XImg
                class="ximg-width-base"
                :src="basePath + '/mobile_src/imgs/demo1.jpg'"
            ></XImg>
        </div>
        <div class="y-card flex-wrap">
            <div class="img-wrap" @click="activeSelector($event)" data-picker-role="sender">
                <img :src="basePath + '/mobile_src/imgs/sender.png'" width="50" alt="寄出">
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
                <img :src="basePath + '/mobile_src/imgs/receiver.png'" width="50" alt="领回">
                <div>
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
                            <cell title="寄出地址/时间"></cell>
                            <cell>
                                <div slot="title" style="min-height:80px;font-size: 14px">
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
                            <cell title="领回地址/时间"></cell>
                            <cell>
                                <div slot="title" style="min-height:80px;font-size: 14px">
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
                inline-desc="上限为10件">
                <div slot="title">
                    行李件数<span style="padding-left: 1rem">￥39/件</span>
                </div>
                <InlineXNumber v-model="orderInfo.luggageNumber" style="display:block;" :min="0" width="50px"
                               button-style="round"></InlineXNumber>
            </Cell>
            <!--行李保价-->
            <Cell
                primary="content"
                title=""
                class="check-cell">
                <div slot="child" style="position: relative;width: 100%">
                    <div style="padding-bottom: 10px">行李保价</div>
                    <checker
                        v-model="orderInfo.insurancePrice"
                        default-item-class="demo5-item"
                        selected-item-class="demo5-item-selected"
                    >
                        <checker-item :value="0">
                            <div class="value-big">0元</div>
                            <div class="value-little">保价{{insuranceAmountMap['0']}}元/件</div>
                        </checker-item>
                        <checker-item :value="5">
                            <div class="value-big">5元</div>
                            <div class="value-little">保价{{insuranceAmountMap['1']}}元/件</div>
                        </checker-item>
                        <checker-item :value="10">
                            <div class="value-big">10元</div>
                            <div class="value-little">保价{{insuranceAmountMap['2']}}元/件</div>
                        </checker-item>
                    </checker>
                </div>
            </Cell>
            <x-switch title="是否需要发票" v-model="orderInfo.needInvoice"></x-switch>
        </Group>
        <Group>
            <!--联系方式-->
            <XInput title="联系人：" v-model="orderInfo.customerName" placeholder="请输入姓名"></XInput>
            <!--      <x-input title="验证码" class="weui-cell_vcode">
                    <img slot="right" class="weui-vcode-img" src="http://weui.github.io/weui/images/vcode.jpg">
                  </x-input>-->
            <XInput title="联系电话：" v-model="orderInfo.customerMobile" placeholder="">
                <x-button slot="right" type="primary" mini>验证手机享优惠</x-button>
            </XInput>
            <!--      <CellBox>
                    <x-button mini type="primary">primary</x-button>
                  </CellBox>-->
            <x-textarea :max="200" placeholder="" title="备注：" v-model="orderInfo.remark"></x-textarea>
        </Group>
        <Group>
            <!--行李图片-->
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
            <SelectInnAddress></SelectInnAddress>
        </div>
        <div v-transfer-dom>
            <SelectStationAddress></SelectStationAddress>
        </div>


    </div>
</template>

<script>
    import BooleanToNum from '../util/numBoolean.js'
    import {
        TransferDom, XImg, Divider, Flexbox, FlexboxItem, CellFormPreview,
        Group, Cell, XTextarea, Tabbar, TabbarItem, Popup, InlineXNumber, Checker, CheckerItem,
        XInput, XButton, XSwitch, CellBox
    } from 'vux'
    import SelectInnAddress from './TakeOrderChildCom/SelectInnAddress'
    import SelectStationAddress from './TakeOrderChildCom/SelectStationAddress'
    import SubmitOrderTab from './baseComponents/SubmitOrderTab'
    import UpLoadFile from './baseComponents/UpLoadFile'


    export default {
        name: 'TakeOdder',
        components: {
            XImg, Divider, SelectInnAddress, SelectStationAddress, Flexbox, FlexboxItem,
            CellFormPreview, Group, Cell, XTextarea, Tabbar, TabbarItem, SubmitOrderTab, Popup, InlineXNumber,
            Checker, CheckerItem, XInput, UpLoadFile, XButton, XSwitch, CellBox
        },
        directives: {
            TransferDom
        },
        created(){
        },
        data () {
            return {
                basePath: global.basePath,
                show1: true,
                senderPickerType: "activeInnAddSelector",
                receiverPickerType: "activeStationAddSelector",
                msg: 'Hello World!',
                //保价对应的保额
                insuranceAmountMap: {
                    '0': 300,
                    '5': 500,
                    '10': 1000
                },
                orderInfo: {
                    luggageNumber: 0, //行李数量
                    luggageUnitPrice: 39, //行李单价
                    //flgInsurance: true, //是否保价
                    insurancePrice: 5, //保费
                    //insuranceAmount: 0, 保额
                    preferentialPrice: 0, //优惠价
                    //orderPrice: 0, 订单总价
                    customerName: "", //联系人姓名
                    customerMobile: "", //联系人电话
                    needInvoice: false, //是否需要发票
                    remark: "" //用户备注
                },
            }
        },
        computed: {
            senderPickerTypeIsActiveInnAddSelector(){
                return this.senderPickerType == "activeInnAddSelector"
            },
            receiverPickerTypeTypeIsActiveInnAddSelector(){
                return this.receiverPickerType == "activeInnAddSelector"
            },
            senderInfo(){
                if (this.senderPickerType == "activeInnAddSelector") {
                    return this.$store.state.innInfo;
                } else {
                    return this.$store.state.stationInfo;
                }
            },
            receiverInfo(){
                if (this.receiverPickerType == "activeInnAddSelector") {
                    return this.$store.state.innInfo;
                } else {
                    return this.$store.state.stationInfo;
                }
            }
        },
        filters: {
            numToBoolean(value){
                return value === true ? 1 : 0;
            }
        },
        methods: {
            exchangePickerType(){
                let tmp = this.senderPickerType;
                this.senderPickerType = this.receiverPickerType;
                this.receiverPickerType = tmp;
                this.$store.commit('changeSenderPickerType', this.senderPickerType);
            },
            activeSelector(e){
                let flag = e.currentTarget.dataset.pickerRole;
                if (flag == "sender") {
                    this[this.senderPickerType]();
                } else if (flag == "receiver") {
                    this[this.receiverPickerType]();
                }
            },
            activeInnAddSelector(){
                this.$store.commit('toggleSelectInnAddress', !this.$store.state.SelectInnAddress);
            },
            activeStationAddSelector(){
                this.$store.commit('toggleSelectStationAddress', !this.$store.state.SelectStationAddress);
            }

        },
        watch: {
            /*深度监听data属性orderInfo的变动*/
            orderInfo: {
                handler: function (val) {
                    let rawOrderInfo = this.orderInfo;
                    /*需要计算的属性*/
                    let obj = {
                        sendCost: this.orderInfo.luggageNumber * rawOrderInfo.luggageUnitPrice, //行李寄送费用
                        insuranceCost: this.orderInfo.insurancePrice * rawOrderInfo.luggageNumber, //保险总费用
                        insuranceUnitPrice: this.insuranceAmountMap[rawOrderInfo.insurancePrice],
                        insuranceAmount: this.insuranceAmountMap[rawOrderInfo.insurancePrice] * rawOrderInfo.luggageNumber, //总保额
                        preferentialPrice: rawOrderInfo.preferentialPrice, //优惠费用
                        // flgInsurance : BooleanToNum(rawOrderInfo.insurancePrice !== 0), 是否保价，布尔值转成数字
                    };
                    /*直接从data拷贝过来的属性*/
                    for (let i in rawOrderInfo) {
                        obj[i] = rawOrderInfo[i];
                    }
                    obj.needInvoice = BooleanToNum(rawOrderInfo.needInvoice);
                    /*覆盖data直接拷贝过来的属性*/
                    obj.orderPrice = Number(obj.sendCost) + Number(obj.insuranceCost) - Number(obj.preferentialPrice); //总价
                    this.$store.commit('changeComputedCost', obj); //向vuex总栈提交变动
                },
                deep: true
            }
        }
    }
</script>

<style scoped>
    .ximg-width-base {
        width: 100%;
        height: auto;
    }

    .y-card {
        background-color: white;
        margin: auto 5px;
    }

    .y-card-noback {
        margin: auto 5px;
    }

    .flex-wrap {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .flex-wrap > div {
        flex: 1;
        flex-grow: 1;
    }

    .img-wrap {
        text-align: center;
    }

    /*单选框*/
    .vux-checker-box {
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

    .demo5-item .value-big {
        font-size: 12px;
        font-weight: 600;
    }

    .demo5-item .value-little {
        font-size: 12px;
    }

    .demo5-item-selected {
        background: #ffffff url(../assets/checker/active.png) no-repeat right bottom;
        border-color: #ff4a00;
    }

</style>
<style>
    .check-cell .weui-cell__ft.vux-cell-primary {
        flex-grow: 0;
    }

    .left-align {
        text-align: left;
    }

    .no-title-cell {
        flex-grow: 0;
    }
</style>
