<style lang="less">
  @import url('./style/main.less');
</style>

<template>
  <div class="i-main">
    <div class="i-fe">
      <div class="i-browser">
        <div class="hd">
          <div class="url">
            <input type="text" :value="`http://xss.test/?input=${encodeURI(feCode)}`">
          </div>
        </div>
        <div class="bd">
          <iframe ref="sandbox" name="sandbox"></iframe>
        </div>
      </div>

      <div class="i-code">
        <h3>input code</h3>
        <code-mirror class="cm-input" :code="initFeCode" :autofocus="true" @change="updateFeCode"></code-mirror>

        <h3>html</h3>
        <code-mirror class="cm-html" :code="raw" :read-only="true" :line-numbers="false" mode="application/x-ejs"></code-mirror>
      </div>
    </div>

    <div class="i-be">
      <div class="i-code">
        <h3>server code</h3>
        <code-mirror class="cm-be" :code="initBeCode" @change="updateBeCode"></code-mirror>
      </div>
    </div>

    <div class="i-sidebar">
      <ul>
        <template v-for="(item, key) of examData">
          <router-link :to="`/exam/${key}`" tag="a">{{key}}</router-link>
        </template>
      </ul>
    </div>
    <div class="i-success" v-if="success && showSuccess" @click="showSuccess=false"></div>
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
        raw: '',
        success: false,
        showSuccess: false,
        examData: exam
      }
    },

    mounted () {
      this.updateInitBeCode()

      top.addEventListener('message', e => {
        const data = e.data
        if (!(e.origin === top.location.origin && data.src === 'sandbox' && data.success === true)) return

        this.success = data.success
        this.showSuccess = true
        setTimeout(() => {
          this.showSuccess = false
        }, 1000)
      })
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
          tpl = String(new Function(`
            var alert,prompt,confirm,location,window,top,self,parent,document,eval,Function,execScript,setTimeout,setInterval;
            return (
              ${beCode.trim()}
            )(\`${escapeJS(feCode)}\`)
          `)())
        } catch (e) {
          // console.log(e)
        }
        this.raw = tpl
        // console.info(tpl)
        return tpl
      },

      updateInitBeCode () {
        let data = this.examData[this.$route.params.id]
        if (!data) {
          this.$router.push('/404')
          return
        }
        this.initBeCode = data.beCode
      },

      updateBeCode (newVal) {
        this.beCode = newVal
      },

      updateFeCode (newVal) {
        this.feCode = newVal
      }
    },

    watch: {
      beCode (beCode) {
        this.inject(this.feCode, this.beCode)
      },

      feCode () {
        this.inject(this.feCode, this.beCode)
      },

      '$route.params' () {
        this.updateInitBeCode()
      }
    }
  }
</script>
