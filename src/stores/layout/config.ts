import { defineStore } from 'pinia'
import { mix } from '@/utils/layout'

interface Setting {
  color: {
    primary: string
  }
}

const data: string = localStorage.getItem('setting') || ''

const setting: Setting = data ? JSON.parse(data) : {}


export const useLayoutStore = defineStore({
  id: 'layout',
  state: () => ({
    setting: {
      color: {
        primary: setting.color !== undefined ? setting.color.primary : '#409eff'
      },
    }
  }),
  getters: {
    getSetting(): Setting {
      return this.setting
    },

  },
  actions: {
    // 修改主题色
    changeThemeColor(color?: string): void {
      if (color) this.setting.color.primary = color
      localStorage.setItem('setting', JSON.stringify(this.setting))

      const node = document.documentElement;
      // 前缀
      const pre = "--el-color-primary";
      // 源码中的$color-white，也就是白色
      const mixWhite = "#ffffff"
      // 直接为根设置内联样式覆盖:root选择器的样式
      node.style.setProperty(pre, this.setting.color.primary);
      for (let i = 1; i < 10; i += 1) {
        // 同理
        node.style.setProperty(`${pre}-light-${i}`, mix(this.setting.color.primary, mixWhite, i * 0.1));
      }

    }
  }
})
