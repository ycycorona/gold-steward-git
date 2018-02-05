<template>
    <div>
        <div style="margin-top: 10px"></div>
        <!--时间选择-->
        <group title="订单时间选择">
            <datetime
            v-model="startTime"
            title="开始"></datetime>

            <datetime
            v-model="endTime"
            title="结束"></datetime>
        </group>
        <x-button
            @click.native="getOrderListMain"
            type="primary"
            style="margin-top: 10px;width: 80%">筛选订单</x-button>
        <card v-for="(item, index) in orderList" :key="index" @click.native="toOrderDetail(item.id,$event)">
            <div slot="header" class="item-header flex-wrap">
                <div>订单号：{{item.orderNo}}</div>
                <div class="text-right bold-text">{{orderStatusList[item.orderStatus]}}</div>
            </div>
            <div slot="content" class="card-padding">
                <div>寄出地：{{item.sendCity + item.sendAddress}}</div>
                <div>取回地：{{item.takeCity + item.takeAddress}}</div>
                <div>总价/件数：{{item.orderPrice + '/' + item.luggageNumber}}</div>
            </div>
            <div slot="footer">
            </div>
        </card>
    </div>
</template>

<script>
    import {orderStatusList} from '../data/commonDic.js'
    import {Group, Cell, Card, dateFormat, Datetime, XButton } from 'vux'
    /*获得当前日期*/
    let nowDate = dateFormat(new Date(), 'YYYY-MM-DD');
    let lastDate = dateFormat(new Date().valueOf() - 1000*60*60*24, 'YYYY-MM-DD');
    export default {
        name: 'OrderList',
        components: {
            Group,
            Cell, Card, Datetime, XButton
        },
        created() {
            this.getOrderListMain();
        },
        data () {
            return {
                orderList: [], //订单列表
                orderStatusList: orderStatusList, //订单状态
                startTime: lastDate,
                endTime: nowDate
            }
        },
        methods: {
            /**
             * @desc 根据id，跳转到订单详情页面
             * @param id
             */
            toOrderDetail (id) {
                console.log(id);
                window.location.href = URLLists.toOrderDetail + '?id=' + id;
            },
            getOrderListMain() {
                this.$vux.loading.show({
                    text: '正在载入订单列表'
                });
                this.getOrderListAjax();
            },
            getOrderListAjax() {
                let url = URLLists.getOrderListDate + '?startDate=' + this.startTime
                + '&endDate=' + this.endTime;
                this.$http.get(url)
                    .then((res) => {
                        this.orderList = res.data.data;
                        this.$vux.loading.hide();
                    })
                    .catch((code) => {
                        console.log('获取数据时与后台通讯失败', code);
                        this.$vux.loading.hide();
                    });
            }
        }

    }
</script>

<style scoped>
    .card-padding {
        padding: 15px;
    }

    .item-header {
        background-color: #f10215;
        color: white;
        font-size: 12px;
        padding: auto 5px;
    }

    .item-header > div {
        padding: 5px;
    }

    .text-right {
        text-align: right;
    }

    .flex-wrap {
        display: flex;
        justify-content: space-around;
    }

    .flex-wrap > div {
        flex-grow: 1;
    }

    .bold-text {
        font-weight: 600;
        font-size: 14px;
    }
</style>
