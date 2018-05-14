import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import MainComponent from './MainComponent'

const Routes = () => (
  <Router>
    <div>
      <Route path='/' component={MainComponent} />
    </div>
  </Router>
)

export default Routes
