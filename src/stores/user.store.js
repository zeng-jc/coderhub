import { defineStore } from 'pinia'
import { login } from '@/service/index'
import { Ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const username = Ref('')
  const password = Ref('')
  login(username, password).then((res) => {
    username.value = res.data.username
    password.value = res.data.password
  })
  return { username, password }
})
