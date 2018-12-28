const express = require('express')
const clientConfig = require('./../webpack/client.webpack')
const serverConfig = require('./../webpack/server.webpack')

const app = express()

const NODE_ENV = process.env.NODE_ENV

const clientWebpack = clientConfig(process.env, {mode: NODE_ENV})
const publicPath = clientWebpack.output.publicPath
const outputPath = clientWebpack.output.path
const serverWebpack = serverConfig(process.env, {mode: NODE_ENV})

let isBuilt = false

const done = () => !isBuilt && app.listen(3000, () => {
  isBuilt = true
  console.log(`Build Complete - listening to 3000`)
})

if (NODE_ENV === 'production') {
  const path = require('path')
  const webpack = require('webpack')

  webpack([clientWebpack, serverWebpack]).run((err, stats) => {
    
    const clientStats = stats.toJson().children[0]
    const serverRender = require('../buildServer/main.js').default

    app.use(publicPath, express.static(outputPath))
    app.use(serverRender({ clientStats }))
    done()
  })
} else {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
  

  const compiler = webpack(
    [
      clientWebpack,
      serverWebpack
    ]
  )
  const clientCompiler = compiler.compilers[0]
  const options = { publicPath, stats: { colors: true }, mode: NODE_ENV}
  
  app.use(webpackDevMiddleware(compiler, options))
  app.use(webpackHotMiddleware(clientCompiler))
  app.use(webpackHotServerMiddleware(compiler))

  compiler.plugin('done', done)
}

