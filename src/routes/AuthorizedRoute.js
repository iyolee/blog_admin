import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router'

import * as loginAction from '../actions/loginAction'
import fetchData from '../utils/fetch'
import Login from '../components/Login'

class AuthorizedRoute extends Component {
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
    const { component: Component,  isLoggedIn, ...rest } = this.props
    return (
      <Route {...rest} render={() => {
        return isLoggedIn
          ? <Component {...this.props} />
          : <Login />
      }} />
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