<template>
  <div id="app">
    <div v-if="isWeixin" style="display:none"><img src="//p.ssl.qhimg.com/dm/500_500_/t01a98be2ae4a0c95bf.jpg"></div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isWeixin: navigator.userAgent.toLowerCase().includes('micromessenger')
      }
    }
  }
</script>