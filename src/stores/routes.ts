import { defineStore } from 'pinia'
import { userRoutes } from '@/router/routes'

export const useRoutesStore = defineStore({
  id: 'routes',
  state: () => ({
    data: userRoutes
  }),

  persist: {
    storage: localStorage
  }
})
