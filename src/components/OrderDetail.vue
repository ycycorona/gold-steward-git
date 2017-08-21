<template>
  <div>
    <group>
      <div class="group-padding">
        <div class="big-bold-font">订单待支付</div>
        <div class="little-grey-font margin-bottom">为不影响您的行程，请核对订单并及时支付</div>
        <flexbox >
          <flexbox-item>
            <x-button
              type="default"
              action-type="button">取消订单</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button
              type="default" >
              去付款
            </x-button>
          </flexbox-item>
        </flexbox>
      </div>

    </group>
    <group>
      <cell title="订单编号" value="1234"></cell>
      <cell title="客户姓名" value="ycy"></cell>
      <cell title="手机号码" value="15689951023"></cell>
    </group>
    <group>
      <cell title="行李件数" value="1234"></cell>
      <cell title="寄送总额" value="ycy"></cell>
    </group>
    <group>
      <cell title="寄件时间" value="08月17日 14:00 "></cell>
      <cell title="寄件位置" value="青岛市 市北区 XXXX酒店"></cell>
    </group>
    <group>
      <cell title="取件时间" value="08月18日 14:00 "></cell>
      <cell title="取件位置" value="青岛市 市北区 流亭机场"></cell>
    </group>
    <!--点评-->
    <group>
      <cell title="change color">
        <rater v-model="rate" slot="value" :max="5" active-color="#04BE02"></rater>
      </cell>
      <x-textarea title="点评：" v-model="commentText"></x-textarea>
    </group>
  </div>
</template>

<script>
  import { Group, Cell, XButton, Flexbox, FlexboxItem, Rater, XTextarea } from 'vux'

  export default {
    name: 'OrderDetail',
    components: {
      Group,
      Cell,Flexbox, FlexboxItem, XButton, Rater, XTextarea
    },
    data () {
      return {
        commentText: "",
        rate: 0,
        msg: 'Hello World!'
      }
    }
  }
</script>

<style scoped>
  .big-bold-font{
    font-size: 20px;
    font-weight: 600;
    text-align: center;
  }
  .little-grey-font{
    color: #999999;
    font-size: 14px;
    text-align: center;
  }
  .group-padding{
    padding: 10px 25px;
  }
  .margin-bottom{
    margin-bottom: 10px;
  }
</style>
