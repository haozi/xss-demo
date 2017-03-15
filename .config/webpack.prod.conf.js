'use strict'

const path = require('path')
const config = require('./config')
const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const env = process.env.NODE_ENV === 'testing'
  ? require('config/test.env')
  : config.build.env
const pkg = require('../package.json')

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({sourceMap: config.build.productionSourceMap, extract: true})
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('x.js'),
    chunkFilename: utils.assetsPath('[id].js')
  },
  vue: {
    loaders: config.build.linkCss ? utils.cssLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    }) : null
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        hoist_vars: true,
        hoist_funs: true,
        drop_debugger: true,
        unused: true,
        drop_console: true,
        sequences: true,
        conditionals: true,
        booleans: true,
        if_return: true,
        join_vars: true,
        screw_ie8: true,
        comparisons: true,
        evaluate: true,
        loops: true,
        cascade: true,
        negate_iife: true
      },
      comments: false,
      output: {
        ascii_only: true
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    config.build.linkCss && new ExtractTextPlugin(utils.assetsPath('css/[name].css'), {allChunks: true}),
    config.build.buildHtml && new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),
    config.build.vendor && new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    config.build.vendor && new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),

    new webpack.BannerPlugin([
      `${pkg.name} v ${pkg.version}`,
      `last update  ${new Date().toLocaleDateString()}`,
      `contributors ${pkg.contributors.join(' ')}`
    ].join('\n'))
  ].filter(Boolean)
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = webpackConfig
