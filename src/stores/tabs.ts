import router from '@/router'
import { defineStore } from 'pinia'
import { tabsConfig } from '@/appconfig'
import { deepCopy } from '@/utils/page'

interface Tab {
  name: string
  title: string
}

// 不显示的tabs标签
const list = tabsConfig.hidden

export const useTabsStore = defineStore({
  id: 'tabs',
  state: () => ({
    fixedData: deepCopy(tabsConfig.data) as Tab[],
    data: deepCopy(tabsConfig.data) as Tab[] // 固定首页标签
  }),
  getters: {},

  actions: {
    add(obj: Tab): void {
      let push = true
      list.forEach((item) => {
        if (obj.name === item) push = false
      })
      this.data.forEach((item) => {
        if (item.name === obj.name) push = false
      })
      if (push) this.data.push(obj)
    },
    remove(name: string, method?: string): void {
      let num = 1
      let list: Tab = { name: '', title: '' }
      this.data.forEach((item: Tab, index: number) => {
        if (item.name === name) {
          num = index
          list = item
        } else {
          return item
        }
      })

      switch (method) {
        case 'left':
          this.data = this.fixedData.concat(this.data.splice(num))
          break
        case 'right':
          this.data = this.data.splice(0, num + 1)
          break
        case 'self':
          this.data = this.fixedData.concat(list)
          break
        case 'all':
          this.clear()
          break

        default:
          this.data = this.data.filter((item: Tab) => item.name !== name)
          break
      }
      if (num + 1 < this.data.length) router.push(this.data[num].name)
      else router.push(this.data[this.data.length - 1].name)
    },
    clear(): void {
      this.data = deepCopy(tabsConfig.data)
    }
  },

  persist: {
    storage: sessionStorage
  }
})
