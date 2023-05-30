import myRequest from '../request/request'

export function fetchUploadAvatar(formData) {
  return myRequest.request({
    method: 'post',
    url: '/file/avatar',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
