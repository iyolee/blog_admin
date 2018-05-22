import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import MainComponent from './MainComponent'

const Routes = () => (
  <Router>
    <Route path='/' component={MainComponent} />
  </Router>
)

export default Routes
