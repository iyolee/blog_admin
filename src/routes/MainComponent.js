import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
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
    component={route.component}
    redirect={route.redirect || null}
  />)
  : <Route
    key={route.path}
    exact={route.exact || false}
    path={route.path}
    component={route.component}
  />

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
    return <Error />
  }
  return route.children
    ? route
      .children
      .map(route => RouteComponent(route))
    : RouteComponent(route)
})

const renderByLayout = (routes, {location: {pathname}}) => routes.map(route => {
  return pathname === route.path && route.layouts ? <route.layouts key={route.path} /> : null
})

const getRoute = (routes, pathname) => {
  const fn = routes => routes.map(route => {
    if (route.path === pathname) {
      return route
    }
    if (route.children) {
      return fn(route.children).find(v => v)
    }
  })
  return fn(routes).find(route => route)
}

class MainComponent extends PureComponent {
  static propTypes = {
    location: PropTypes.any
  }
  componentDidMount() {
    const {location: {pathname}} = this.props
    const currRoute = getRoute(allRoutes, pathname)
    // 改变title
    if (currRoute && currRoute.name) {
      document.title = currRoute.name
    } else if (!currRoute) {
      document.title = '404'
    }
  }
  render() {
    return (
      <div>
        {renderByLayout(allRoutes, this.props)}
        <Switch>
          {renderRouteComponent(allRoutes, this.props)}
        </Switch>
      </div>
    )
  }
}

export default MainComponent