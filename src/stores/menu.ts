import { defineStore } from 'pinia'

export const useMenuStore = defineStore({
  id: 'menu',
  state: () => ({
    data: [
      { title: '首页', icon: 'House', path: '/' },
      {
        title: '菜单嵌套',
        icon: 'Menu',
        children: [
          { title: '测试1', icon: '', path: '/test/app1' },
          { title: '测试2', icon: '', children: [{ title: '测试2-1', path: '/test/app2/list', icon: '' }] },
        ]
      },
      { title: '404页面', icon: 'WarningFilled', path: '/404' },
      { title: 'axios请求', icon: 'WarningFilled', path: '/axios' },
    ]
  }),

  persist: {
    storage: sessionStorage,
  },
})