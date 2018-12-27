const express = require('express')

const app = express()

const NODE_ENV = process.env.NODE_ENV

if (NODE_ENV === 'production') {
  const path = require('path')
  const CLIENT_ASSET_DIR = path.join(__dirname, '../buildClient')
  const CLIENT_STATS_PATH = path.join(__dirname, '../buildClient/stats.json')
  const SERVER_RENDER_PATH = path.join(__dirname, '../buildServer/main.js')

  const stats = require(CLIENT_STATS_PATH)
  const serverRender = require(SERVER_RENDER_PATH)

  app.use(express.static(CLIENT_ASSET_DIR))
  app.use(serverRender.default(stats))
} else {
  // https://github.com/faceyspacey/webpack-flush-chunks/blob/master/docs/webpack-stats.md
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
  const clientConfig = require('./../webpack/client.webpack')
  const serverConfig = require('./../webpack/server.webpack')

  const compiler = webpack(
    [
      clientConfig(process.env, {mode: NODE_ENV}), 
      serverConfig(process.env, {mode: NODE_ENV})
    ]
  )
  const clientCompiler = compiler.compilers[0]
  const publicPath = clientConfig(process.env, {mode: NODE_ENV}).output.publicPath
  const options = { publicPath, stats: { colors: true }, mode: NODE_ENV}
  
  app.use(webpackDevMiddleware(compiler, options))
  app.use(webpackHotMiddleware(clientCompiler))
  app.use(webpackHotServerMiddleware(compiler))
}

app.listen(3000, () => {
  console.log('lisenting at 3000')
})
