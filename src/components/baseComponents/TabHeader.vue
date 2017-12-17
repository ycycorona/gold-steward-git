<template>
    <div class="my-tab-header" style="position: absolute">
        <!--父组件通过v-model绑定的data属性可以通过this.$emit('input', val)来变更-->
        <button-tab v-model="currPage" :height="35">
            <button-tab-item @click.native="goTakeOrder">下单</button-tab-item>
            <button-tab-item @click.native="goOrderList">订单列表</button-tab-item>
        </button-tab>
    </div>
</template>

<script>
    import {ButtonTab, ButtonTabItem} from 'vux'
    export default {
        name: '',
        props: {
            currentPath: String,
        },
        components: {
            ButtonTab, ButtonTabItem
        },
        created(){
            /*页面初始化时，根据不同路由切换顶部的TAB*/
            let currentPath = this.currentPath;
            if (currentPath === "take-order") {
                this.$store.commit('changeCurrPage', 0)
                console.log("进入" + currentPath);
            } else if (currentPath === "order-list") {
                this.$store.commit('changeCurrPage', 1)
                console.log("进入" + currentPath);
            }
        },
        data () {
            return {
                msg: 'Hello World!'
            }
        },
        computed: {
            currPage: {
                get(){
                    return this.$store.state.currPage;
                },
                set(val){
                    this.$store.commit('changeCurrPage', val);
                    /*监听currPage变动，载入新页面*/
/*                    if (val === 0) {
                        window.location.href = URLLists.OrderList;
                    } else if (val === 1) {
                        window.location.href = URLLists.OrderList;
                    }*/
                }
            }
        },
        watch: {
        },
        methods: {
            goTakeOrder() {
                window.location.href = URLLists.toCreateOrderPage;
            },
            goOrderList() {
                window.location.href = URLLists.OrderList;
            }

        }
    }
</script>

<style scoped>
    .vux-button-group {
        background-color: #f10215;
    }

    .vux-button-group > a {
        border-radius: 0 !important;
        background-color: transparent !important;
        color: #FFF !important;
    }

    .vux-button-group > a:after {
        border-radius: 0 !important;
        border: 1px solid #f10215 !important;
        color: #f10215 !important;
    }

    .vux-button-group > a.vux-button-group-current {
        background: #f10215 !important;
        border-bottom: white 5px solid;
    }

    .my-tab-header {
        position: fixed;
        width: 100%;
        z-index: 500;
        top: 0;
    }
</style>
