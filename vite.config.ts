import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import WindiCSS from 'vite-plugin-windicss'

const timeStamp = new Date().getTime();
// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue(), vueJsx(), WindiCSS(),
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
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 1500,
    emptyOutDir: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const name = id.toString().split('node_modules/')[1].split('/');
            if (name[0].toString() == ".pnpm") {
              return name[1].toString();
            } else {
              return name[0].toString()
            }
          }
        },
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : [];
          const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]';
          return `js/${fileName}/[name].${timeStamp}.js`;
        }
      }
    }
  },
  server: {
    port: 7050,
    host: '0.0.0.0',
    // proxy: {
    //   '/api': 'http://127.0.0.1:3000/',
    // },
    // hmr: {
    //   overlay: true,
    //   // 解决热更新不同步的问题
    //   port: 443
    // }
  },
})
