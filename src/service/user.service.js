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

export function fetchUser(username) {
  return myRequest.request({
    url: `/user/${username}`,
    method: 'get'
  })
}

export function fetchMoments(limit, offset, username) {
  return myRequest.request({
    url: `/moment`,
    method: 'get',
    params: {
      limit,
      offset,
      username
    }
  })
}
