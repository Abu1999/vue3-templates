import NProgress from 'nprogress'
import { createRouter, createWebHistory } from 'vue-router'
import { tabsStore } from '@/stores';
import { userRoutes } from './routes'
import { menuStore } from '@/stores/index'

const fixedRoutes = [
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
    path: '/login',
    name: 'login页面',
    meta: {
      layout: {
        visible: true
      }
    },
    component: () => import('@/components/login.vue')
  },]



const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
  routes: [...fixedRoutes, ...userRoutes]
})


router.beforeEach((to, from, next) => {
  NProgress.configure({ showSpinner: false });
  NProgress.start();
  let have = false
  console.log(menuStore().data, to);

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

router.afterEach(() => {
  NProgress.done();
})

export default router