<template>
  <!-- 添加route.name判断刷新路由会重置 -->
  <LayoutLevel1 v-if="$route.name && !($route.meta.layout && $route.meta.layout.visible)">
    <router-view></router-view>
    <SettingConfig />
  </LayoutLevel1>
  <router-view v-else></router-view>
</template>

<script setup lang="ts">
import LayoutLevel1 from '@/Layout/level1/index.vue'
import SettingConfig from '@/components/setting/index.vue'
import { useDark } from '@vueuse/core'
const isDark = useDark()
</script>