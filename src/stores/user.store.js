import { defineStore } from 'pinia'
import { fetchLogin } from '@/service/index'

const useUserStore = defineStore('user', {
  states: () => {
    return {
      userInfo: ''
    }
  },
  actions: {
    async login(username, password) {
      const res = await fetchLogin(username, password)
      if (res.code !== 200) return res.msg
      this.userInfo = res.data
      localStorage.setItem('token', res.token || null)
    }
  }
})

export default useUserStore
