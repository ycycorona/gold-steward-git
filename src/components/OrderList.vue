<template>
  <div>
    <div style="margin-top: 10px"></div>
    <card>
      <div slot="header" class="item-header flex-wrap">
        <div>订单号：11121212654564</div>
        <div class="text-right bold-text">待支付</div>
      </div>
      <p slot="content" class="card-padding">custom content</p>
      <div slot="footer">
      </div>
    </card>
  </div>
</template>

<script>

  import { Group, Cell, Card} from 'vux'
  export default {
    name: 'OrderList',
    components: {
      Group,
      Cell,Card
    },
    data () {
      return {

        msg: 'Hello World!'
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
  .item-header>div{
    padding: 5px;
  }
  .text-right{
    text-align: right;
  }
  .flex-wrap {
    display: flex;
    justify-content: space-around;
  }
  .flex-wrap>div {
    flex-grow: 1;
  }
  .bold-text{
    font-weight: 600;
    font-size: 14px;
  }
</style>
