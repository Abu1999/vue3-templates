/// <reference types="vite/client" />
// env.d.ts
import 'vue-router';
import type { DefineComponent } from 'vue'

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// 简单版本
// declare module '*.vue'
// 引入vue模块中ts的方法
// 推荐使用
declare module '*.vue' {
  // 定义vue组件以及类型注解
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface Layout {
  visible: boolean
}

//定义Route中Meta属性
declare module 'vue-router' {
  interface RouteMeta {
    layout?: Layout
  }
}
