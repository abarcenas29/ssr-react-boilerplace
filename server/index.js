const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
const clientConfig = require('./../webpack/client.webpack')
const serverConfig = require('./../webpack/server.webpack')

const app = express()

const NODE_ENV = process.env.NODE_ENV

const compiler = webpack(
  [clientConfig(NODE_ENV), serverConfig(NODE_ENV)])
const clientCompiler = compiler.compilers[0]
const publicPath = clientConfig().output.publicPath
const options = { publicPath, stats: { colors: true }, mode: NODE_ENV}

app.use(webpackDevMiddleware(compiler, options))
app.use(webpackHotMiddleware(clientCompiler))
app.use(webpackHotServerMiddleware(compiler))

app.listen(3000, () => {
  console.log('lisenting at 3000')
})
