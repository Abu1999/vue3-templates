<template>
  <div>
    <el-switch id="dark" @change="changDark" v-model="dark" size="large" style="color: aqua;" :active-value="true"
      :inactive-value="false" inactive-icon="sunny" active-icon="moon" inline-prompt>
    </el-switch>
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { ref } from 'vue'
const isDark = useDark()

const color = localStorage.getItem('vueuse-color-scheme')

let dark = ref(color ? (color == 'dark' ? true : false) : false)
console.log(dark);

const changDark = useToggle(isDark)

</script>

<style scoped>
:deep(.el-switch--large) {
  --el-switch-on-color: #000;
  --el-switch-off-color: #ccc;
}
</style>