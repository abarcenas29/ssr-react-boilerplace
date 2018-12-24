const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
const clientConfig = require('./../webpack/client.webpack')
const serverConfig = require('./../webpack/server.webpack')

const app = express()

const compiler = webpack([clientConfig('development'), serverConfig('development')])
const clientCompiler = compiler.compilers[0]
const publicPath = clientConfig().output.publicPath
const options = { publicPath, stats: { colors: true }, mode: 'development'}

app.use(webpackDevMiddleware(compiler, options))
app.use(webpackHotMiddleware(clientCompiler))
app.use(webpackHotServerMiddleware(compiler))

app.listen(3000, () => {
  console.log('lisenting at 3000')
})
