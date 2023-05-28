import { defineStore } from 'pinia'
import { fetchMomentList, fetchUserList } from '@/service'
import dateFormat from '@/utils/format_date'

const useHomeStore = defineStore('home', {
  state: () => ({
    users: [],
    moments: [],
    momentOffset: 0,
    momentTotalCount: 0
  }),
  actions: {
    async getMomentList(limit) {
      const { data } = await fetchMomentList(limit, this.momentOffset)
      this.momentOffset = this.momentOffset + limit
      // 日期格式化
      for (const item of data.moments) {
        item.createAt = dateFormat(item.createAt, 'YYYY-MM-DD HH:mm')
      }
      if (data.moments.length === 0) return false
      for (const item of data.moments) {
        this.moments.push(item)
      }
      this.momentTotalCount = data.totalCount
    },
    async getUserList(limit, offset) {
      const res = await fetchUserList(limit, offset)
      this.users = res.data.users
    }
  }
})

export default useHomeStore
