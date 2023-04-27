import myRequest from './request/request'

export function login(username, password) {
  myRequest.request({
    url: '/login',
    methods: 'post',
    data: {
      username,
      password
    }
  })
}
