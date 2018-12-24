import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'

import createReduxStore from './store'

const store = createReduxStore(window.__INITIAL_STATE__)

const render = App => ReactDom.hydrate(
  <Provider store={store}>
    <AppContainer>
      <Router>
        <App />
      </Router>
    </AppContainer>
  </Provider>
  ,
  document.getElementById('root')
)

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App.js', () => {
    const App = require('./App').default
    render(App)
  })
}

render(App)
