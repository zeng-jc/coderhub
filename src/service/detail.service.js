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

export function fetchPostComent(moment_id, content, comment_id = null) {
  return myRequest.request({
    method: 'post',
    url: `/comment`,
    data: {
      moment_id,
      content,
      comment_id
    }
  })
}
