import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import {Switch} from 'react-router'

import allRoutes from './config'
import AuthorizedRoute from './AuthorizedRoute'
import Error from '../components/Error'

const RouteComponent = route => route.auth
  ? (<AuthorizedRoute
    key={route.path}
    exact={route.exact || false}
    path={route.path}
    component={route.component}/>)
  : (<Route
    key={route.path}
    exact={route.exact || false}
    path={route.path}
    component={route.component}/>)

// 404判断
const isExistPath = (routes, pathname) => routes.some(route => {
  if (route.path === pathname) {
    return true
  }
  if (route.children) {
    return this.isExistPath(route.children, pathname)
  }
  return false
})

const renderRouteComponent = (routes, {location: {pathname}}) => routes.map(route => {
  if (!isExistPath(allRoutes, pathname)) {
    return <Error/>
  }
  return route.children
    ? route
      .children
      .map(route => RouteComponent(route))
    : RouteComponent(route)
})

class MainComponent extends Component {

  render() {
    return (
      <Switch>
        {renderRouteComponent(allRoutes, this.props)}
      </Switch>
    )
  }
}

export default MainComponent