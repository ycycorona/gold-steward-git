<template>
    <div>
        <div style="margin-top: 10px"></div>
        <card v-for="(item, index) in orderList" :key="index" @click.native="toOrderDetail">
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
    import {Group, Cell, Card} from 'vux'
    export default {
        name: 'OrderList',
        components: {
            Group,
            Cell, Card
        },
        data () {
            return {
                orderList: global.orderList, //订单列表
                orderStatusList: orderStatusList //订单状态
            }
        },
        methods: {
            /**
             * @desc 根据订单号，跳转到订单详情页面
             * @param OrderListindex
             */
            toOrderDetail () {
                /*获取订单号*/
                console.log("asd");
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
