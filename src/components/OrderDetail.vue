<template>
    <div>
        <group>
            <div class="group-padding">
                <!--订单未支付的内容-->
                <template v-if="luggage.orderStatus == 0">
                    <div class="big-bold-font">订单待支付</div>
                    <div class="little-grey-font margin-bottom">为不影响您的行程，请核对订单并及时支付</div>
                    <flexbox>
                        <flexbox-item>
                            <x-button
                                type="default"
                                action-type="button">取消订单
                            </x-button>
                        </flexbox-item>
                        <flexbox-item>
                            <x-button
                                type="default">
                                去付款
                            </x-button>
                        </flexbox-item>
                    </flexbox>
                </template>
                <!--订单已支付-->
                <template v-if="luggage.orderStatus == 1">
                    <div class="big-bold-font">订单已支付</div>
                    <div class="little-grey-font margin-bottom">您已经付款，订单正在进行中</div>
                </template>
                <!--订单已完成-->
                <template v-if="luggage.orderStatus == 2">
                    <div class="big-bold-font">订单已完成</div>
                    <div class="little-grey-font margin-bottom">订单已经完成，合作愉快！</div>
                </template>
            </div>

        </group>
        <group>
            <cell title="订单编号" :value="luggage.orderNo"></cell>
            <cell title="客户姓名" :value="luggage.customerName"></cell>
            <cell title="手机号码" :value="luggage.customerMobile"></cell>
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
                :value="'￥'+ (luggage.luggageNumber * luggage.luggageNumber)"
                :border-intent="false"
                class="sub-item"
                is-link>
                    {{'￥'+ (luggage.luggageNumber * luggage.luggageNumber)}}
                </cell>
                <cell
                title="保价金额"
                :value="'￥' + (luggage.insurancePrice + luggage.luggageNumber)"
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
            <cell title="寄件时间" :value="luggage.sendTime "></cell>
            <cell title="寄件位置" :value="luggage.sendCity+luggage.sendAddress"></cell>
        </group>
        <group>
            <cell title="取件时间" :value="luggage.takeTime"></cell>
            <cell title="取件位置" :value="luggage.takeCity+luggage.takeAddress"></cell>
        </group>
        <!--发票备注-->
        <group>
            <x-switch title="需要发票"
              disabled
              :value="luggage.needInvoice==1"></x-switch>
            <div>
                <x-textarea
                    title="备注"
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
        <group v-if="luggage.orderStatus == 0">
            <cell title="评分">
                <rater v-model="rate" slot="value" :max="5" active-color="#04BE02"></rater>
            </cell>
            <x-textarea
            placeholder="请输入评论"
            :max="200"
            v-model="commentText"></x-textarea>
        </group>
        <div style="margin: 10px;">
            <x-button type="primary">提交</x-button>
        </div>
    </div>
</template>

<script>
    import {Group, Cell, CellBox, XButton, Flexbox, FlexboxItem, Rater, XTextarea, XSwitch} from 'vux'
    import ShowUploadedPics from './baseComponents/ShowUploadedPics'
    /*订单状态码的说明*/
    let orderStatusDesc = {
        0: '订单未支付',
        1: '订单已支付',
        2: '订单已完成'
    };
    export default {
        name: 'OrderDetail',
        components: {
            Group, Cell, CellBox, Flexbox, FlexboxItem,
            XButton, Rater, XTextarea, ShowUploadedPics, XSwitch
        },
        created () {
            this.updatePicUrl();
        },
        data () {
            return {
                luggage:luggage,
                commentText: "",
                rate: 0,
                showPriceDetail: false,
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
            }
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
