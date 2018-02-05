<template>
    <div id="app">
        <h3>1、配送区域、线路及价格</h3>
        <template
        v-for="(district, index) in district_route">
            <group
                class="district-group"
                :title="'区域：' + district.districtName"
                gutter="0">
                <cell
                    class="cell-th"
                    title="线路"
                    value="结算价格"> </cell>
                <cell
                    v-for="(route, index) in district.routes"
                    :key="index"
                    :title="route.routeName"
                    :value="route.routePrice"> </cell>
            </group>
        </template>
        <div class="vux-divider"></div>
        <h3>2、配送时间</h3>
        <p class="alone">12:00前下单 16:00后提取</p>
        <div class="vux-divider"></div>
        <h3>3、寄件交接方式</h3>
        <p class="alone">前台/礼宾部转交</p>
        <div class="vux-divider"></div>
        <h3>3、取件交接方式</h3>
        <p class="alone">机场订单当面交接（T1航站楼或T2航站楼）</p>
        <div class="vux-divider"></div>
        <h3>4、配送行李规格</h3>
        <p class="alone">常规航空托运行李箱及背包</p>
    </div>
</template>

<script>
    import {Group, Cell, Divider } from 'vux'
    export default {
        name: 'App',
        components: {Group, Cell, Divider },
        directives: {},
        created() {

        },
        data() {
            return {
                district_route: [
                    {
                        districtName: '市南/市北/李沧/城阳及崂山（部分）',
                        routes:[
                            {
                                routeName: '酒店至流亭机场',
                                routePrice: '39'
                            },
                            {
                                routeName: '流亭机场至酒店',
                                routePrice: '39'
                            },
                            {
                                routeName: '酒店 至 青岛站',
                                routePrice: '35'
                            },
                            {
                                routeName: '青岛站 至 酒店',
                                routePrice: '35'
                            },
                            {
                                routeName: '酒店至青岛火车北站',
                                routePrice: '35'
                            },
                            {
                                routeName: '青岛火车北站至酒店',
                                routePrice: '35'
                            },
                            {
                                routeName: '市区酒店 至 酒店',
                                routePrice: '35'
                            }
                        ]
                    },
                    {
                        districtName: '青岛市黄岛区',
                        routes:[
                            {
                                routeName: '酒店至流亭机场',
                                routePrice: '199（含2件）'
                            },
                            {
                                routeName: '流亭机场至酒店',
                                routePrice: '199（含2件）'
                            },
                            {
                                routeName: '酒店 至 青岛站',
                                routePrice: '159（含2件）'
                            },
                            {
                                routeName: '青岛站 至 酒店',
                                routePrice: '159（含2件）'
                            },
                            {
                                routeName: '酒店至青岛火车北站',
                                routePrice: '179（含2件）'
                            },
                            {
                                routeName: '青岛火车北站至酒店',
                                routePrice: '179（含2件）'
                            },
                            {
                                routeName: '市区酒店 至 酒店',
                                routePrice: 35
                            }
                        ]
                    },
                    {
                        districtName: '青岛市黄岛区',
                        routes:[
                            {
                                routeName: '景区酒店至流亭机场',
                                routePrice: '199（含2件）'
                            },
                            {
                                routeName: '景区酒店至市内酒店',
                                routePrice: '199（含2件）'
                            },
                            {
                                routeName: '景区酒店至青岛站',
                                routePrice: '199（含2件）'
                            }
                        ]
                    },

                ]

            }
        },
        computed: {





        },
        watch: {}
    }
</script>

<style lang="less">
    @import '~vux/src/styles/reset.less';
    @import '../../style/base.less';

    body {
        background-color: #fbf9fe;
    }


</style>
<style lang="less">
    .flex-wrap {
        display: flex;
        justify-content: space-around;
    }

    .flex-wrap > div {
        flex-grow: 1;
    }

    .tab-header > h1.vux-header-title {
        width: 100%;
        margin: 0;
    }

    /*切换路由动画*/
    .router-view.main-page {
        overflow: auto;
        -webkit-overflow-scrolling: touch;

        /*box-sizing: border-box;*/
    }

    .offset-header {
        padding-top: 40px;
    }

    .cell-th {
        font-weight: 600;

    }
    .cell-th .weui-cell__ft {
        color: #000;
    }

    .district-group {
        margin-bottom: 1rem;
    }

    .district-group .weui-cells__title {
        font-size:  16px;
        font-weight: 600;
        color: #000;
    }
    h3,
    p.alone{
        padding: 0 15px;
    }

</style>
