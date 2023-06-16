<template>
  <div style="height: 80vh;" class=" w-full text-2xl flex flex-col justify-center items-center">
    <div>
      home111页面
      <ElButton type="primary" @click="toggleDark()">
        黑夜模式
      </ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
console.log(import.meta.env.VITE_APP_TITLE)
const isDark = useDark()
const toggleDark = useToggle(isDark)

</script>

<style scoped ></style>