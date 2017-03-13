<style lang="less">
  // 这是网站的框架结构入口，不要在这里写过多业务有关视图代码
  // 业务逻辑应该写在具体的 component 里
  @import url('./style/main.less');
</style>

<template>
  <div id="app" class="i-main">
    <div class="i-fe">
      <div class="i-browser">
        <div class="hd">
          <div class="url">
            <span>https://xss.test/</span><input type="text">
          </div>
        </div>
        <div class="bd">
          <iframe ref="sandbox"></iframe>
        </div>
      </div>

      <div class="i-code">
        <h3>input code</h3>
        <code-mirror :code="initFeCode" :autofocus="true" @change="updateFeCode" :height="170"></code-mirror>

        <h3>html</h3>
        <code-mirror :code="raw" :read-only="true" :line-numbers="false" :height="100" mode="application/x-ejs"></code-mirror>
      </div>
    </div>

    <div class="i-be">
      <div class="i-code">
        <h3>server code</h3>
        <code-mirror :code="initBeCode" @change="updateBeCode"></code-mirror>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
  import codeMirror from './components/codemirror'
  import sandboxText from './data/sandbox.raw'
  import exam from './data/exam/index.js'

  const escapeJS = (jsStr) => {
    return String(jsStr).trim()
            .replace(/'/g, '\\\'')
            .replace(/"/g, '\\"')
            .replace(/`/g, '\\`')
            .replace(/\//g, '\\/')
  }
  const compile = (tpl, data = {}) => {
    return tpl.replace(/{{{(.*?)}}}/g, ($0, $1) => data[$1] || '')
  }

  export default {
    name: 'Home',
    data () {
      return {
        initBeCode: '',
        initFeCode: '',
        beCode: '',
        feCode: '',
        raw: ''
      }
    },

    mounted () {
      let data
      data = exam[this.$route.params.id]
      if (!data) {
        this.$router.push('/404')
        return
      }
      this.initBeCode = data.beCode
    },

    components: {
      codeMirror
    },

    methods: {
      inject (feCode = '', beCode = '') {
        const blob = new Blob([
          compile(sandboxText, {
            BODY: this.serverRender(feCode, beCode)
          })
        ], { type: 'text/html' })
        const blobUrl = URL.createObjectURL(blob)
        const sandbox = this.$refs.sandbox.contentWindow
        sandbox.location.replace(blobUrl)
      },

      serverRender (feCode, beCode) {
        let tpl = '<!-- SERVER_ERROR -->'
        try {
          tpl = new Function(`return (${beCode.trim()})(\`${escapeJS(feCode)}\`)`)()
        } catch (e) {}
        this.raw = tpl
        console.info(tpl)
        return tpl
      },

      updateBeCode (newVal) {
        this.beCode = newVal
      },

      updateFeCode (newVal) {
        this.feCode = newVal
      }
    },

    watch: {
      beCode(beCode) {
        this.inject(this.feCode, this.beCode)
      },

      feCode() {
        this.inject(this.feCode, this.beCode)
      }
    }
  }
</script>
