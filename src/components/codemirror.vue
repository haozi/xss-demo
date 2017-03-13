<template>
  <textarea ref="t"></textarea>
</template>

<style>
  @import url('../../node_modules/codemirror/theme/monokai.css');
  @import url('../../node_modules/codemirror/lib/codemirror.css');
</style>

<script>
  import CodeMirror from 'codemirror'
  import 'codemirror/keyMap/sublime'
  import 'codemirror/mode/javascript/javascript'
  import 'codemirror/mode/htmlembedded/htmlembedded'

  function s(any) {
    any = String(any).trim()
    return any ? any + '\n' : any
  }

  export default {
    name: 'code-mirror',
    props: {
      code: {
        type: String,
        default: '//'
      },
      readOnly: {
        type: Boolean,
        default: false
      },
      mode: {
        type: String,
        default: 'javascript'
      },
      lineNumbers: {
        type: Boolean,
        default: true
      },
      autofocus: {
        type: Boolean,
        default: false
      },
      width: {
      },
      height: {
      }
    },
    mounted() {
      this.editor = CodeMirror.fromTextArea(this.$refs.t, {
        autofocus: this.autofocus,
        lineNumbers: this.lineNumbers,
        mode: this.mode,
        readOnly: this.readOnly,
        lint: 'json',
        styleActiveLine: true,
        keyMap: 'sublime',
        autoCloseBrackets: true,
        matchBrackets: true,
        showCursorWhenSelecting: true,
        theme: 'monokai',
        tabSize: 2
      })
      this.editor.setSize(this.width, this.height)
      this.editor.setValue(s(this.code))
      this.editor.on('change', (e) => {
        this.$emit('change', e.getValue())
      })
    },

    watch: {
      code (newCode) {
        this.editor.setValue(s(newCode))
      }
    }
  }
  </script>
