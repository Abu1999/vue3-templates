interface Option {
  [key: string]: any // 消除错误
  title?: string // 项目标题
  menubackgroundColor?: string; // 菜单栏颜色
  min_with?: string
}

export class LayoutConfig {
  option: Option = {
    title: '',
    menubackgroundColor: '',
    min_with: '965px',
  };

  constructor(option?: Option) {
    if (option)
      for (const key in option) {
        if (Object.prototype.hasOwnProperty.call(option, key)) {
          const el = option[key];
          this.option[key] = el
        }
      }
  }
} 