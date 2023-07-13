import { useLayoutStore } from './layout/level1/level1'
import { useMenuStore } from './menu'
import { useTabsStore } from './tabs'

// 样式数据配置
export const layoutStore = useLayoutStore

// 菜单数据
export const menuStore = useMenuStore

// 标签页数据
export const tabsStore = useTabsStore