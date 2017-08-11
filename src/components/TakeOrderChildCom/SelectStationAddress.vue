<template>
  <div>
    <popup v-model="SelectStationAddressShow" height="100%">
      <div class="popup-full-page">
        <group>
          <x-switch title="Another XSwitcher" v-model="SelectStationAddressShow"></x-switch>
        </group>
      </div>
    </popup>
  </div>
</template>

<script>
  import { Popup, XSwitch, Group} from 'vux'
  export default {
    name: 'SelectStationAddress',
    components: {
      Popup, XSwitch, Group
    },
    data () {
      return {
        msg: 'Hello World!'
      }
    },
    computed:{
      SelectStationAddressShow: {
        get(){
          return this.$store.state.SelectStationAddress;
        },
        set(value){
          this.$store.commit('toggleSelectStationAddress',value);
        }
      }
    }
  }
</script>

<style>

</style>
