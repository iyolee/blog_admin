import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import * as loginAction from '../actions/loginAction'

const Wrapper = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url('../../static/bg.jpg') no-repeat center center fixed;
  background-size: cover;
`

const InputBox = styled.div`
  width: 600px;
  height: 400px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background: white;
  opacity: 0.8;
  text-align: center;

  h2 {
    text-align: center;
    margin-top: 40px;
  }

  .login-warning {
    color: red;
    font-size: 12px;
  }
`

const Input = styled.input`
  border: 1px solid #222;
  display: inline-block;
  width: 50%;
  padding: 16px;
  margin: 10px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #c8cccf;
  outline: 0;
  color: #6a6f77;
  -web-kit-appearance: none;
  -moz-appearance: none;
`

const Button = styled.button`
  width: 30%;
  margin-top: 30px;
  padding: 10px;
  background: blue;
  color: white;
  border: none;
`

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      warning: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.error && nextProps.message !== this.props.message) {
      this.setState({
        warning: nextProps.message
      })
    }
  }

  componentDidUpdate() {
    this.checkAuth()
  }

  onUsernameChange = event => {
    this.setState({
      username: event.target.value
    })
  }

  onPasswordChange = event => {
    this.setState({
      password: event.target.value
    })
  }

  hanleSubmit = event => {
    event.preventDefault()
    if (this.state.username === '' || this.state.password === '') {
      this.setState({
        warning: '用户或密码不能为空！'
      })
    } else {
      this.setState({
        warning: ''
      })
      this.props.onLogin({
        username: this.state.username,
        password: this.state.password
      })
    }
  }

  checkAuth = () => {
    if (this.props.isLoggedIn) {
      this.props.history.push('/admin')
    }
  }

  render() {
    return (
      <Wrapper>
        <InputBox>
          <h2>博客后台管理</h2>
          {this.state.warning && (
            <span className="login-warning">{this.state.warning}</span>
          )}
          <form onSubmit={this.hanleSubmit}>
            <div>
              <label htmlFor="">用户：</label>
              <Input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.onUsernameChange}
              />
            </div>
            <div>
              <label htmlFor="">密码：</label>
              <Input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.onPasswordChange}
              />
            </div>
            <Button type="submit">登录</Button>
          </form>
        </InputBox>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.login.isLoggedIn,
    error: state.login.error,
    message: state.login.message
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: data => {
      dispatch(loginAction.fetchLogin(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
