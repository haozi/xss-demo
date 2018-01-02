'use strict'
const path = require('path')

module.exports = {
  autoprefixer: {
    browsers: ['Android >= 4', 'iOS >= 7', 'IE >= 9', 'Firefox >= 50', 'Chrome >= 21'],
  },
  build: {
    env: require('./prod.env.js'),
    index: path.resolve(__dirname, '../../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../../dist'),
    assetsSubDirectory: './',
    assetsPublicPath: 'https://haozi.github.io/xss-demo/dist/',
    productionSourceMap: false,
    productionGzip: false,
    linkCss: false,
    vendor: false,
    buildHtml: true,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env.js'),
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '',
    proxyTable: {},
    cssSourceMap: false
  }
}
