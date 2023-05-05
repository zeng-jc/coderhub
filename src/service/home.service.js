import myRequest from './request/request'

export function fetchMomentList(limit, offset) {
  return myRequest.request({
    method: 'get',
    url: '/moment',
    params: { limit, offset }
  })
}
