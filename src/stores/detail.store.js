import { defineStore } from 'pinia'
import { fetchMomentDetail, fetchComent } from '../service'
import listToTree from '../utils/listToTree'

const useDtailStore = defineStore('momentDtail', {
  state: () => ({
    momentDetailData: '',
    commentsTree: ''
  }),
  actions: {
    async getMomentDetail(id) {
      const { data } = await fetchMomentDetail(id)
      this.momentDetailData = data
    },
    async getComment(id) {
      const { data } = await fetchComent(id)
      this.commentsTree = listToTree(data.comments)
    }
  }
})

export default useDtailStore
