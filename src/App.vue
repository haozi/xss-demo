<style lang="less">
  @import url('./style/main.less');
</style>

<template>
  <div id="app">
    <div v-if="isWeixin" style="display:none"><img src="//p.ssl.qhimg.com/dm/500_500_/t01a98be2ae4a0c95bf.jpg"></div>
    <router-view></router-view>
    <div class="i-footer">
      <a href="//segmentfault.com/ls/1650000018852599?r=bPcjeC" target="_blank">课程讲解</a> |
      <a href="//github.com/haozi/xss-demo" target="_blank">本站源码</a> |
      <a href="//github.com/allgay/safe-trim/tree/master" target="_blank">Safe-Trim</a>
      <p class="tips">本站为配合课程讲解演示使用，旨在增加课程互动，并非针对闯关设计</p>
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
