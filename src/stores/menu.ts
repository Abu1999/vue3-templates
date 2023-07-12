import { defineStore } from 'pinia'

export const useMenuStore = defineStore({
  id: 'menu',
  state: () => ({
    data: [
      {
        title: '测试1',
        icon: 'user',
        children: [
          { title: '测试1-1', icon: '', path: '/app' },
          { title: '测试1-1', icon: '', children: [{ title: '测试1-1-1', path: '/app1', icon: '' }] },
        ]
      },
      { title: '测试2', icon: 'setting', path: '/' },

    ]
  })
})