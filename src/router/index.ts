import NProgress from 'nprogress'
import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue';
import { tabsStore } from '@/stores';

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: '首页',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/404',
      name: '404页面',
      meta: {
        layout: {
          visible: true
        }
      },
      component: () => import('@/components/404.vue')
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
      path: '/login',
      name: 'login页面',
      meta: {
        layout: {
          visible: true
        }
      },
      component: () => import('@/components/login.vue')
    },
  ]
})


router.beforeEach((to, from, next) => {
  NProgress.configure({ showSpinner: false });
  NProgress.start();
  let have = false
  router.getRoutes().forEach(route => {
    if (route.path === to.path) have = true
  })
  if (have) {
    tabsStore().add({ name: to.path, title: to.name ? String(to.name) : '标签页' })
    next()
  } else {
    router.push('/404')
  }
})

router.afterEach((to, from) => {
  NProgress.done();
})

export default router