/// <reference types="vite/client" />
// env.d.ts

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}


// 简单版本
// declare module '*.vue'

// 推荐使用
declare module '*.vue' {
  // 引入vue模块中ts的方法
  import type { DefineComponent } from 'vue'
  // 定义vue组件以及类型注解
  const component: DefineComponent<{}, {}, any>
  export default component
}