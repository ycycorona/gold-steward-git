<template>
  <div>
    <group>
      <div class="group-padding">
        <div class="big-bold-font">订单待支付</div>
        <div class="little-grey-font margin-bottom">为不影响您的行程，青核对订单并及时支付</div>
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
      <cell title="title" value="value"></cell>
    </group>
  </div>
</template>

<script>
  import { Group, Cell, XButton, Flexbox, FlexboxItem } from 'vux'

  export default {
    name: 'OrderDetail',
    components: {
      Group,
      Cell,Flexbox, FlexboxItem, XButton
    },
    data () {
      return {

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
