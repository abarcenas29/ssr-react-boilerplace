const path = require('path')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const webpackProgressBar = require('progress-bar-webpack-plugin')
const webpack = require('webpack')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const baseOptions = require('./base.options')

const config = (env, options) => {
  const webpackConfig = {
    mode: options.mode,
    name: 'client',
    target: 'web',
    devtool: (options.mode === 'production') ? false : 'inline-source-map', 
    resolve: baseOptions.resolve,
    entry: [
      'webpack-hot-middleware/client',
      'react-hot-loader/patch',
      path.resolve(__dirname, '../src', 'index.js')
    ],
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
      path: path.resolve(__dirname, '../buildClient'),
      publicPath: '/static/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [
            ExtractCssChunks.loader,
            'css-loader'
          ]
        }
      ]
    },
    plugins: [
      new ExtractCssChunks(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      }),
      new LodashModuleReplacementPlugin()
    ]
  }

  if (env.NODE_ENV === 'production') {
    webpackConfig.plugins.push(
      new webpackProgressBar({
        summary: true
      })
    )
    webpackConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        openAnalyzer: false
      })
    )
  }

  return webpackConfig
}

module.exports = config
