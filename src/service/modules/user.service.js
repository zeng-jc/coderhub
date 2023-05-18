import myRequest from '../request/request'

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

export function fetchEmialVerifyCode(email) {
  return myRequest.request({
    url: `/sendEmail`,
    method: 'post',
    data: {
      email
    }
  })
}

export function fetchEmailVerifyLogin(email, code) {
  return myRequest.request({
    url: `/loginVerifyCode`,
    method: 'post',
    data: {
      email,
      code
    }
  })
}
