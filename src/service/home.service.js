import myRequest from './request/request'

export function fetchMomentList(limit, offset) {
  return myRequest.request({
    method: 'get',
    url: '/moment',
    params: { limit, offset }
  })
}

export function fetchUserList(limit, offset) {
  return myRequest.request({
    method: 'get',
    url: '/user',
    params: { limit, offset }
  })
}
