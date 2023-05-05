import { defineStore } from 'pinia'
import { fetchMomentList } from '../service/home.service'

const useHomeStore = defineStore('home', {
  state: () => ({
    moments: {}
  }),
  actions: {
    async getMomentList(limit, offset) {
      const { data } = await fetchMomentList(limit, offset)
      this.moments = data
    }
  }
})

export default useHomeStore
