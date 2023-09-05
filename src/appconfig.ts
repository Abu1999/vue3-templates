// 菜单栏数据
export const menuData = [
  { title: '首页', icon: 'House', path: '/', code: 'house' },
  {
    title: '菜单嵌套',
    icon: 'Menu',
    children: [
      { title: '测试1', icon: '', path: '/test/app1', code: 'menu-app1' },
      { title: '测试2', icon: '', children: [{ title: '测试2-1', path: '/test/app2/list', icon: '', code: 'menu-app2-list' }], code: 'menu-app2' },
    ],
    code: 'menu'
  },
  {
    title: '组件',
    icon: 'Grid',
    children: [
      { title: '表单', icon: '', path: '/com/form', code: 'com-form' },
      { title: '穿梭框', icon: '', path: '/com/transfer', code: 'com-transfer' },
      { title: '树数据', icon: '', path: '/com/tree', code: 'com-tree' },
      { title: '视频', icon: '', path: '/com/video' },
    ],
    code: 'grid'
  },
  { title: 'axios请求', icon: 'Coin', path: '/axios', code: 'axios' },
  { title: '模版table页面', icon: 'Tickets', path: '/table', code: 'table' },
  { title: '404页面', icon: 'WarningFilled', path: '/404', code: '404' },
]

// tabs设置
export const tabsConfig = {
  hidden: ['/404', '/login'], // 不显示的path
  data: [{ name: '/', title: '首页' }]  // 固定首页标签
}

// 默认app设置
export const appConfig = {
  setting: true,  // 配置设置显示
  tabs: true,
  layout: 1
}





