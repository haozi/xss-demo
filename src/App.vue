<style lang="less">
  @import url('./style/main.less');
</style>

<template>
  <div id="app">
    <div v-if="isWeixin" style="display:none"><img src="//p.ssl.qhimg.com/dm/500_500_/t01a98be2ae4a0c95bf.jpg"></div>
    <router-view></router-view>
    <div class="i-footer">
      <a href="https://xss.haozi.me/tools/xss-encode" target="_blank">编码工具</a> |
      <a href="https://github.com/haozime/safe-trim" target="_blank">Safe-Trim</a>
    </div>
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