import { defineStore } from 'pinia'
import { fetchComment, fetchSendComment } from '@/service'
import listToTree from '@/utils/listToTree'
import dateFormat from '@/utils/format_date'

const useComomentStore = defineStore('comment', {
  state: () => ({
    commentsTree: ''
  }),
  actions: {
    async getComment(id) {
      const { data } = await fetchComment(id)
      for (const item of data.comments) {
        item.createAt = dateFormat(item.createAt, 'YYYY-MM-DD HH:mm')
        item.content = item.content.replace(/\n/g, '<br>')
      }
      this.commentsTree = listToTree(data.comments)
    },
    async sendComment(momentId, content, commentId = null) {
      const res = await fetchSendComment(momentId, content, commentId)
      if (res.code !== 200) return res.msg
    }
  }
})

export default useComomentStore
