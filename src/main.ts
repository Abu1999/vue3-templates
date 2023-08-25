import './index.css'
import 'virtual:windi.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import "nprogress/nprogress.css";
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
// @ts-expect-error
import contextmenu from 'vue3-contextmenu'
import 'vue3-contextmenu/dist/vue3-contextmenu.css'
// @ts-expect-error
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/es/components/message/style/css'
import { useDark } from '@vueuse/core'

// eslint-disable-line
const isDark = useDark(); // 不能删除，引用

const app = createApp(App)

// 全局引入图标
app.use(ElementPlus, { size: 'default', locale: zhCn })
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// bus.$on("click", (msg) => window.alert(msg));

app.use(router)

// pinia
app.use(createPinia().use(piniaPluginPersistedstate))

// 右键菜单栏
app.use(contextmenu)

app.mount('#app')
