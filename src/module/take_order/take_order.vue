<template>
    <div id="app">
        <!--顶部页面切换器-->
        <TabHeader currentPath="take-order"></TabHeader>
        <!--页面载入-->
        <TakeOrder
            class="router-view main-page "
            :style="{height: height}"
            :class="{'offset-header':true}"
        ></TakeOrder>
        <!--页面固定底栏-->
        <SubmitOrderTab
            class="router-view"
        ></SubmitOrderTab>
    </div>
</template>

<script>
    import {TransferDom} from 'vux'
    import TabHeader from '../../components/baseComponents/TabHeader'
    import TakeOrder from '../../components/TakeOrder'
    import SubmitOrderTab from '../../components/baseComponents/SubmitOrderTab'
    export default {
        name: 'App',
        components: {
            TakeOrder, SubmitOrderTab, TabHeader
        },
        directives: {
            TransferDom
        },
        created () {


        },
        data () {
            return {
                /*height: window.innerHeight - 40 - 50,*/
                height: window.innerHeight - 40 - 50 + 'px',
                msg: 'Hello World!',
                direction: 'forward',
            }
        },
        computed: {},
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
<style scoped>
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
</style>
