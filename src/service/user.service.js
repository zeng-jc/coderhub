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
