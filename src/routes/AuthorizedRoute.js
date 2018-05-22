import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import PropTypes from 'prop-types'

import * as loginAction from '../actions/loginAction'
import fetchData from '../utils/fetch'

class AuthorizedRoute extends PureComponent {

  static propTypes = {
    onLoginIn: PropTypes.func,
    token: PropTypes.string,
    history: PropTypes.any,
    component: PropTypes.any,
    redirect: PropTypes.any,
    isLoggedIn: PropTypes.bool
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.checkAuth()
  }

  componentWillReceiveProps() {
    this.checkAuth()
  }

  checkAuth = () => {
    const key = sessionStorage.getItem('key')
    if (key) {
      fetchData('POST', '/admin/login', {
        token: key
      }).then(result => {
        const access_code = 0
        if (result.code === access_code) {
          this.props.onLoginIn(this.props.token)
        } else {
          this.props.history.push('/login')
        }
      }).catch(error => {
        throw error
      })
    }
  }

  render() {
    const { component: Component, redirect: RedirectComponent, isLoggedIn, ...rest } = this.props
    return (
      <Route {...rest} render={() => {
        return isLoggedIn
          ? <Component {...this.props} />
          : <RedirectComponent />
      }}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.login.isLoggedIn,
    token: state.login.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoginIn: () => {
      dispatch(loginAction.loginIn())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizedRoute)