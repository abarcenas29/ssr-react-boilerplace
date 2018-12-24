import React, { Suspense } from 'react'
import RouterWithSubroutes from 'Helpers/RoutesWithSubroutes'
import { Switch } from 'react-router-dom'

import routeConfig from './routes'

const App = () => (
  <Switch>
    {
      routeConfig.map((route, i) => <RouterWithSubroutes key={i} {...route}  /> 
    )}
  </Switch>
)

export default App
