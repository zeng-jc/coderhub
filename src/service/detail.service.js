import myRequest from './request/request'

export function fetchMomentDetail(id) {
  return myRequest.request({
    method: 'get',
    url: `/moment/${id}`
  })
}

export function fetchComent(id) {
  return myRequest.request({
    method: 'get',
    url: `/comment/${id}`
  })
}

export function fetchPostComent(momentId, content, commentId = null) {
  return myRequest.request({
    method: 'post',
    url: `/comment`,
    data: {
      momentId,
      content,
      commentId
    }
  })
}
