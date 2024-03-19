<template>
  <div>
    <el-divider>主题</el-divider>
    <div class="w-full flex justify-center">
      <el-color-picker
        size="large"
        v-model="settingStore().setting.color.primary"
        :predefine="predefineColors"
        @change="(e: any) => { settingStore().changeThemeColor(e) }"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { settingStore } from '@/stores/index'

const predefineColors = ref([
  '#409EEF',
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#c71585',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsl(181, 100%, 37%)'
])
</script>
