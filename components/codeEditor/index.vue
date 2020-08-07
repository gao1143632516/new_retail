<template>
  <div class='json-editor'>
    <textarea ref='textarea'></textarea>
  </div>
</template>

<script>
  import CodeMirror from 'codemirror';
  import 'codemirror/addon/lint/lint.css';
  import 'codemirror/lib/codemirror.css';
  import 'codemirror/theme/rubyblue.css';
  require('script-loader!jsonlint');
  import 'codemirror/mode/javascript/javascript'
  import 'codemirror/addon/lint/lint'
  import 'codemirror/addon/lint/json-lint';

  export default {
    name: 'codeEditor',
    data() {
      return {
        codeEditor: false
      }
    },
    props: ['value','mode'],
    watch: {
      value(value) {
        const editor_value = this.codeEditor.getValue();
        if (value !== editor_value) {
          this.codeEditor.setValue(JSON.stringify(this.value, null, 2));
        }
      }
    },
    mounted() {
      var mode=this.mode;
      this.codeEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
        lineNumbers: true,
        mode: mode,
        gutters: ['CodeMirror-lint-markers'],
        theme: 'rubyblue',
        lint: true
      });

      this.codeEditor.setValue(JSON.stringify(this.value, null, 2));
      this.codeEditor.on('change', cm => {
        this.$emit('changed', cm.getValue())
        this.$emit('input', cm.getValue())
      })
    },
    methods: {
      getValue() {
        return this.codeEditor.getValue()
      }
    }
  }
</script>

<style>
.CodeMirror {
  height: 100%;
}

.json-editor .cm-s-rubyblue span.cm-string {
  color: #F08047;
}
</style>
