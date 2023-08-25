<template>
  <div>
    <el-divider>布局</el-divider>
    <div class="flex justify-around">
      <div class="relative w-56px h-48px cursor-pointer bg-gray-300 rounded-md overflow-hidden border-[2px]"
        @click="settingStore().changeLayout(1)"
        :style="{ borderColor: settingStore().setting.layout === 1 ? 'var(--el-color-primary)' : '' }">
        <div class="w-34px h-12px bg-[#fff] float-right"></div>
        <div class="w-18px h-full bg-[#273352]"></div>
      </div>
      <div class="relative w-56px h-48px cursor-pointer bg-gray-300 rounded-md overflow-hidden border-[2px]"
        @click="settingStore().changeLayout(2)"
        :style="{ borderColor: settingStore().setting.layout === 2 ? 'var(--el-color-primary)' : '' }">
        <div class="w-full h-12px bg-[#fff] float-right"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { settingStore } from '@/stores/index'

</script>

<style scoped>
:deep(.el-switch--large) {
  --el-switch-on-color: #000;
  --el-switch-off-color: #ccc;
}

.is-acitve {
  border-color: var(--el-color-primary) !important;
}
</style>