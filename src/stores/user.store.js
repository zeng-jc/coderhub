import { defineStore } from 'pinia'
import { fetchLogin } from '@/service/index'
import { fetchUser } from '@/service/user.service'
import { fetchMoments } from '@/service/user.service'

const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: '',
      verifyLogin: false,
      moments: []
    }
  },
  actions: {
    async login(username, password) {
      const res = await fetchLogin(username, password)
      if (res.code !== 200) return res.msg
      this.user = res.data
      localStorage.setItem('token', res.token || null)
      localStorage.setItem('username', res.data.username || null)
    },
    async getUser(username) {
      const res = await fetchUser(username)
      this.user = res.data.user
    },
    async getMoments(limit, offset, username) {
      const res = await fetchMoments(limit, offset, username)
      this.moments = res.data.moments
    }
  }
})

export default useUserStore
