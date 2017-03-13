module.exports = {
  root: true,
  // parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: false
  },
  extends: 'standard',
  plugins: [
    'flow-vars',
    'html'
  ],
  env: {
    'browser': true,
    'shared-node-browser': true
  },
  'rules': {
    'no-new': 0,
    'no-new-func': 0,
    'generator-star-spacing': 0,
    'flow-vars/define-flow-type': 1,
    'flow-vars/use-flow-type': 1,
    'semi': 2, // 禁用分号
    'eol-last': 2, // 末尾空行
    'no-var': 2, // 使用 const let 代替 var
    'strict': 0,
    'yoda': 0,
    'comma-dangle': 0,
    'spaced-comment': 0,
    'arrow-parens': 0,
    'space-before-function-paren': 0,
    'no-trailing-spaces': 0,
    'no-unused-vars': 0,
    'quotes': [2, 'single', {avoidEscape: true, allowTemplateLiterals: true}], // 默认单引号
    'no-lone-blocks': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, // 线上禁止 debugger
    'no-implicit-globals': 2, // 禁止隐式暴露全局变量
    'no-alert': process.env.NODE_ENV === 'production' ? 2 : 0, // 线上禁止 alert
  }
}
