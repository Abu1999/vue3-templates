import { defineStore } from 'pinia'

export const useAppInfoStore = defineStore({
  id: 'appInfoStore',
  state: () => ({
    data: {
      isMobile: false
    }
  }),
  actions: {
    changeMobile() {
      const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      let is: any = flag || document.documentElement.clientWidth < 767
      this.data.isMobile = is
      window.addEventListener('resize', () => {
        is = flag || document.documentElement.clientWidth < 767
        this.data.isMobile = is
      })
    }
  },
})




