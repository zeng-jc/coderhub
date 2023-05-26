import myRequest from '../request/request'

export function fetchComment(id) {
  return myRequest.request({
    method: 'get',
    url: `/comment/${id}`
  })
}

export function fetchSendComment(momentId, content, commentId = null) {
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

export function fetchRemoveComent(commentId) {
  return myRequest.request({
    method: 'delete',
    url: `/comment/${commentId}`
  })
}
