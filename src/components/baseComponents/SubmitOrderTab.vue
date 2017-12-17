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
                    <Cell :title="preferentialPriceName" v-if="computedCost.luggageNumber!=0">
                        <span class="red-font">-￥{{computedCost.preferentialPrice}}</span>
                    </Cell>
                </group>
            </div>
        </popup>
    </div>
</template>

<script>
    /*正式用 URL列表*/
/*    let URLLists = {
        /!*创建订单*!/
        createOrder: global.basePath + '/luggage/wx/createOrder.do'
    };
    /!*URL列表 开发用*!/
    URLLists = {
        /!*创建订单*!/
        createOrder: 'http://172.16.12.39:8080/wxmp/luggage/wx/createOrder.do'
    };*/
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
            //this.testAjax();
        },
        data () {
            return {
                moneyDetail: false,
                msg: 'Hello World!',
                errToastText: '', //显示的错误信息
                showErrToast: '' //是否显示错误提示框
            }
        },
        computed: {
            computedCost(){
                return this.$store.state.computedCost;
            },
            preferentialPriceName(){
                return this.$store.state.preferentialPriceName;
            }
        },
        methods: {
            /***
             *  @desc 最终格式化提交数据
             */
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
            /**
             * @desc 表单验证
             * */
            verifyForm(){
                let msg = "";
                let flag = false; //有未填的必填项时为false
                let submitForm = this.$store.state.submitForm;
                if(submitForm.sendAddress == ""){
                    msg="寄出地址未填写";
                }else if(submitForm.sendTime == ""){
                    msg="寄出时间未填写";
                }else if(submitForm.takeAddress == ""){
                    msg="领回地点未填写";
                }else if(submitForm.takeTime == ""){
                    msg="领回时间未填写";
                }else if(submitForm.luggageNumber == ""){
                    msg="行李件数未填写";
                }else if(submitForm.customerName == ""){
                    msg="客户姓名未填写";
                }else if(submitForm.customerMobile == ""){
                    msg="客户电话未填写";
                }else{
                    flag=true;
                    return flag;
                }
                if(flag==false){
                    this.showErrToast = true;
                    this.errToastText = msg;
                    this.$vux.toast.show({
                        text: msg,
                        type: 'cancel'
                    });
                    return flag;
                }
            },
            /**
             * @desc 提交表单 包括图片以及文字表单
             * */
            createOrder() {
                /*生成vuex里的submitForm*/
                this.submitOrderForm();
                /*表单验证*/
                if (this.verifyForm() === true){
                    /*发送创建订单的请求*/
                    //上传文字信息
                    this.createOrderTextAjax();
                    //上传图片
                    //this.createOrderAjax();
                }
            },
            /**
             * @desc 发送ajax请求创建订单,要发送的数据均来自vuex
             * */
            createOrderAjax() {
                /*推入要上传的图片*/
                let picFormData =  new FormData();
                this.$store.state.picContainer.forEach(function (val, index, arr) {
                    picFormData.append(val.index, val.file);
                });
                /*推入要提交的表单数据*/
                let postData = dataSerialize(this.$store.state.submitForm);
                for (let i in this.$store.state.submitForm) {
                    picFormData.append(i,this.$store.state.submitForm[i]);
                }
                /*推入openId 正式环境需要删除*/
                /*picFormData.append('openId', 'oWwFQw-FqknWMh8BEZwnUfzd5HGY');*/
                /*上传图片以及表单信息*/
                this.$http.post(URLLists.createOrder, picFormData, {emulateJSON: true})
                    .then((res) => {
                        console.log(res);
                        /*到付款页面，或者订单列表页面*/
                        window.location.href = URLLists.OrderList;
                    })
                    .catch((code) => {
                        console.log('获取数据时与后台通讯失败', code);
                    });
            },
            /**
             * @desc 发送ajax请求创建订单,要发送的数据均来自vuex,文字信息部分
             * */
            createOrderTextAjax() {
                /*推入要提交的表单数据*/
                console.log(this.$store.state.submitForm);
                debugger;
                /*上传图片以及表单信息*/
                this.$http.post(URLLists.createOrder, picFormData, {emulateJSON: true})
                    .then((res) => {
                        console.log(res);
                        /*到付款页面，或者订单列表页面*/
                        window.location.href = URLLists.OrderList;
                    })
                    .catch((code) => {
                        console.log('获取数据时与后台通讯失败', code);
                    });
            },
            testAjax() {
                this.$http.get('http://blog.csdn.net')
                    .then((res) => {
                    debugger;
                        console.log(res);

                    })
                    .catch((code) => {
                        console.log('获取数据时与后台通讯失败', code);
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
