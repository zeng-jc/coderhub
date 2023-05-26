import { defineStore } from 'pinia'
import { fetchMomentDetail } from '@/service'
import dateFormat from '@/utils/format_date'

const useDtailStore = defineStore('momentDtail', {
  state: () => ({
    momentDetail: '',
    commentsTree: ''
  }),
  actions: {
    async getMomentDetail(id) {
      const { data } = await fetchMomentDetail(id)
      data.moment.createAt = dateFormat(data.moment.createAt, 'YYYY-MM-DD HH:mm')
      this.momentDetail = data.moment
    }
  }
})

export default useDtailStore
