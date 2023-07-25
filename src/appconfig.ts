// 菜单栏数据
export const menuData = [
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

// tabs设置
export const tabsConfig = {
  hidden: ['/404', '/login'], // 不显示的path
  data: [{ name: '/', title: '首页' }]  // 固定首页标签
}



