import { defineStore } from 'pinia'
import { menuData } from '@/appconfig'

export const useMenuStore = defineStore({
  id: 'menu',
  state: () => ({
    data: menuData
  }),

  persist: {
    storage: sessionStorage,
  },
})