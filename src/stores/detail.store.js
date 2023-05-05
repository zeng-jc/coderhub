import { defineStore } from 'pinia'
import { fetchMomentDetail } from '../service'

const useDtailStore = defineStore('momentDtail', {
  state: () => ({
    momentDetailData: ''
  }),
  actions: {
    async getMomentDetail(id) {
      const { data } = await fetchMomentDetail(id)
      this.momentDetailData = data
    }
  }
})

export default useDtailStore
