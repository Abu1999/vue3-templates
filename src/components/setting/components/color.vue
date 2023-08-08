<template>
  <div>
    <el-divider>主题</el-divider>
    <div class="w-full flex justify-center">
      <el-color-picker size="large" v-model="layoutStore().setting.color.primary" show-alpha :predefine="predefineColors"
        @change="(e: any) => { layoutStore().changeThemeColor(e) }" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { layoutStore } from '@/stores/index'

const predefineColors = ref([
  '#409EEF',
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
</script>