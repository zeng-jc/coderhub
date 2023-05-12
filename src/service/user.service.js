import myRequest from './request/request'

export function fetchLogin(email, password) {
  return myRequest.request({
    url: '/login',
    method: 'post',
    data: {
      email,
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

export function fetchCreateMoment(content) {
  return myRequest.request({
    url: `/moment`,
    method: 'post',
    data: {
      content
    }
  })
}
