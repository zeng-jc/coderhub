import { defineStore } from 'pinia'
import { fetchMomentDetail, fetchComent, fetchPostComent } from '@/service'
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
        item.content = item.content.replace(/\n/g, '<br>')
      }
      this.commentsTree = listToTree(data.comments)
    },
    async postComent(moment_id, content, comment_id = null) {
      const res = await fetchPostComent(moment_id, content, comment_id)
      if (res.code !== 200) return res.msg
      return res.data
    }
  }
})

export default useDtailStore
