import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [vue(), vueJsx(),
  AutoImport({
    resolvers: [ElementPlusResolver({
      // 自动引入修改主题色添加这一行，使用预处理样式，不添加将会导致使用ElMessage，ElNotification等组件时默认的主题色会覆盖自定义的主题色
      importStyle: "sass",
    })],
  }),
  Components({
    resolvers: [ElementPlusResolver({
      // 自动引入修改主题色添加这一行，使用预处理样式
      importStyle: "sass",
    })],
  })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // 自定义的主题色
        additionalData: `@use "@/styles/element/index.scss" as *;`,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // 路径别名
    }
  },
  server: {
    port: 8000,
    host: '0.0.0.0',
    // proxy: {
    //   '/api': 'http://127.0.0.1:3000/',
    // },
  },
})
