import { defineStore } from 'pinia'
import { menuData } from '@/appconfig'

export const useMenuStore = defineStore({
  id: 'menu',
  state: () => ({
    menu: menuData,
    fixedMenu: [{ title: '首页', icon: 'House', path: '/', code: 'house' }] as any
  }),

  getters: {
    getMenu: (state) => {
      return state.fixedMenu.concat(state.menu)
    }
  },

  actions: {
    changemenuData(data: any) {
      this.menu = data
    }
  },

  persist: {
    storage: localStorage,
  },
})