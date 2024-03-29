import {
  fetchLogin,
  fetchUser,
  fetchMoments,
  fetchCreateMoment,
  fetchEmialVerifyCode,
  fetchEmailVerifyLogin,
  fetchRemoveMoment,
  fetchUpdateUser
} from '@/service'
import { authInfoCache } from '@/hooks/authInfo'

import { defineStore } from 'pinia'
const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: '',
      verifyLogin: false,
      moments: []
    }
  },
  actions: {
    async login(email, password) {
      const res = await fetchLogin(email, password)
      if (res.code !== 200) return res.msg
      this.user = res.data
      authInfoCache(res)
    },
    async getUser(username) {
      const res = await fetchUser(username)
      this.user = res.data.user
    },
    async getMoments(limit, offset, username) {
      const res = await fetchMoments(limit, offset, username)
      this.moments = res.data.moments
    },
    async createMoment(content) {
      const res = await fetchCreateMoment(content)
      if (res.code !== 200) return false
      return true
    },
    async removeMoment(id) {
      const res = await fetchRemoveMoment(id)
      if (res.code !== 200) return false
      return true
    },
    async getEmialVerifyCode(email) {
      const res = await fetchEmialVerifyCode(email)
      if (res.code !== 200) return false
      return true
    },
    async emailVerifyLogin(email, code) {
      const res = await fetchEmailVerifyLogin(email, code)
      if (res.code !== 200) return res.msg
      this.user = res.data
      authInfoCache(res)
    },
    async updateUser() {
      const res = await fetchUpdateUser(this.user)
      return res.msg
    }
  }
})

export default useUserStore
