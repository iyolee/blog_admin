import fetchData from '../utils/fetch'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FALIURE = 'LOGIN_FALIURE'
export const LOGIN_IN = 'LOGIN_IN'

// 请求登录
export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
})

// 登录失败
export const loginFailure = error => ({
  type: LOGIN_FALIURE,
  error
})

// 已登录
export const loginIn = () => ({
  type: LOGIN_IN,
})

let nextSepId = 0
export const fetchLogin = data => {
  return dispatch => {
    const apiUrl = '/admin'
    const seqId = ++nextSepId

    const dispatchIfValid = action => {
      if (seqId === nextSepId) {
        return dispatch(action)
      }
    }

    fetchData('POST', apiUrl, {
      username: data.username,
      password: data.password
    }).then(response => {
      const success_code = 0
      if (response.code === success_code) {
        dispatchIfValid(loginSuccess())
        sessionStorage.setItem('key', response.token)
      } else {
        dispatchIfValid(loginFailure(response.message))
      }
    }).catch(error => {
      dispatchIfValid(loginFailure(error))
    })
  }
}