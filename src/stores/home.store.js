import { defineStore } from 'pinia'
import { fetchMomentList } from '../service/home.service'
import dateFormat from '@/utils/format_date'

const useHomeStore = defineStore('home', {
  state: () => ({
    moments: {}
  }),
  actions: {
    async getMomentList(limit, offset) {
      const { data } = await fetchMomentList(limit, offset)
      // 日期格式化
      for (const item of data.moments) {
        item.createAt = dateFormat(item.createAt, 'YYYY-MM-DD HH:mm')
      }
      this.moments = data
    }
  }
})

export default useHomeStore
