import { defineStore } from 'pinia'
import { fetchMomentDetail, fetchComent } from '@/service'
import listToTree from '@/utils/listToTree'
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
    },
    async getComment(id) {
      const { data } = await fetchComent(id)
      for (const item of data.comments) {
        item.createAt = dateFormat(item.createAt, 'YYYY-MM-DD HH:mm')
      }
      this.commentsTree = listToTree(data.comments)
    }
  }
})

export default useDtailStore
