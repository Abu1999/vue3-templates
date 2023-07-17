<template>
  <!-- 添加route.name判断刷新路由会重置 -->
  <LayoutLevel1 v-if="$route.name && !($route.meta.layout && $route.meta.layout.visible)">
    <router-view></router-view>
  </LayoutLevel1>
  <router-view v-else></router-view>
</template>

<script setup lang="ts">
import LayoutLevel1 from '@/Layout/level1/index.vue'
import { layoutStore } from '@/stores/index'

// 载入当前页面配置文件
const store = layoutStore()
// // 主题颜色
store.changeThemeColor()


</script>