import { useSetting } from './setting'
import { useMenuStore } from './menu'
import { useTabsStore } from './tabs'

// 样式数据配置
export const settingStore = useSetting

// 菜单数据
export const menuStore = useMenuStore

// 标签页数据
export const tabsStore = useTabsStore