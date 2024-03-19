import { useSetting } from './setting'
import { useMenuStore } from './menu'
import { useTabsStore } from './tabs'
import { useAppInfoStore } from './appInfo'
import { useRoutesStore } from './routes'
// 样式数据配置
export const settingStore = useSetting

// 菜单数据
export const menuStore = useMenuStore

// 路由数据
export const routesStore = useRoutesStore

// 标签页数据
export const tabsStore = useTabsStore

// app信息
export const appInfoStore = useAppInfoStore
