<template>
  <div class="i-main">
    <div class="i-fe">
      <div class="i-browser">
        <div class="hd">
          <div class="url">
            <input type="text" :value="`http://xss.test/?input=${encodeURI(curData.feCode)}`">
          </div>
        </div>
        <div class="bd">
          <iframe ref="sandbox" name="sandbox"></iframe>
        </div>
      </div>

      <div class="i-code">
        <h3>input code <em v-if="curData &&  curData.feCode && curData.feCode.length">length: {{curData.feCode.length}}</em></h3>
        <code-mirror class="cm-input" :code="initFeCode" :autofocus="true" mode="application/x-ejs" @change="updateFeCode"></code-mirror>

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
        <template v-for="(item, index) of examData.index">
          <router-link :to="`/${item}`" tag="a">
            {{index | to16}}
            <span v-if="examData.data[item].success" class="right">✓</span>
          </router-link>
        </template>
      </ul>
    </div>
    <div class="i-success" v-if="curData.success && showSuccess" @click="showSuccess=false"></div>
    <router-view></router-view>
  </div>
</template>

<script>
  const buble = require('buble')
  import cookie from 'browser-cookies'
  import merge from 'lodash.merge'
  import { ls, clone, escapeJS, compile } from './lib/util'
  import codeMirror from './components/codemirror'
  import sandboxText from './data/sandbox.raw'
  import exam from './data/exam/index.js'

  const localData = ls.get('xssData') || {data: {}}
  const examData = (() => {
    let ret = merge({}, localData, exam)
    for (let i in exam.data) {
      ret.data[i] = Object.assign({
        success: false,
        feCode: '',
        beCode: '',
        title: ''
      }, localData.data[i], exam.data[i])
    }
    return ret
  })()

  export default {
    name: 'Home',
    data () {
      return {
        initBeCode: '',
        initFeCode: '',
        raw: '',
        showSuccess: false,
        examData,
        curData: {}
      }
    },

    mounted () {
      this.updateCurData()
      let timer
      top.addEventListener('message', e => {
        const data = e.data
        if (!(e.origin === top.location.origin && data.src === 'sandbox' && data.success === true)) return
        this.curData.success = true
        this.showSuccess = true
        clearTimeout(timer)
        timer = setTimeout(() => {
          window._czc && window._czc.push(['_trackEvent', ((cookie.get('uid') || '').replace('|', '-')), this.curData.beCode, this.curData.feCode])
        }, 200)
      })
    },

    components: {
      codeMirror
    },

    methods: {
      inject () {
        const blob = new Blob([
          compile(sandboxText, {
            BODY: this.serverRender(this.curData.feCode, this.curData.beCode)
          })
        ], { type: 'text/html' })
        const blobUrl = URL.createObjectURL(blob)
        const sandbox = this.$refs.sandbox.contentWindow
        sandbox.location.replace(blobUrl)
        this.showSuccess = false
      },

      serverRender (feCode, beCode) {
        let tpl = '<!-- SERVER_ERROR -->'
        try {
          let code = `(function(){
            'use strict';
             var alert,prompt,confirm,console,
                 location,document,open,
                 global,window,top,self,parent,frames,
                 Function,execScript,setTimeout,setInterval,
                 localStorage,sessionStorage;
            return (
              ${beCode.trim()}
            )(\`${escapeJS(feCode)}\`)
          })()`
          console.log(code)
          code = buble.transform(code).code
          tpl = String(new Function('return' + code)())
        } catch (e) {
          console.error('SERVER_ERROR ', e.stack)
        }
        this.raw = tpl
        return tpl
      },

      updateCurData () {
        let data = this.examData.data[this.$route.params.id]
        if (!data) {
          this.$router.push('/')
          return
        }
        this.curData = data
        this.initBeCode = data.beCode
        this.initFeCode = data.feCode
      },

      updateBeCode (newVal) {
        this.curData.beCode = newVal
      },

      updateFeCode (newVal) {
        this.curData.feCode = newVal
        this.curData.success = false
        ls.set('xssData', this.examData)
      }
    },

    filters: {
      to16 (n) {
        return `0x${Number(n).toString(16).padStart(2, 0).toUpperCase()}`
      }
    },

    watch: {
      curData: {
        deep: true,
        handler (newData) {
          this.inject()
        }
      },

      '$route.params' () {
        this.updateCurData()
      }
    }
  }
</script>
