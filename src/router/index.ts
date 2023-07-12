import NProgress from 'nprogress'
import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue';

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: defineAsyncComponent(() => import('../views/AboutView.vue'))
    },
    {
      path: '/app1',
      name: 'app1',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: defineAsyncComponent(() => import('../views/app1.vue'))
    },
    {
      path: '/404',
      name: '404',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: defineAsyncComponent(() => import('../views/404.vue'))
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
    next()
  } else {
    router.push('/404')
  }
})

router.afterEach((to, from) => {
  NProgress.done();
})

export default router