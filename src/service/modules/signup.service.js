import myRequest from '../request/request'

export function fetchSignupUser(nickname, email, username, password) {
  return myRequest.request({
    url: '/user',
    method: 'post',
    data: {
      nickname,
      email,
      username,
      password
    }
  })
}

export function fetchVerifyEmail(email) {
  return myRequest.request({
    url: `/user/email/${email}`,
    method: 'get'
  })
}

export function fetchVerifyUsername(username) {
  return myRequest.request({
    url: `/user/username/${username}`,
    method: 'get'
  })
}
