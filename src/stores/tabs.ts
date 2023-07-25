import router from '@/router';
import { defineStore } from 'pinia'
import { tabsConfig } from '@/appconfig'


interface Tab {
  name: string
  title: string
}

// 不显示tabs标签
const list = tabsConfig.hidden

export const useTabsStore = defineStore({
  id: 'tabs',
  state: () => ({
    data: tabsConfig.data as Tab[] // 固定首页标签
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
    clear(): void {
      this.data = tabsConfig.data
    }
  },

  persist: {
    storage: sessionStorage,
  },
})
