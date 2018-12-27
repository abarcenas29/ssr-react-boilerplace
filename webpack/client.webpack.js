const path = require('path')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const webpack = require('webpack')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const baseOptions = require('./base.options')

const config = (mode) => {
  return {
    mode: mode,
    name: 'client',
    target: 'web',
    devtool: (mode === 'production') ? false : 'inline-source-map', 
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
      new LodashModuleReplacementPlugin(),
      new BundleAnalyzerPlugin()
    ]
  }
}

module.exports = config
