import { baseUrl } from './env'

const createUrl = (urlStr, type, data = {}) => {
  let url = `${baseUrl}${urlStr}`

  if (data && type === 'GET') {
    let dataStr = ''
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&'
    })
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
      url = url + '?' + dataStr
    }
  }
  return url
}

const useFetch = async (type, url, data) => {
  const requestConfig = {
    method: type,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // 'x-access-token': data.token
    },
    cache: 'force-cache',
    // mode: 'no-cors',
  }

  if (type === 'POST') {
    if (data) {
      if (data.token) {
        Object.assign(requestConfig.headers, {
          'Authorization': 'Bearer ' + data.token
        })
      }
      delete data.token

      Object.assign(requestConfig, {
        body: JSON.stringify(data)
      })
    }
  }

  try {
    const response = await fetch(url, requestConfig)
    // if (response.status !== 200) {
    //   throw new Error('Fail to get response with status ' + response.status)
    // }
    const responseJson = await response.json()
    return responseJson
  } catch (error) {
    throw new Error(error)
  }
}

const useXHR = (type, url, data) => {
  const p = new Promise(resolve => {
    const xhr = new XMLHttpRequest()
    let sendData = null
    if (type === 'POST') {
      sendData = JSON.stringify(data)
    }
    xhr.open(type, url, true)
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.send(sendData)

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr === 304) {
          let obj = xhr.response
          if (typeof obj !== 'object') {
            obj = JSON.parse(obj)
          }
          resolve(obj)
        } else {
          throw new Error(xhr)
        }
      }
    }
  })
  return p
}

export default async (typeStr = 'GET', urlStr = '', data = {}) => {
  const type = typeStr.toUpperCase()
  const url = createUrl(urlStr, type, data)

  if (window.fetch) {
    return useFetch(type, url, data)
  } else {
    return useXHR(type, url, data)
  }

}
