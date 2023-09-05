export const userRoutes = [
  {
    path: '/',
    name: '首页',
    component: () => import('../views/AboutView.vue'),
    meta: {
      code: 'house'
    }
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
        meta: {
          code: 'house'
        }
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
            meta: {
              code: 'house'
            }
          }
        ]
      }
    ],
  },
  {
    path: '/com',
    name: '组件',
    // redirect: '/com/transfer',
    children: [
      {
        name: '表单',
        path: 'form',
        component: () => import('../views/com/form.vue'),
        meta: {
          code: 'house'
        }
      },
      {
        name: '穿梭框',
        path: 'transfer',
        component: () => import('../views/com/transfer.vue'),
        meta: {
          code: 'house'
        }
      },
      {
        name: '树数据',
        path: 'tree',
        component: () => import('../views/com/tree.vue'),
        meta: {
          code: 'house'
        }
      },
      {
        name: '视频',
        path: 'video',
        component: () => import('../views/com/video.vue'),
        meta: {
          code: 'house'
        }
      },
    ],
  },
  {
    path: '/axios',
    name: 'axios请求',
    component: () => import('@/views/axios.vue'),
    meta: {
      code: 'house'
    }
  },
  {
    path: '/table',
    name: 'table页面',
    component: () => import('@/views/table.vue'),
    meta: {
      code: 'house'
    }
  },
]