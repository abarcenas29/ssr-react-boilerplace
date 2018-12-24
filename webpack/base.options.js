const path = require('path')

module.exports = {
  resolve: {
    alias: {
      'Components': path.resolve(__dirname,'../src/Components'),
      'Containers': path.resolve(__dirname,'../src/Containers'),
      'Helpers': path.resolve(__dirname, '../src/Helpers'),
      'Styles': path.resolve(__dirname, '../src/Styles')
    }
  }
}