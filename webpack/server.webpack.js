const path = require('path')
const webpack = require('webpack')

const baseOptions = require('./base.options')

const config = (mode) => {
  return {
    mode: mode,
    name: 'server',
    target: 'node',
    entry: path.resolve(__dirname, '../server', 'render.js'),
    resolve: baseOptions.resolve,
    output: {
      libraryTarget: 'commonjs2'
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: 'css-loader/locals'
        }
      ]
    }
  }
}

module.exports = config
