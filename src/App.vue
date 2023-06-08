<template>
  <LayoutLevel1>
    <router-view></router-view>
  </LayoutLevel1>
</template>

<script setup lang="ts">
import LayoutLevel1 from '@/Layout/level1/index.vue'
import { layoutStore } from '@/stores/index'

// 载入当前页面配置文件
const store = layoutStore()
// 主题颜色
store.changeThemeColor()
</script>