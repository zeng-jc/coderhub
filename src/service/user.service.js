import myRequest from './request/request'

export function fetchLogin(username, password) {
  return myRequest.request({
    url: '/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function fetchUser(username, password) {
  return myRequest.request({
    url: '/user',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
