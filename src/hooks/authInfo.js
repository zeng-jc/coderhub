export function authInfoCache(res) {
  localStorage.setItem('token', res.token || null)
  localStorage.setItem('username', res.data.username || null)
  localStorage.setItem('avatar', res.data.avatar || null)
}

export function authInfoClear() {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  localStorage.removeItem('avatar')
}
