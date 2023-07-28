export const userRoutes = [{
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