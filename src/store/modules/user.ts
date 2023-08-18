import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: {
      idCard: '',
      name: ''
    }
  }),

  actions: {},

  getters: {}
})

export default useUserStore