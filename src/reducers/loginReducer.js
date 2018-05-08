import {LOGIN_SUCCESS, LOGIN_FALIURE, LOGIN_IN} from '../actions/loginAction'

const initialState = {
  isLoggedIn: false,
  message: '未登录',
  error: false,
}

export default(state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        message: '已登录',
        error: false,
      }
    }
    case LOGIN_FALIURE: {
      return {
        ...state,
        isLoggedIn: false,
        message: action.error,
        error: true
      }
    }
    case LOGIN_IN: {
      return {
        ...state,
        isLoggedIn: true,
        message: '已登录',
        error: false,
      }
    }
    default:
      return state
  }
}
