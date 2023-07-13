import router from '@/router';
import { defineStore } from 'pinia'


interface Tab {
  name: string
  title: string
}

const list = ['/404']

export const useTabsStore = defineStore({
  id: 'tabs',
  state: () => ({
    data: [{ name: '/', title: '首页' }] as Tab[]
  }),
  getters: {

  },

  actions: {
    add(obj: Tab): void {
      let push = true
      list.forEach(item => {
        if (obj.name === item) push = false
      })
      this.data.forEach(item => {
        if (item.name === obj.name) push = false
      })
      if (push) this.data.push(obj)
    },
    remove(name: string): void {
      let num = 1;
      this.data.forEach((item: Tab, index: number) => {
        if (item.name === name) {
          num = index
        } else {
          return item
        }
      })
      this.data = this.data.filter((item: Tab) => item.name !== name)
      if (num + 1 < this.data.length)
        router.push(this.data[num].name)
      else
        router.push(this.data[this.data.length - 1].name)
    },
  },

  persist: {
    storage: sessionStorage,
  },
})
