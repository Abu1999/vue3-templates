import NProgress from 'nprogress'
import { createRouter, createWebHistory } from 'vue-router'
import { tabsStore } from '@/stores';
import { userRoutes } from './routes'
import { menuStore } from '@/stores/index'

export const fixedRoutes = [
  {
    path: '/',
    name: '首页',
    component: () => import('../views/AboutView.vue'),
    meta: {
      code: 'house'
    }
  },
  {
    path: '/404',
    name: '404页面',
    meta: {
      layout: {
        visible: true
      },
      code: '404'
    },
    component: () => import('@/components/404.vue')
  },
  {
    path: '/login',
    name: 'login页面',
    meta: {
      layout: {
        visible: true
      },
      code: 'login'
    },
    component: () => import('@/components/login.vue')
  },]

const fixedCode = ['404', 'login']

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
  routes: [...fixedRoutes, ...userRoutes]
})


router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next();
    return
  }
  //加载框
  NProgress.configure({ showSpinner: false });
  NProgress.start();
  let havePath = false, haveCode = false

  // 通过菜单的code值去匹配当前路由code值过滤
  const filter = (data: any) => {
    console.log(data);
    data.forEach((menu: any) => {
      if (menu.code == to.meta?.code || fixedCode.includes(to.meta?.code as string)) {
        haveCode = true
      }
      if (menu?.children) filter(menu.children)
    })
  }
  if (menuStore().getMenu.length > 0) filter(menuStore().getMenu)


  if (router.getRoutes().length > 0) router.getRoutes().forEach(route => {
    if (route.path === to.path) havePath = true
  })
  if (haveCode && havePath) {
    tabsStore().add({ name: to.fullPath, title: to.name ? String(to.name) : '标签页' })
    next()
  } else {
    router.push('/404')
  }
})

router.afterEach(() => {
  NProgress.done();
})

export default router