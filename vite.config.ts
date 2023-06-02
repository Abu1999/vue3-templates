import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // 路径别名
    }
  },
  // server: {
  //   port: 8000,
  //   host: '0.0.0.0',
  //   // proxy: {
  //   //   '/api': 'http://127.0.0.1:3000/',
  //   // },
  // },
})
