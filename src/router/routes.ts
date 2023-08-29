export const userRoutes = [
  {
    path: '/',
    name: '首页',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/test',
    name: '菜单嵌套',
    redirect: '/test/app1',
    children: [
      {
        name: '测试1',
        path: 'app1',
        component: () => import('../views/app1.vue'),
      },
      {
        name: '测试2',
        path: 'app2',
        redirect: '/test/app2/list',
        children: [
          {
            name: '测试2-1',
            path: 'list',
            component: () => import('../views/app2.vue'),
          }
        ]
      }
    ],
  },
  {
    path: '/com',
    name: '组件',
    redirect: '/com/transfer',
    children: [
      {
        name: '穿梭框',
        path: 'transfer',
        component: () => import('../views/com/transfer.vue'),
      },
      {
        name: '树数据',
        path: 'tree',
        component: () => import('../views/com/tree.vue'),
      },

    ],
  },
  {
    path: '/axios',
    name: 'axios请求',
    component: () => import('@/views/axios.vue')
  },
  {
    path: '/table',
    name: 'table页面',
    component: () => import('@/views/table.vue')
  },
]