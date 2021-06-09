<template>
  <button v-if="! account" @click="login" class="ml-6">Login</button>
  <button v-else @click="logout" class="ml-6" :title="account.address">Logout</button>
</template>
<script>
import {ethereum} from 'aleph-js';

export default {
  name: 'Login',
  data(){
    return {
      account: null
    }
  },
  methods:{
    async login(){
      if (window.ethereum) {
        try{
          await window.ethereum.enable()
          let account = await ethereum.from_provider(window['ethereum'] || window.web3.currentProvider)
          this.account = account;
        }catch (error){
          alert("Something went wrong!");
          return;
        }
      }
      else{
        alert("Not supported!");
        return;
      }

      if(! this.account)
      {
        alert("Error getting web3 account")
        return
      }
    },
    logout(){
      this.account = null;
    }
  }
}
</script>
