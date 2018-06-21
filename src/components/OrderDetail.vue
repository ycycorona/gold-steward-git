<template>
    <div v-if="dataReady">
        <group>
            <div class="group-padding">
                <!--订单未支付-->
                <template v-if="luggage.orderStatus == 0">
                    <div class="big-bold-font">{{orderStatusList[0]}}</div>
                    <div class="little-grey-font margin-bottom">为不影响您的行程，请核对订单并及时支付</div>
                    <flexbox>
                        <flexbox-item>
                            <x-button
                                @click.native="deleteLuggage"
                                type="default"
                                action-type="button">取消订单
                            </x-button>
                        </flexbox-item>
                        <flexbox-item>
                            <x-button
                            v-if="userOpenId = orderOpenId"
                            type="default"
                            @click.native="payThisOrder">
                                去付款
                            </x-button>
                        </flexbox-item>
                    </flexbox>
                </template>
                <!--订单已支付-->
                <template v-if="luggage.orderStatus == 1 && isAdmin != 1">
                    <div class="big-bold-font">{{orderStatusList[1]}}</div>
                    <div class="little-grey-font margin-bottom">您已经付款，等待行李员取件</div>
                </template>
                <template v-if="luggage.orderStatus == 1 && isAdmin == 1">
                    <div class="big-bold-font">{{orderStatusList[1]}}</div>
                    <x-button
                        @click.native="sendLuggageFrom"
                        type="default"
                        action-type="button">行李员取件
                    </x-button>
                </template>
                <!--行李员已取件-->
                <template v-if="luggage.orderStatus == 2 && isAdmin != 1">
                    <div class="big-bold-font">{{orderStatusList[2]}}</div>
                    <div class="little-grey-font margin-bottom">行李员已经取件</div>
                </template>
                <template v-if="luggage.orderStatus == 2 && isAdmin == 1">
                    <div class="big-bold-font">{{orderStatusList[2]}}</div>
                    <x-button
                        @click.native="sendLuggageTo"
                        type="default"
                        action-type="button">行李送达
                    </x-button>
                </template>
                <!--行李已送达-->
                <template v-if="luggage.orderStatus == 3 && isAdmin != 1">
                    <div class="big-bold-font">{{orderStatusList[3]}}</div>
                    <div class="little-grey-font margin-bottom">行李已经送达</div>
                </template>
                <template v-if="luggage.orderStatus == 3 && isAdmin == 1">
                    <div class="big-bold-font">{{orderStatusList[3]}}</div>
                    <x-button
                        @click.native="completeLuggage"
                        type="default"
                        action-type="button">客户取件
                    </x-button>
                </template>
                <!--客户已经取件，订单完成-->
                <template v-if="luggage.orderStatus == 4">
                    <div class="big-bold-font">{{orderStatusList[4]}}</div>
                    <div class="little-grey-font margin-bottom">客户已经取走行李，订单完成</div>
                </template>
            </div>

        </group>
        <group>
            <cell title="订单编号" :value="luggage.orderNo"></cell>
            <cell title="客户姓名" :value="luggage.customerName"></cell>
            <cell title="手机号码" :value="luggage.customerMobile" :link="'tel:' + luggage.customerMobile"></cell>
        </group>
        <group>
            <cell title="行李件数" :value="luggage.luggageNumber + '件'"></cell>
            <cell
            title="寄送总额"
            is-link
            :border-intent="false"
            :arrow-direction="showPriceDetail ? 'up' : 'down'"
            @click.native="showPriceDetail = !showPriceDetail"
            :value="luggage.orderPrice"></cell>
            <template v-if="showPriceDetail">
                <cell
                title="行李寄送费用"
                :value="'￥'+ (luggage.luggageNumber * luggage.luggageUnitPrice)"
                :border-intent="false"
                class="sub-item"
                is-link>
                </cell>
                <cell
                title="保价金额"
                :value="'￥' + luggage.insurancePrice"
                class="sub-item"
                is-link></cell>
                <cell
                title="优惠"
                :value="'￥' + luggage.preferentialPrice"
                class="sub-item"
                is-link></cell>
            </template>
        </group>
        <group>
            <cell title="寄件时间" :value="dateFormat(new Date(luggage.sendTime),'YYYY-MM-DD HH:mm')"></cell>
            <cell title="寄件位置" :value="luggage.sendCity+luggage.sendAddress"></cell>
        </group>
        <group>
            <cell title="取件时间" :value="dateFormat(new Date(luggage.takeTime),'YYYY-MM-DD HH:mm')"></cell>
            <cell title="取件位置" :value="luggage.takeCity+luggage.takeAddress"></cell>
        </group>
        <!--发票备注-->
        <group>
            <div>
                <x-textarea
                    title="备注："
                    :max="200"
                    readonly
                    :show-counter="false"
                    :value="luggage.remark"></x-textarea>
            </div>
        </group>
        <!--图片预览-->
        <group v-if="this.$store.state.imgsUrl.length != 0">
            <ShowUploadedPics></ShowUploadedPics>
        </group>
        <!--点评-->
<!--        <group v-if="luggage.orderStatus == 4">
            <cell title="评分">
                <rater v-model="rate" slot="value" :max="5" active-color="#04BE02"></rater>
            </cell>
            <x-textarea
            placeholder="请输入评论"
            :max="200"
            v-model="commentText"></x-textarea>
            <div style="margin: 10px;">
                <x-button type="primary">提交</x-button>
            </div>
        </group>-->

    </div>
</template>

<script>
    import {orderStatusList} from '../data/commonDic.js'
    import {Group, Cell, CellBox, XButton, Flexbox, FlexboxItem, Rater, XTextarea, XSwitch,
        dateFormat} from 'vux'
    import ShowUploadedPics from './baseComponents/ShowUploadedPics'
    import getSearchParams from '../util/getSearchParams'
    export default {
        name: 'OrderDetail',
        components: {
            Group, Cell, CellBox, Flexbox, FlexboxItem,
            XButton, Rater, XTextarea, ShowUploadedPics, XSwitch
        },
        created () {
            this.getDetailData();
            this.getUserInfo(); //设置data.isAdmin;
        },
        data () {
            return {
                dataReady: false,
                id: getSearchParams(window.location.search).id,
                isAdmin: 0,
                orderStatusList: orderStatusList,
                luggage: [],
                commentText: "",
                rate: 0,
                showPriceDetail: false,
                queryTime:0,
                userOpenId: '',
                orderOpenId: ''
            }
        },
        computed: {

        },
        methods: {
            /**
             * @desc 设置vuex中的展示图片url
             * @return newURLList 图片的URL列表
             */
            updatePicUrl () {
                let newURLList = [];
                this.luggage.imgsUrl.forEach(function (URL, index, URLList) {
                    newURLList.push({
                        url: basePath + URL
                    });
                });
                this.$store.commit('updateImgsUrl',newURLList);
            },
            getDetailData() {
                this.$vux.loading.show({
                    text: '正在载入订单列表'
                });
                this.getDetailDataAjax();
            },
            //获取订单详情信息
            getDetailDataAjax(){
                let url = URLLists.getOrderDetailDate + '?id=' + this.id;
                this.$http.get(url)
                    .then((res) => {
                        this.luggage = res.data.data;
                        this.orderOpenId = res.data.data.openId;
                        this.updatePicUrl();
                        this.$vux.loading.hide();
                        this.dataReady = true;
                    })
                    .catch((code) => {
                        console.log('获取数据时与后台通讯失败', code);
                        this.$vux.loading.hide();
                    });
            },
            /**
             * @desc 行李员取件操作
             */
            sendLuggageFrom() {
                const _this = this;
                this.$vux.confirm.show({
                    title: '请确认',
                    content: `是否确认取件`,
                    onCancel () {
                        console.log('用户操作取消');
                    },
                    onConfirm () {
                        _this.$vux.loading.show({
                            text: '正在与后台通信'
                        });
                        let url = URLLists.sendLuggageFrom + '?id=' + _this.id;
                        _this.$http.get(url)
                            .then((res) => {
                                console.log(res);
                                _this.luggage = res.data.data;
                                _this.$vux.loading.hide();
                            })
                            .catch((code) => {
                                console.log('获取数据时与后台通讯失败', code);
                                _this.$vux.loading.hide();
                            });
                    }
                })
            },
            /**
             * @desc 行李已送达
             */
            sendLuggageTo() {
                const _this = this;
                this.$vux.confirm.show({
                    title: '请确认',
                    content: `是否确认送达`,
                    onCancel () {
                        console.log('用户操作取消');
                    },
                    onConfirm () {
                        _this.$vux.loading.show({
                            text: '正在与后台通信'
                        });
                        let url = URLLists.sendLuggageTo + '?id=' + _this.id;
                        _this.$http.get(url)
                            .then((res) => {
                                console.log(res);
                                _this.luggage = res.data.data;
                                _this.$vux.loading.hide();
                            })
                            .catch((code) => {
                                console.log('获取数据时与后台通讯失败', code);
                                _this.$vux.loading.hide();
                            });
                    }
                })


            },
            /**
             * @desc 客户已取行李
             */
            completeLuggage() {
                const _this = this;
                this.$vux.confirm.show({
                    title: '请确认',
                    content: `是否确认客户已取行李`,
                    onCancel () {
                        console.log('用户操作取消');
                    },
                    onConfirm () {
                        _this.$vux.loading.show({
                            text: '正在与后台通信'
                        });
                        let url = URLLists.completeLuggage + '?id=' + _this.id;
                        _this.$http.get(url)
                            .then((res) => {
                                console.log(res);
                                _this.luggage = res.data.data;
                                _this.$vux.loading.hide();
                            })
                            .catch((code) => {
                                console.log('获取数据时与后台通讯失败', code);
                                _this.$vux.loading.hide();
                            });
                    }
                })


            },
            /**
             * @desc 删除订单
             */
            deleteLuggage() {

                const _this = this;
                this.$vux.confirm.show({
                    title: '请确认',
                    content: `是否确认删除订单`,
                    onCancel () {
                        console.log('用户操作取消');
                    },
                    onConfirm () {
                        _this.$vux.loading.show({
                            text: '正在与后台通信'
                        });
                        let url = URLLists.deleteLuggage + '?id=' + _this.id;
                        _this.$http.get(url)
                            .then((res) => {
                                console.log(res);
                                //this.luggage = res.data.data;
                                _this.$vux.loading.hide();
                                if (res.data.successFlag == true) {
                                    _this.deleteThenReturnList();
                                } else {
                                    _this.deleteFailMsg();
                                }
                            })
                            .catch((code) => {
                                console.log('获取数据时与后台通讯失败', code);
                                _this.$vux.loading.hide();
                            });
                    }
                })


            },
            /**
             * @desc 获取用户基本信息
             */
            getUserInfo() {
                this.$vux.loading.show({
                    text: '正在与后台通信'
                });
                let url = URLLists.getUserInfo;
                this.$http.get(url)
                    .then((res) => {
                        console.log(res);
                        this.isAdmin = res.data.data.isAdmin;
                        this.userOpenId = res.data.data.openId;
                        this.$vux.loading.hide();
                    })
                    .catch((code) => {
                        console.log('获取数据时与后台通讯失败', code);
                        this.$vux.loading.hide();
                    });
            },
            /**
             * @desc 删除订单成功后返回订单列表
             */
            deleteThenReturnList() {
                this.$vux.toast.show({
                    type: 'success',
                    text: '删除订单成功',
                    position: 'middle',
                    onHide: function () {
                        window.location.href = URLLists.toOrderList;
                    }
                });
            },
            /**
             * @desc 删除订单失败的提示信息
             */
            deleteFailMsg() {
                this.$vux.toast.show({
                    type: 'warn',
                    text: '删除订单失败',
                    position: 'middle',
                });
            },
            dateFormat: dateFormat,
            //付款
            payThisOrder () {
                //微信支付实例
                this.$towxPay(this, this.luggage.id)
                    .then((x) => {
                        //alert(JSON.stringify(x));
                        //todo: 蒙层出现
                        this.loadingShow();
                        //todo: 轮询支付结果
                        this.queryPayedStatus();
                    })
                    .catch((error) => {
                        alert('支付发生了错误:' + JSON.stringify(error));
                    })
            },
            //支付成功后轮训后台，确认支付结果
            queryPayedStatus () {
                let url = URLLists.getOrderDetailDate + '?id=' + this.id;
                this.$http.get(url)
                    .then((res) => {
                        if(res.data.data.orderStatus == 1) {
                            this.loadHide();
                            //debugger;
                            this.$vux.toast.show({
                                text: '支付成功',
                                type:'success',
                                width: '9rem',
                                onHide: () => {
                                    window.location.reload();
                                }
                            });
                        } else {
                            this.queryTime ++;
                            if (this.queryTime > 60) {
                                reject('轮询次数过多');
                            }
                            setTimeout(this.queryPayedStatus, 1000);
                        }
                    })
                    .catch((error) => {
                        alert(JSON.stringify(error));
                        this.$vux.toast.show({
                            text: '轮询后台支付结果时通讯失败，重新登录查询' + JSON.stringify(error),
                            type:'warn',
                            width: '9rem',
                            onHide: () => {
                                window.location.reload();
                            }
                        });
                    });
            },
            //蒙层显示
            loadingShow () {
                this.$vux.loading.show({
                    text: '正在确认订单支付结果'
                });
                document.getElementsByTagName('html')[0].style['overflow-x'] = 'hidden';
            },
            //蒙层隐藏
            loadHide () {
                this.$vux.loading.hide();
                document.getElementsByTagName('html')[0].style['overflow-x'] = 'auto'
            },
        }
    }
</script>

<style scoped>
    .big-bold-font {
        font-size: 20px;
        font-weight: 600;
        text-align: center;
    }

    .little-grey-font {
        color: #999999;
        font-size: 14px;
        text-align: center;
    }

    .group-padding {
        padding: 10px 25px;
    }

    .margin-bottom {
        margin-bottom: 10px;
    }
</style>
