'use strict'
const config = require('./config')
const webpack = require('webpack')
const merge = require('webpack-merge')
const utils = require('./utils')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pkg = require('../package.json')
const WebpackNotifierPlugin = require('webpack-notifier')

Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./.config/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
  },
  devtool: '#eval-source-map',
  plugins: [
    new WebpackNotifierPlugin({
      title: `${pkg.name}@${pkg.version}`,
      excludeWarnings: true,
      contentImage: `${__dirname}/logo.png`
    }),
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
})
