import { defineStore } from 'pinia'
import { fetchMomentList, fetchUserList } from '@/service/home.service'
import dateFormat from '@/utils/format_date'

const useHomeStore = defineStore('home', {
  state: () => ({
    moments: {},
    users: []
  }),
  actions: {
    async getMomentList(limit, offset) {
      const { data } = await fetchMomentList(limit, offset)
      // 日期格式化
      for (const item of data.moments) {
        item.createAt = dateFormat(item.createAt, 'YYYY-MM-DD HH:mm')
      }
      this.moments = data
    },
    async getUserList(limit, offset) {
      const res = await fetchUserList(limit, offset)
      this.users = res.data.users
    }
  }
})

export default useHomeStore
