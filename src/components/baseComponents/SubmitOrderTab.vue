<template>
    <div>
        <div class="tab-wrap flex-wrap weui-tabbar" style="z-index: 2">
            <div style="flex: 2;padding-right: 2px" class="flex-wrap" @click="moneyDetail=!moneyDetail">
                <div style="flex: 2">总计 <span class="font-money">￥{{computedCost.orderPrice}}</span></div>
                <div style="flex: 1;text-align: right;font-size: 14px">
                    <span>明细</span>
                    <x-icon v-if="moneyDetail" type="ios-arrow-up" size="17" style="vertical-align:sub;fill: white;"></x-icon>
                    <x-icon v-if="!moneyDetail" type="ios-arrow-down" size="17" style="vertical-align:sub;fill: white;"></x-icon>
                </div>
            </div>
            <div class="flex-submit" @click="createOrder">提交</div>
        </div>
        <popup
            :popup-style="{bottom: '50px',zIndex: 1}"
            :show-mask="false"
            v-model="moneyDetail">
            <div class="money-detail-wrap">
                <group :gutter="0">
                    <Cell title="行李寄送费用">
                        <span>￥{{computedCost.luggageUnitPrice}} x {{computedCost.luggageNumber}}</span>
                    </Cell>
                    <Cell title="保价金额" v-if="computedCost.luggageNumber!=0">
                        <span>￥{{computedCost.insurancePrice}} x {{computedCost.luggageNumber}}</span>
                    </Cell>
                    <Cell title="优惠名称" v-if="computedCost.luggageNumber!=0">
                        <span class="red-font">-￥{{computedCost.preferentialPrice}}</span>
                    </Cell>
                </group>
            </div>
        </popup>
    </div>
</template>

<script>

    /*正式用 URL列表*/
    let URLLists = {
        /*创建订单*/
        createOrder: global.basePath + '/luggage/wx/createOrder.do'
    };
    /*URL列表 开发用*/
    URLLists = {
        /*创建订单*/
        createOrder: 'http://localhost:8080/wxmp/luggage/wx/createOrder.do'
    };
    import {Group, Cell, Popup, TransferDom, XDialog} from 'vux'
    import dataSerialize from "../../util/ajaxDataSerialize.js"
    export default {
        name: 'SubmitOrderTab',
        components: {
            Group,
            Cell,
            Popup, TransferDom, XDialog
        },
        created(){
            /*this.submitOrderForm();*/
        },
        data () {
            return {
                moneyDetail: false,
                msg: 'Hello World!'
            }
        },
        computed: {
            computedCost(){
                return this.$store.state.computedCost;
            }
        },
        methods: {
            /*最终格式化提交数据*/
            submitOrderForm(){
                /* console.log(JSON.stringify(this.$store.state));*/
                let sendInfo;
                let receiveInfo;
                let computedCost = this.$store.state.computedCost;
                if (this.$store.state.senderPickerType == 'activeInnAddSelector') {
                    sendInfo = this.$store.state.innInfo;
                    receiveInfo = this.$store.state.stationInfo;
                } else {
                    sendInfo = this.$store.state.stationInfo;
                    receiveInfo = this.$store.state.innInfo;
                }
                let submitForm = {
                    sendCity: sendInfo.address0,
                    sendAddress: sendInfo.address1 + sendInfo.address2,
                    sendTime: sendInfo.time,
                    takeCity: receiveInfo.address0,
                    takeAddress: receiveInfo.address1 + receiveInfo.address2,
                    takeTime: receiveInfo.time,
                    luggageNumber: computedCost.luggageNumber,
                    luggageUnitPrice: computedCost.luggageUnitPrice,
                    insurancePrice: computedCost.insuranceCost,
                    insuranceAmount: computedCost.insuranceAmount,
                    preferentialPrice: computedCost.preferentialPrice,
                    orderPrice: computedCost.orderPrice,
                    remark: computedCost.remark,
                    needInvoice: computedCost.needInvoice,
                    customerName: computedCost.customerName,
                    customerMobile: computedCost.customerMobile,
                };
                this.$store.commit('changeSubmitForm', submitForm);
            },
            /*提交表单*/
            createOrder() {
                this.submitOrderForm();
                let postData = dataSerialize(this.$store.state.submitForm);
                this.$http.post(URLLists.createOrder,postData,{emulateJSON: true})
                .then((res)=>{
                   console.log(res);
                })
                .catch((code) => {
                    console.log('获取数据时与后台通讯失败',code);
                });
            }

        }
    }
</script>

<style scoped>
    .tab-wrap {
        height: 50px;
        background-color: #35495e;
        color: white;
        /*padding-right: 15px;*/
        padding-left: 15px;
        box-sizing: border-box;
    }

    .flex-wrap {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .flex-wrap > div {
        flex: 1;
        flex-grow: 1;
        line-height: 50px;

    }

    .flex-submit {
        flex: 1;
        text-align: center;
        font-size: 20px;
        font-weight: 600;
        background-color: darkorange;
        height: 100%;

    }

    .font-money {
        color: darkorange;
        font-size: 18px;
    }

    .money-detail-wrap .red-font {
        color: red;
    }

    .money-detail-wrap span {
        color: black;
    }
</style>
